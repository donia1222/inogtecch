<?php
// ─────────────────────────────────────────────────────────
//  fem_benefits.php — Lista de ventajas FEM
//  GET    → lista todos (público)
//  POST   → nuevo item (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM fem_benefits ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body = getBody();
    $text = trim($body['text'] ?? '');
    if ($text === '') jsonResponse(['error' => 'Text erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM fem_benefits')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO fem_benefits (text, sort_order) VALUES (:text, :so)');
    $stmt->execute([':text' => $text, ':so' => $max + 1]);
    jsonResponse(['message' => 'Vorteil hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('UPDATE fem_benefits SET text = :text, sort_order = :so WHERE id = :id')
       ->execute([
           ':text' => trim($body['text'] ?? ''),
           ':so'   => (int)($body['sort_order'] ?? 0),
           ':id'   => $id,
       ]);
    jsonResponse(['message' => 'Aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM fem_benefits WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
