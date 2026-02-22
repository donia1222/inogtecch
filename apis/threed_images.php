<?php
// ─────────────────────────────────────────────────────────
//  threed_images.php — Imágenes de la página 3D
//  GET    → lista todas (público)
//  POST   → nueva imagen (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM threed_images ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body = getBody();
    $img  = trim($body['img_url']    ?? '');
    $alt  = trim($body['alt_text']   ?? '');
    $capH = trim($body['caption_h']  ?? '');
    $capP = trim($body['caption_p']  ?? '');
    $type = trim($body['type']       ?? 'bottom'); // 'hero_main' | 'hero_small' | 'bottom'

    if ($img === '') jsonResponse(['error' => 'Bild-URL erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM threed_images')->fetchColumn();
    $stmt = $db->prepare(
        'INSERT INTO threed_images (img_url, alt_text, caption_h, caption_p, type, sort_order)
         VALUES (:img, :alt, :caph, :capp, :type, :so)'
    );
    $stmt->execute([
        ':img'  => $img, ':alt' => $alt,
        ':caph' => $capH, ':capp' => $capP,
        ':type' => $type, ':so'  => $max + 1,
    ]);
    jsonResponse(['message' => 'Bild hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare(
        'UPDATE threed_images SET img_url = :img, alt_text = :alt, caption_h = :caph,
         caption_p = :capp, type = :type, sort_order = :so WHERE id = :id'
    )->execute([
        ':img'  => trim($body['img_url']   ?? ''),
        ':alt'  => trim($body['alt_text']  ?? ''),
        ':caph' => trim($body['caption_h'] ?? ''),
        ':capp' => trim($body['caption_p'] ?? ''),
        ':type' => trim($body['type']      ?? 'bottom'),
        ':so'   => (int)($body['sort_order'] ?? 0),
        ':id'   => $id,
    ]);
    jsonResponse(['message' => 'Bild aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM threed_images WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Bild gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
