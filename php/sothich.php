<?php
require_once("server.php");


$event = $_GET['event'];
switch ($event) {
    case "insertst":
        $mast = $_GET['mast'];
        $tenst = $_GET['tenst'];



        // $sql = "INSERT INTO `banbe`( hovaten, gioitinh, tuoi, diachi, Images ) VALUES('" . $hovaten . "', '" . $gioitinh . "', '" . $tuoi . "','" . $diachi . "','" . $Images . "')";
        $sql = "INSERT INTO `sothich`(mast, tenst) VALUES ('" . $mast . "','" . $tenst . "')";
        // print_r($sql);
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deletest":
        $mast = $_GET['mast'];

        $sql = "DELETE FROM `sothich` WHERE mast='" . $mast . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatest":
        $mast = $_GET['mast'];
        $tenst = $_GET['tenst'];

        $sql = "UPDATE  `sothich` SET mast='" . $mast . "',tenst = '" . $tenst . "' WHERE mast='" . $mast . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSsothich":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select mast, tenst from sothich " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['mast'];
            $usertemp['mast'] = $rows['mast'];
            $usertemp['tenst'] = $rows['tenst'];
            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sothich");
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
