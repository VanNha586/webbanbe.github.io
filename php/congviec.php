<?php
require_once("server.php");


$event = $_GET['event'];
switch ($event) {
    case "insertcv":
        $tencongviec = $_GET['tencongviec'];
        $trinhdo = $_GET['trinhdo'];



        $sql = "INSERT INTO `congviec` (tencongviec, trinhdo) VALUES ('" . $tencongviec . "', '" . $trinhdo . "')";
        // print_r($sql);
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deletecv":
        $tencongviec = $_GET['tencongviec'];

        $sql = "DELETE FROM `congviec` WHERE tencongviec='" . $tencongviec . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatecv":
        $tencongviec = $_GET['tencongviec'];
        $trinhdo = $_GET['trinhdo'];

        $sql = "UPDATE  `congviec` SET tencongviec='" . $tencongviec . "',trinhdo = '" . $trinhdo . "' WHERE tencongviec='" . $tencongviec . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDScongviec":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select tencongviec, trinhdo from congviec " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['tencongviec'];
            $usertemp['tencongviec'] = $rows['tencongviec'];
            $usertemp['trinhdo'] = $rows['trinhdo'];
            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from congviec");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;

        echo json_encode($jsonData);
        mysqli_close($conn);
        break;
    default:
        # code...
        break;
}
