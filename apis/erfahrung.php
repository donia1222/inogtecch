<?php
// ─────────────────────────────────────────────────────────
//  erfahrung.php — Sección About/Erfahrung (Home)
//  GET  /erfahrung.php  → devuelve contenido (público)
//  PUT  /erfahrung.php  → actualiza (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET ──────────────────────────────────────────────────
if ($method === 'GET') {
    $content = $db->query('SELECT * FROM erfahrung WHERE id = 1 LIMIT 1')->fetch();
    if (!$content) jsonResponse(['error' => 'Keine Daten'], 404);

    // Incluye las empresas y especialidades
    $companies   = $db->query('SELECT * FROM erfahrung_companies ORDER BY sort_order ASC')->fetchAll();
    $specialties = $db->query('SELECT * FROM erfahrung_specialties ORDER BY sort_order ASC')->fetchAll();

    jsonResponse([
        'content'     => $content,
        'companies'   => $companies,
        'specialties' => $specialties,
    ]);
}

// ── PUT ──────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $body = getBody();

    $fields = [
        'tag_left', 'title', 'text1', 'text2', 'text3',
        'list_items',   // JSON string
        'highlight_text', 'tag_right', 'intro_text_right',
    ];

    $set    = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
    $params = [':id' => 1];
    foreach ($fields as $f) {
        $params[":$f"] = $body[$f] ?? null;
    }

    $db->prepare("UPDATE erfahrung SET $set WHERE id = :id")->execute($params);
    jsonResponse(['message' => 'Erfahrung aktualisiert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
