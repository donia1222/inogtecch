<?php
// ─────────────────────────────────────────────────────────
//  partners.php — Socios / Partners (página Referenzen)
//  GET    → lista todos (público)
//  POST   → nuevo partner (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM partners ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body   = getBody();
    $img    = trim($body['img_url']   ?? '');
    $name   = trim($body['name']      ?? '');
    $desc   = trim($body['desc_text'] ?? '');
    if ($name === '' || $img === '') jsonResponse(['error' => 'Name und Bild erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM partners')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO partners (img_url, name, desc_text, sort_order) VALUES (:img, :name, :desc, :so)');
    $stmt->execute([':img' => $img, ':name' => $name, ':desc' => $desc, ':so' => $max + 1]);
    jsonResponse(['message' => 'Partner hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('UPDATE partners SET img_url = :img, name = :name, desc_text = :desc, sort_order = :so WHERE id = :id')
       ->execute([
           ':img'  => trim($body['img_url']   ?? ''),
           ':name' => trim($body['name']      ?? ''),
           ':desc' => trim($body['desc_text'] ?? ''),
           ':so'   => (int)($body['sort_order'] ?? 0),
           ':id'   => $id,
       ]);
    jsonResponse(['message' => 'Partner aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM partners WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Partner gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
