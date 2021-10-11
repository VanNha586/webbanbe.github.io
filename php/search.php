<?php
require_once("server.php");

$event = $_GET['event'];
switch ($event) {
    case "search":
        $timkiem = $_GET['timkiem'];

        $sql = "SELECT * FROM `banbe` WHERE hovaten LIKE '%" . $timkiem . "%'";

        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSSearch":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select hovaten, gioitinh, tuoi, diachi, Images from banbe " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['hovaten'];
            $usertemp['hovaten'] = $rows['hovaten'];
            $usertemp['gioitinh'] = $rows['gioitinh'];
            $usertemp['tuoi'] = $rows['tuoi'];
            $usertemp['diachi'] = $rows['diachi'];
            $usertemp['Images'] = $rows['Images'];
            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from banbe");
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
