<?php
// ─────────────────────────────────────────────────────────
//  upload.php — Subida de imágenes al servidor
//  POST /upload.php  (multipart/form-data, campo: "image")
//  Solo accesible con sesión admin activa
// ─────────────────────────────────────────────────────────
require_once __DIR__ . '/cors.php';
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Nur POST erlaubt'], 405);
}

if (empty($_FILES['image'])) {
    jsonResponse(['error' => 'Keine Datei übermittelt'], 400);
}

$file = $_FILES['image'];

// ── Validación de tipo MIME ──────────────────────────────
$allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
$finfo        = finfo_open(FILEINFO_MIME_TYPE);
$mime         = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mime, $allowedMimes, true)) {
    jsonResponse(['error' => 'Nur JPEG, PNG und WebP erlaubt'], 415);
}

// ── Validación de tamaño (máx 5 MB) ─────────────────────
$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    jsonResponse(['error' => 'Datei zu groß (max. 5 MB)'], 413);
}

// ── Crear carpeta uploads/ si no existe ─────────────────
$uploadDir = rtrim(UPLOAD_PATH, '/') . '/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// ── Nombre único para evitar colisiones ─────────────────
$ext      = match ($mime) {
    'image/png'  => 'png',
    'image/webp' => 'webp',
    default      => 'jpg',
};
$filename = uniqid('img_', true) . '.' . $ext;
$destPath = $uploadDir . $filename;

// ── Mover archivo ────────────────────────────────────────
if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    jsonResponse(['error' => 'Fehler beim Speichern der Datei'], 500);
}

$publicUrl = rtrim(UPLOAD_URL, '/') . '/' . $filename;

jsonResponse([
    'url'      => $publicUrl,
    'filename' => $filename,
    'message'  => 'Bild erfolgreich hochgeladen',
]);
