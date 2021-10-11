<?php
require_once("server.php");


$event = $_GET['event'];
switch ($event) {
    case "insertpl":
        $hovaten = $_GET['hovaten'];
        $gioitinh = $_GET['gioitinh'];
        $quanhe = $_GET['quanhe'];
        $tuoi = $_GET['tuoi'];

        $sql = "INSERT INTO `phanloai`( hovaten, gioitinh, quanhe, tuoi) VALUES('" . $hovaten . "', '" . $gioitinh . "', '" . $quanhe . "','" . $tuoi . "')";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deletepl":
        $hovaten = $_GET['hovaten'];

        $sql = "DELETE FROM `phanloai` WHERE hovaten='" . $hovaten . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatepl":
        $hovaten = $_GET['hovaten'];
        $gioitinh = $_GET['gioitinh'];
        $quanhe = $_GET['quanhe'];
        $tuoi = $_GET['tuoi'];
        $sql = "UPDATE  `phanloai` SET hovaten='" . $hovaten . "',gioitinh = '" . $gioitinh . "',quanhe = '" . $quanhe . "',tuoi = '" . $tuoi . "' WHERE hovaten='" . $hovaten . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSphanloai":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select hovaten, gioitinh, quanhe, tuoi from phanloai " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['hovaten'];
            $usertemp['hovaten'] = $rows['hovaten'];
            $usertemp['gioitinh'] = $rows['gioitinh'];
            $usertemp['quanhe'] = $rows['quanhe'];
            $usertemp['tuoi'] = $rows['tuoi'];

            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from phanloai");
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
