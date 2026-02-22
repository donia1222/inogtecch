<?php
// ─────────────────────────────────────────────────────────
//  threed.php — Contenido de texto de la página 3D
//  GET  → devuelve textos + imágenes hero (público)
//  PUT  → actualiza textos (admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

if ($method === 'GET') {
    $content = $db->query('SELECT * FROM threed_content WHERE id = 1 LIMIT 1')->fetch();
    if (!$content) jsonResponse(['error' => 'Keine Daten'], 404);

    // Imágenes de la sección hero (principal + 3 small)
    $images = $db->query('SELECT * FROM threed_images ORDER BY sort_order ASC')->fetchAll();

    jsonResponse([
        'content' => $content,
        'images'  => $images,
    ]);
}

if ($method === 'PUT') {
    requireAuth();
    $body = getBody();

    $fields = [
        'page_tag', 'page_title', 'page_sub',
        // Textos Explosionszeichnung
        'expl_tag', 'expl_title', 'expl_text1', 'expl_text2', 'expl_text3',
        // Textos Animation
        'anim_tag', 'anim_title', 'anim_text1', 'anim_text2', 'anim_text3', 'anim_quote',
    ];

    $set    = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
    $params = [':id' => 1];
    foreach ($fields as $f) {
        $params[":$f"] = $body[$f] ?? null;
    }

    $db->prepare("UPDATE threed_content SET $set WHERE id = :id")->execute($params);
    jsonResponse(['message' => '3D Inhalt aktualisiert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
