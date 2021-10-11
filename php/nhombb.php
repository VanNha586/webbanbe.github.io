<?php
require_once("server.php");


$event = $_GET['event'];
switch ($event) {
    case "insertnbb":
        $tennhom = $_GET['tennhom'];
        $sothanhvien = $_GET['sothanhvien'];
        $motanhom = $_GET['motanhom'];



        // $sql = "INSERT INTO `banbe`( hovaten, gioitinh, tuoi, diachi, Images ) VALUES('" . $hovaten . "', '" . $gioitinh . "', '" . $tuoi . "','" . $diachi . "','" . $Images . "')";
        $sql = "INSERT INTO `nhombb`(tennhom, sothanhvien, motanhom) VALUES ('" . $tennhom . "','" . $sothanhvien . "','" . $motanhom . "')";
        // print_r($sql);
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deletenbb":
        $tennhom = $_GET['tennhom'];

        $sql = "DELETE FROM `nhombb` WHERE tennhom='" . $tennhom . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatenbb":
        $tennhom = $_GET['tennhom'];
        $sothanhvien = $_GET['sothanhvien'];
        $motanhom = $_GET['motanhom'];

        $sql = "UPDATE  `nhombb` SET tennhom='" . $tennhom . "', sothanhvien = '" . $sothanhvien . "', motanhom = '" . $motanhom . "' WHERE tennhom='" . $tennhom . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSnhombb":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select tennhom, sothanhvien, motanhom from nhombb " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['tennhom'];
            $usertemp['tennhom'] = $rows['tennhom'];
            $usertemp['sothanhvien'] = $rows['sothanhvien'];
            $usertemp['motanhom'] = $rows['motanhom'];
            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from nhombb");
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
