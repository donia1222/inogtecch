<?php
// ─────────────────────────────────────────────────────────
//  leistungen.php — Página Leistungen (Kernkompetenzen)
//  GET    → lista todos los servicios (público)
//  POST   → nuevo servicio (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET ──────────────────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM leistungen ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

// ── POST ─────────────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();
    $body  = getBody();
    $icon  = trim($body['icon']  ?? '');
    $title = trim($body['title'] ?? '');
    $desc  = trim($body['desc_text'] ?? '');

    if ($title === '') jsonResponse(['error' => 'Titel erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM leistungen')->fetchColumn();
    $stmt = $db->prepare(
        'INSERT INTO leistungen (icon, title, desc_text, sort_order) VALUES (:icon, :title, :desc, :so)'
    );
    $stmt->execute([':icon' => $icon, ':title' => $title, ':desc' => $desc, ':so' => $max + 1]);

    jsonResponse(['message' => 'Leistung hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

// ── PUT ──────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $stmt = $db->prepare(
        'UPDATE leistungen SET icon = :icon, title = :title, desc_text = :desc, sort_order = :so WHERE id = :id'
    );
    $stmt->execute([
        ':icon'  => trim($body['icon']  ?? ''),
        ':title' => trim($body['title'] ?? ''),
        ':desc'  => trim($body['desc_text'] ?? ''),
        ':so'    => (int)($body['sort_order'] ?? 0),
        ':id'    => $id,
    ]);

    jsonResponse(['message' => 'Leistung aktualisiert']);
}

// ── DELETE ───────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('DELETE FROM leistungen WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Leistung gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
