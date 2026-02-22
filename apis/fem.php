<?php
// ─────────────────────────────────────────────────────────
//  fem.php — Contenido de la página FEM
//  GET  → devuelve textos + imagen + beneficios (público)
//  PUT  → actualiza textos e imagen (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $content  = $db->query('SELECT * FROM fem_content WHERE id = 1 LIMIT 1')->fetch();
    if (!$content) jsonResponse(['error' => 'Keine Daten'], 404);

    $benefits = $db->query('SELECT * FROM fem_benefits ORDER BY sort_order ASC')->fetchAll();

    jsonResponse([
        'content'  => $content,
        'benefits' => $benefits,
    ]);
}

if ($method === 'PUT') {
    requireAuth();
    $body = getBody();

    $fields = [
        'img_url', 'img_alt', 'img_badge',
        'tag', 'title',
        'text1', 'text2', 'text3', 'text4',
    ];

    $set    = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
    $params = [':id' => 1];
    foreach ($fields as $f) {
        $params[":$f"] = $body[$f] ?? null;
    }

    $db->prepare("UPDATE fem_content SET $set WHERE id = :id")->execute($params);
    jsonResponse(['message' => 'FEM Inhalt aktualisiert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
