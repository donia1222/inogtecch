<?php
// ─────────────────────────────────────────────────────────
//  footer.php — Contenido del Footer / Kontakt
//  GET  /footer.php        → devuelve datos (público)
//  PUT  /footer.php        → actualiza (solo admin)
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

// ── GET — público ────────────────────────────────────────
if ($method === 'GET') {
    $db   = getDB();
    $stmt = $db->query('SELECT * FROM footer_content WHERE id = 1 LIMIT 1');
    $row  = $stmt->fetch();

    if (!$row) {
        jsonResponse(['error' => 'Keine Daten gefunden'], 404);
    }

    // Decode services JSON
    if (isset($row['services'])) {
        $row['services'] = json_decode($row['services'], true);
    }

    jsonResponse($row);
}

// ── PUT — solo admin ─────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $body = getBody();

    $fields = [
        'contact_title', 'contact_text',
        'address_line1', 'address_line2',
        'mobile', 'website', 'email',
        'services',
    ];

    $set    = implode(', ', array_map(fn($f) => "$f = :$f", $fields));
    $params = [];
    foreach ($fields as $f) {
        if ($f === 'services' && isset($body[$f]) && is_array($body[$f])) {
            $params[":$f"] = json_encode($body[$f], JSON_UNESCAPED_UNICODE);
        } else {
            $params[":$f"] = $body[$f] ?? null;
        }
    }
    $params[':id'] = 1;

    $db   = getDB();
    $stmt = $db->prepare("UPDATE footer_content SET $set WHERE id = :id");
    $stmt->execute($params);

    jsonResponse(['message' => 'Footer erfolgreich aktualisiert']);
}

jsonResponse(['error' => 'Methode nicht erlaubt'], 405);
