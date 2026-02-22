<?php
// ─────────────────────────────────────────────────────────
//  erfahrung_companies.php — Chips de empresas (About)
//  GET    → lista (público)
//  POST   → nuevo (admin)
//  PUT    ?id=X → editar (admin)
//  DELETE ?id=X → eliminar (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM erfahrung_companies ORDER BY sort_order ASC')->fetchAll();
    jsonResponse($rows);
}

if ($method === 'POST') {
    requireAuth();
    $body = getBody();
    $name = trim($body['name'] ?? '');
    if ($name === '') jsonResponse(['error' => 'Name erforderlich'], 400);

    $max  = $db->query('SELECT COALESCE(MAX(sort_order),0) FROM erfahrung_companies')->fetchColumn();
    $stmt = $db->prepare('INSERT INTO erfahrung_companies (name, sort_order) VALUES (:name, :so)');
    $stmt->execute([':name' => $name, ':so' => $max + 1]);
    jsonResponse(['message' => 'Unternehmen hinzugefügt', 'id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT') {
    requireAuth();
    $id   = (int)($_GET['id'] ?? 0);
    $body = getBody();
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);

    $db->prepare('UPDATE erfahrung_companies SET name = :name, sort_order = :so WHERE id = :id')
       ->execute([':name' => trim($body['name'] ?? ''), ':so' => (int)($body['sort_order'] ?? 0), ':id' => $id]);
    jsonResponse(['message' => 'Aktualisiert']);
}

if ($method === 'DELETE') {
    requireAuth();
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) jsonResponse(['error' => 'ID erforderlich'], 400);
    $db->prepare('DELETE FROM erfahrung_companies WHERE id = :id')->execute([':id' => $id]);
    jsonResponse(['message' => 'Gelöscht']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
