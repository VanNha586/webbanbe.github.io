<?php
require_once("server.php");

// sukien
$event = $_GET['event'];
switch ($event) {
    case "insertsk":
        $mask = $_GET['mask'];
        $tensk = $_GET['tensk'];
        $noitochuc = $_GET['noitochuc'];
        $thoigian = $_GET['thoigian'];

        $sql = "INSERT INTO `sukien`( mask, tensk, noitochuc, thoigian) VALUES('" . $mask . "', '" . $tensk . "', '" . $noitochuc . "','" . $thoigian . "')";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "deletesk":
        $mask = $_GET['mask'];

        $sql = "DELETE FROM `sukien` WHERE mask='" . $mask . "'";
        mysqli_query($conn, $sql);
        if (mysqli_affected_rows($conn) > 0) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatesk":
        $mask = $_GET['mask'];
        $tensk = $_GET['tensk'];
        $noitochuc = $_GET['noitochuc'];
        $thoigian = $_GET['thoigian'];

        $sql = "UPDATE  `sukien` SET mask='" . $mask . "',tensk = '" . $tensk . "',noitochuc = '" . $noitochuc . "',thoigian = '" . $thoigian . "' WHERE mask='" . $mask . "'";
        if (mysqli_query($conn, $sql)) {
            $res[$event] = 1;
        } else {
            $res[$event] = 0;
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "getDSsukien":
        $mang = array();
        $record = $_GET['record'];
        $page = $_GET['page'];
        $vt = $page * $record;
        $limit = 'limit ' . $vt . ' , ' . $record;

        $sql = mysqli_query($conn, "select mask, tensk, noitochuc, thoigian from sukien " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $id = $rows['mask'];
            $usertemp['mask'] = $rows['mask'];
            $usertemp['tensk'] = $rows['tensk'];
            $usertemp['noitochuc'] = $rows['noitochuc'];
            $usertemp['thoigian'] = $rows['thoigian'];
            $mang[$id] = $usertemp;
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sukien");
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
