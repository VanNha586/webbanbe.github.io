<?php
session_start();
$filename = md5(mt_rand());
$extension=str_replace('image/', '.', $_FILES['photo']['type']);
$status = (boolean) move_uploaded_file($_FILES['photo']['tmp_name'], '../file/'.$filename.$extension);

$response = (object) [
	'status' => $status
];

if ($status) {
	$response->url = 'https://viennhagroup.com/file/'.$filename.$extension;
	$response->attach =$filename.$extension;
}

echo json_encode($response);
