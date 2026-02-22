<?php
// ─────────────────────────────────────────────────────────
//  prozess.php — Página Prozess (Timeline 8 pasos)
//  GET    → lista todos los pasos (público)
//  POST   → nuevo paso (admin)
//  PUT    ?id=X → editar paso (admin)
//  DELETE ?id=X → eliminar paso (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET ──────────────────────────────────────────────────
if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM prozess_steps ORDER BY sort_order ASC')->fetchAll();

    // Decodifica el campo actors (guardado como JSON string)
    foreach ($rows as &$row) {
        $row['actors'] = json_decode($row['actors'] ?? '[]', true);
    }
    unset($row);

    jsonResponse($rows);
}

// ── POST ─────────────────────────────────────────────────
if ($method === 'POST') {
    requireAuth();
    $body    = getBody();
    $stepNum = trim($body['step_num'] ?? '');
    $title   = trim($body['title']    ?? '');
    $desc    = trim($body['desc_text'] ?? '');
    $actors  = $body['actors'] ?? [];   // array ['Kunde','iNOTEC']

    if ($title === '') jsonResponse(['error' => 'Titel erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM prozess_steps')->fetchColumn();
    $stmt = $db->prepare(
        'INSERT INTO prozess_steps (step_num, actors, title, desc_text, sort_order)
         VALUES (:num, :actors, :title, :desc, :so)'
    );
    $stmt->execute([
        ':num'    => $stepNum,
        ':actors' => json_encode($actors),
        ':title'  => $title,
        ':desc'   => $desc,
        ':so'     => $max + 1,
    ]);

    jsonResponse(['message' => 'Schritt hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

// ── PUT ──────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $actors = $body['actors'] ?? [];
    $stmt   = $db->prepare(
        'UPDATE prozess_steps SET step_num = :num, actors = :actors, title = :title,
         desc_text = :desc, sort_order = :so WHERE id = :id'
    );
    $stmt->execute([
        ':num'    => trim($body['step_num'] ?? ''),
        ':actors' => json_encode($actors),
        ':title'  => trim($body['title']    ?? ''),
        ':desc'   => trim($body['desc_text'] ?? ''),
        ':so'     => (int)($body['sort_order'] ?? 0),
        ':id'     => $id,
    ]);

    jsonResponse(['message' => 'Schritt aktualisiert']);
}

// ── DELETE ───────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('DELETE FROM prozess_steps WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Schritt gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
