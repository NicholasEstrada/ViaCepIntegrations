<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $endereco = json_decode(file_get_contents('php://input'), true);

    $registros = json_decode(file_get_contents('registros.json'), true);
    $registros[] = $endereco;
    file_put_contents('registros.json', json_encode($registros));

    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método inválido']);
}
