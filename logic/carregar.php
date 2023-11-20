<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$registros = json_decode(file_get_contents('registros.json'), true);

echo json_encode($registros);
?>
