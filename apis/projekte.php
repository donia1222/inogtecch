<?php
// ─────────────────────────────────────────────────────────
//  projekte.php — Página Projekte (tarjetas de proyectos)
//  GET    → lista todos (público)
//  POST   → nuevo proyecto (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET ──────────────────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM projekte ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

// ── POST ─────────────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();
    $body = getBody();

    $img    = trim($body['img_url']   ?? '');
    $alt    = trim($body['alt_text']  ?? '');
    $cat    = trim($body['category']  ?? '');
    $title  = trim($body['title']     ?? '');
    $client = trim($body['client']    ?? '');

    if ($title === '' || $img === '') {
        jsonResponse(['error' => 'Titel und Bild erforderlich'], 400);
    }

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM projekte')->fetchColumn();
    $stmt = $db->prepare(
        'INSERT INTO projekte (img_url, alt_text, category, title, client, sort_order)
         VALUES (:img, :alt, :cat, :title, :client, :so)'
    );
    $stmt->execute([
        ':img'    => $img,
        ':alt'    => $alt,
        ':cat'    => $cat,
        ':title'  => $title,
        ':client' => $client,
        ':so'     => $max + 1,
    ]);

    jsonResponse(['message' => 'Projekt hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

// ── PUT ──────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $stmt = $db->prepare(
        'UPDATE projekte SET img_url = :img, alt_text = :alt, category = :cat,
         title = :title, client = :client, sort_order = :so WHERE id = :id'
    );
    $stmt->execute([
        ':img'    => trim($body['img_url']  ?? ''),
        ':alt'    => trim($body['alt_text'] ?? ''),
        ':cat'    => trim($body['category'] ?? ''),
        ':title'  => trim($body['title']    ?? ''),
        ':client' => trim($body['client']   ?? ''),
        ':so'     => (int)($body['sort_order'] ?? 0),
        ':id'     => $id,
    ]);

    jsonResponse(['message' => 'Projekt aktualisiert']);
}

// ── DELETE ───────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('DELETE FROM projekte WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Projekt gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
