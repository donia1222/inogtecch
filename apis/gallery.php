<?php
// ─────────────────────────────────────────────────────────
//  gallery.php — Galería de imágenes (página Projekte)
//  GET    → lista todas (público)
//  POST   → nueva imagen (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM gallery ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body   = getBody();
    $imgUrl = trim($body['img_url']  ?? '');
    $alt    = trim($body['alt_text'] ?? '');
    if ($imgUrl === '') jsonResponse(['error' => 'Bild-URL erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM gallery')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO gallery (img_url, alt_text, sort_order) VALUES (:img, :alt, :so)');
    $stmt->execute([':img' => $imgUrl, ':alt' => $alt, ':so' => $max + 1]);
    jsonResponse(['message' => 'Bild hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('UPDATE gallery SET img_url = :img, alt_text = :alt, sort_order = :so WHERE id = :id')
       ->execute([
           ':img' => trim($body['img_url']  ?? ''),
           ':alt' => trim($body['alt_text'] ?? ''),
           ':so'  => (int)($body['sort_order'] ?? 0),
           ':id'  => $id,
       ]);
    jsonResponse(['message' => 'Bild aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM gallery WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Bild gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
