<?php
require_once("server.php");


$event = $_GET['event'];
switch ($event) {
	case "UpdateAvatar":
		$avartar = $_GET['avartar'];
		$username = $_GET['username'];
		$sql = "update users set avartar='" . $avartar . "' where username='" . $username . "'";
		if (mysqli_query($conn, $sql)) {
			$res[$event] = 1;
		} else {
			$res[$event] = 0;
		}

		echo json_encode($res);
		mysqli_close($conn);
		break;
	case "insertbb":
		$hovaten = $_GET['hovaten'];
		$gioitinh = $_GET['gioitinh'];
		$tuoi = $_GET['tuoi'];
		$diachi = $_GET['diachi'];
		$Images = $_GET['Images'];


		// $sql = "INSERT INTO `banbe`( hovaten, gioitinh, tuoi, diachi, Images ) VALUES('" . $hovaten . "', '" . $gioitinh . "', '" . $tuoi . "','" . $diachi . "','" . $Images . "')";
		$sql = "INSERT INTO `banbe`(hovaten, gioitinh, tuoi, diachi, Images) VALUES ('" . $hovaten . "','" . $gioitinh . "','" . $tuoi . "','" . $diachi . "','" . $Images . "')";
		// print_r($sql);
		if (mysqli_query($conn, $sql)) {
			$res[$event] = 1;
		} else {
			$res[$event] = 0;
		}

		echo json_encode($res);
		mysqli_close($conn);
		break;
	case "deletebb":
		$hovaten = $_GET['hovaten'];

		$sql = "DELETE FROM `banbe` WHERE hovaten='" . $hovaten . "'";
		mysqli_query($conn, $sql);
		if (mysqli_affected_rows($conn) > 0) {
			$res[$event] = 1;
		} else {
			$res[$event] = 0;
		}

		echo json_encode($res);
		mysqli_close($conn);
		break;
	case "updatebb":
		$hovaten = $_GET['hovaten'];
		$gioitinh = $_GET['gioitinh'];
		$tuoi = $_GET['tuoi'];
		$diachi = $_GET['diachi'];
		$Images = $_GET['Images'];
		$sql = "UPDATE  `banbe` SET hovaten='" . $hovaten . "',gioitinh = '" . $gioitinh . "',tuoi = '" . $tuoi . "',diachi = '" . $diachi . "',Images = '" . $Images . "' WHERE hovaten='" . $hovaten . "'";
		if (mysqli_query($conn, $sql)) {
			$res[$event] = 1;
		} else {
			$res[$event] = 0;
		}

		echo json_encode($res);
		mysqli_close($conn);
		break;

	case "getDSbanbe":
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
