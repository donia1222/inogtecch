<?php
// ─────────────────────────────────────────────────────────
//  hero.php — Sección Hero de la Home
//  GET  /hero.php        → devuelve datos del hero (público)
//  PUT  /hero.php        → actualiza hero (solo admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

// ── GET — público ────────────────────────────────────────
if ($method === 'GET') {
    $db   = getDB();
    $stmt = $db->query('SELECT * FROM hero WHERE id = 1 LIMIT 1');
    $row  = $stmt->fetch();

    if (!$row) {
        jsonResponse(['error' => 'Keine Daten gefunden'], 404);
    }

    jsonResponse($row);
}

// ── PUT — solo admin ─────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $body = getBody();

    $fields = [
        'badge_text', 'eyebrow', 'title_line1', 'title_line2_red',
        'desc_text', 'btn_primary_text', 'btn_outline_text', 'btn_outline_href',
        'stat1_val', 'stat1_lbl', 'stat2_val', 'stat2_lbl', 'stat3_val', 'stat3_lbl',
        'hero_main_img', 'hero_main_alt', 'hero_img_label',
        'mini1_img', 'mini1_alt', 'mini1_label',
        'mini2_img', 'mini2_alt', 'mini2_label',
    ];

    $set    = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
    $params = [];
    foreach ($fields as $f) {
        $params[":$f"] = $body[$f] ?? null;
    }
    $params[':id'] = 1;

    $db   = getDB();
    $stmt = $db->prepare("UPDATE hero SET $set WHERE id = :id");
    $stmt->execute($params);

    jsonResponse(['message' => 'Hero erfolgreich aktualisiert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
