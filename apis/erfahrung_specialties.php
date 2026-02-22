<?php
// ─────────────────────────────────────────────────────────
//  erfahrung_specialties.php — Cards de especialidades Vakuumtechnik
//  GET    → lista (público)
//  POST   → nueva (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM erfahrung_specialties ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body  = getBody();
    $label = trim($body['label'] ?? '');
    $desc  = trim($body['desc_text'] ?? '');
    if ($label === '') jsonResponse(['error' => 'Label erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM erfahrung_specialties')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO erfahrung_specialties (label, desc_text, sort_order) VALUES (:label, :desc, :so)');
    $stmt->execute([':label' => $label, ':desc' => $desc, ':so' => $max + 1]);
    jsonResponse(['message' => 'Spezialgebiet hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('UPDATE erfahrung_specialties SET label = :label, desc_text = :desc, sort_order = :so WHERE id = :id')
       ->execute([
           ':label' => trim($body['label'] ?? ''),
           ':desc'  => trim($body['desc_text'] ?? ''),
           ':so'    => (int)($body['sort_order'] ?? 0),
           ':id'    => $id,
       ]);
    jsonResponse(['message' => 'Aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM erfahrung_specialties WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
