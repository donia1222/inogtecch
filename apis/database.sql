-- ═══════════════════════════════════════════════════════════════
--  iNOTEC Engineering — Schema completo de base de datos MySQL
--  Ejecutar este archivo una sola vez para crear toda la BD
--  Incluye datos iniciales extraídos de la web actual
-- ═══════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS inotec_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inotec_db;

-- ───────────────────────────────────────────────────────────────
--  Configuración admin (contraseña hasheada)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_config (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    setting_key   VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT         NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar hash de contraseña por defecto: "inotec2024"
-- IMPORTANTE: cambia esto ejecutando setup.php o generando un nuevo hash
INSERT INTO admin_config (setting_key, setting_value) VALUES
('admin_password_hash', '$2y$12$placeholderHashCambiarAntesDePlantear')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- ───────────────────────────────────────────────────────────────
--  HERO — Sección principal de la Home
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero (
    id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    badge_text       VARCHAR(255)  NOT NULL DEFAULT 'Sevelen · CH-9475 · Schweiz',
    eyebrow          VARCHAR(255)  NOT NULL DEFAULT 'iNOTEC-Engineering',
    title_line1      VARCHAR(255)  NOT NULL DEFAULT 'Von der Idee',
    title_line2_red  VARCHAR(255)  NOT NULL DEFAULT 'zum Produkt.',
    desc_text        TEXT,
    btn_primary_text VARCHAR(100)  NOT NULL DEFAULT 'Kontakt aufnehmen',
    btn_outline_text VARCHAR(100)  NOT NULL DEFAULT 'Projekte ansehen →',
    btn_outline_href VARCHAR(255)  NOT NULL DEFAULT '/projekte',
    stat1_val        VARCHAR(20)   NOT NULL DEFAULT '20+',
    stat1_lbl        VARCHAR(100)  NOT NULL DEFAULT 'Jahre Erfahrung',
    stat2_val        VARCHAR(20)   NOT NULL DEFAULT '25+',
    stat2_lbl        VARCHAR(100)  NOT NULL DEFAULT 'Referenzkunden',
    stat3_val        VARCHAR(20)   NOT NULL DEFAULT '136+',
    stat3_lbl        VARCHAR(100)  NOT NULL DEFAULT 'Projekte realisiert',
    hero_main_img    VARCHAR(500)  NOT NULL DEFAULT '/assets/p1_img1.jpeg',
    hero_main_alt    VARCHAR(255)  NOT NULL DEFAULT 'iNOTEC Engineering',
    hero_img_label   VARCHAR(255)  NOT NULL DEFAULT 'iNOTEC · Komplexe Anlagen & Systeme',
    mini1_img        VARCHAR(500)  NOT NULL DEFAULT '/assets/p4_img3.jpeg',
    mini1_alt        VARCHAR(255)  NOT NULL DEFAULT 'iTEC-Sp5',
    mini1_label      VARCHAR(255)  NOT NULL DEFAULT 'iTEC-Sp5 Sputtersystem',
    mini2_img        VARCHAR(500)  NOT NULL DEFAULT '/assets/p2_img1.jpeg',
    mini2_alt        VARCHAR(255)  NOT NULL DEFAULT 'FEM Analyse',
    mini2_label      VARCHAR(255)  NOT NULL DEFAULT 'FEM-Belastungsanalyse'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO hero (id, desc_text) VALUES (1,
    'Ganzheitliche Engineering-Prozesse von der ersten Konzeptidee bis hin zum fertigen Prototypen. Vakuumtechnik, Handlings-Systeme und innovative Gebrauchsgegenstände — realisiert mit 3D Autodesk Inventor und AutoCAD.'
) ON DUPLICATE KEY UPDATE id = id;

-- ───────────────────────────────────────────────────────────────
--  TICKER — Cinta de tecnologías animada
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ticker_items (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    text        VARCHAR(255) NOT NULL,
    sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO ticker_items (text, sort_order) VALUES
('Autodesk Inventor',      1),
('AutoCAD',                2),
('FEM-Berechnungen',       3),
('Vakuumtechnik',          4),
('3D-Visualisierung',      5),
('Sputtering',             6),
('Evaporation',            7),
('Ion Beam Etching',       8),
('Prototypenbau',          9),
('Stücklisten',           10),
('Handling Systeme',      11),
('Konzeptentwicklung',    12),
('Explosionszeichnungen', 13),
('3D-Animation',          14);

-- ───────────────────────────────────────────────────────────────
--  ERFAHRUNG — Sección About (Home)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS erfahrung (
    id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tag_left         VARCHAR(255) NOT NULL DEFAULT 'Herzlich Willkommen',
    title            VARCHAR(500) NOT NULL DEFAULT 'Ganzheitliche Engineering-Prozesse',
    text1            TEXT,
    text2            TEXT,
    text3            TEXT,
    list_items       JSON,        -- Array de strings para la lista <ul>
    highlight_text   TEXT,
    tag_right        VARCHAR(255) NOT NULL DEFAULT 'Erfahrung aus führenden Firmen',
    intro_text_right TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO erfahrung (id, text1, text2, text3, list_items, highlight_text, intro_text_right) VALUES (1,
    'Wenn ganzheitliche Engineering Prozesse, bis hin zum Prototypen Ihre Themen sind, dann sind Sie bei uns sicher an der richtigen Adresse.',
    'Unser Hauptbetätigungsfeld liegt in der Erstellung und Ausarbeitung von komplexen Anlagen sowie Anlagenkonzepten; im speziellen in der Vakuumtechnik (Evaporation, sputtering, ion beam polishing, ion beam etching, vacuum solder processes), Handlings Systemen und innovativen Gebrauchsgegenständen aller Art.',
    'Hierzu verwenden wir modernste Hilfsmittel wie 3D Autodesk Inventor oder AutoCAD, welche es uns ermöglichen, kundenspezifisch Dokumente und Daten zu erstellen:',
    '["Erstellung von Konzepten und Studien","Konzept Realisierung bis hin zur Produktionszeichnung und Stückliste","Erstellung von 3D Daten ab 2D Zeichnung","3D Animationen und 3D Visualisierung","3D Explosionszeichnungen","FEM Berechnungen","Auf Wunsch inklusive Prototypenproduktion und Vertrieb"]',
    'Unsere Erfahrung und Kompetenz, welche wir in führenden Firmen sammeln durften, könnten auch Ihrem Unternehmen wichtige Impulse geben. Wenn Sie Fragen oder Anregungen haben, schreiben Sie uns oder rufen Sie uns an. Ihre Kontaktaufnahme freut uns.',
    'Unsere Kompetenz wurde in international führenden Unternehmen der Vakuumtechnik, Beschichtungstechnologie und des Maschinenbaus aufgebaut:'
) ON DUPLICATE KEY UPDATE id = id;

-- ───────────────────────────────────────────────────────────────
--  ERFAHRUNG COMPANIES — Chips de empresas
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS erfahrung_companies (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO erfahrung_companies (name, sort_order) VALUES
('OC Oerlikon',       1),
('MRC USA',           2),
('Leybold Deutschland', 3),
('Inodisc Deutschland', 4),
('Evatec AG',         5),
('Provac AG',         6);

-- ───────────────────────────────────────────────────────────────
--  ERFAHRUNG SPECIALTIES — Cards de especialidades Vakuumtechnik
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS erfahrung_specialties (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    label      VARCHAR(255) NOT NULL,
    desc_text  TEXT,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO erfahrung_specialties (label, desc_text, sort_order) VALUES
('Beschichtung', 'Evaporation · Sputtering · Vacuum Solder Processes', 1),
('Bearbeitung',  'Ion Beam Polishing · Ion Beam Etching',              2),
('Systeme',      'Handling Systeme · Anlagenkonzepte',                 3),
('Produkte',     'Innovative Gebrauchsgegenstände aller Art',          4);

-- ───────────────────────────────────────────────────────────────
--  LEISTUNGEN — Servicios / Kernkompetenzen
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leistungen (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    icon       VARCHAR(10)  NOT NULL DEFAULT '⚙️',
    title      VARCHAR(255) NOT NULL,
    desc_text  TEXT,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO leistungen (icon, title, desc_text, sort_order) VALUES
('💡', 'Konzepte & Studien',
 'Erstellung von Konzepten und technischen Studien auf Basis Ihrer Spezifikationen — systematisch, dokumentiert und diskutiert.', 1),
('📐', 'Konstruktion & Stücklisten',
 'Konzeptrealisierung bis zur vollständigen Produktionszeichnung mit Stücklisten — fertigungsgerecht und normkonform.', 2),
('🖥️', '3D-Daten aus 2D-Zeichnungen',
 'Überführung bestehender 2D-Dokumente in vollständige 3D-Modelle mit Autodesk Inventor für moderne Entwicklungsprozesse.', 3),
('🎬', '3D-Animation & Visualisierung',
 'Hochwertige 3D-Animationen und fotorealistische Visualisierungen — optimal für Präsentationen und Produktvermarktung.', 4),
('💥', '3D-Explosionszeichnungen',
 'Perspektivische Zerlegungsdarstellungen komplexer Baugruppen mit Teilenummern — für Montageanleitungen und Ersatzteilkataloge.', 5),
('🧮', 'FEM-Berechnungen & Prototypen',
 'Finite-Elemente-Analysen zur konstruktionsbegleitenden Optimierung. Auf Wunsch inklusive Prototypenproduktion und Vertrieb.', 6);

-- ───────────────────────────────────────────────────────────────
--  PROJEKTE — Tarjetas de proyectos
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projekte (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url    VARCHAR(500) NOT NULL,
    alt_text   VARCHAR(255) NOT NULL DEFAULT '',
    category   VARCHAR(255) NOT NULL DEFAULT '',
    title      VARCHAR(500) NOT NULL,
    client     VARCHAR(255) NOT NULL DEFAULT '',
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO projekte (img_url, alt_text, category, title, client, sort_order) VALUES
('/assets/p7_img1.jpeg',  'Laboranlage Glas Trösch',       'Vakuumtechnik · Laboranlage',        'Kundenspez. Laboranlage & Quellen-Modifikation',            'Glas Trösch AG · CH-Bützberg',            1),
('/assets/p7_img7.jpeg',  'Sputter-Anlage Kessler',         'Vakuumtechnik · Sputtering',         'Aufdampf- und Sputter-Anlagen & Sonderbaugruppen',          'Kessler Consulting · CH-Vilters',         2),
('/assets/p7_img9.jpeg',  'Spezial Kupplungen',             'Maschinenbau · Sonderkonstruktion',  'Spezial-Kupplungen für den Leitungsbau',                    'Straub Werke AG · CH-Wangs',              3),
('/assets/p7_img10.jpeg', 'Substratträger CVD',             'Vakuumtechnik · CVD-Anlage',         'Spezial-Substratträger für CVD-Anlage',                     'Plasma Parylene Systems GmbH · D-Rosenheim', 4),
('/assets/p8_img1.jpeg',  'Swiss Drones',                   'Aerospace · Drohnentechnologie',     'Antriebseinheit & Special Tools für Hubschrauber-Drohnen',  'Swiss Drones AG · CH-Buchs',              5),
('/assets/p8_img10.jpeg', 'Leica CFK-POD',                  'Luft- & Raumfahrt · CFK',            'Komplett Lösung CFK-POD · Kamera-System RCD30',             'Leica Geosystems · CH-Heerbrugg',         6),
('/assets/p8_img12.jpeg', 'Idonus Ion-Implantation',        'Laboranlage · Ion-Implantation',     'Kundenspezifische Laboranlage Ion-Implantation',             'Idonus Sarl · CH-Neuchâtel',              7),
('/assets/p12_img3.jpeg', 'ANAVIA HT-100',                  'Aerospace · Hubschrauber-Drohne',    'Hubschrauber Drohne ANAVIA HT-100',                         'Anavia AG · CH-Näfels',                   8),
('/assets/p11_img1.jpeg', 'eTribike',                       'Mobilität · E-Fahrzeug',             'eTribike — Elektrisches Dreirad-Konzept',                   'hcp swiss GmbH · CH-Sevelen',             9),
('/assets/p9_img3.jpeg',  'Reinigungsrechen LFV',           'Wasserbau · Automatisierung',        'Automatischer Reinigungsrechen',                            'LFV · LI-Ruggell',                        10),
('/assets/p10_img1.jpeg', 'Salzwasser-Aquarium',            'Produktentwicklung · Design',        'Salzwasser-Aquarium mit Filter und Möbel',                  'AST Aquariumsystems · CH-Grabs',          11),
('/assets/p10_img3.jpeg', 'HF-Reinigungsanlage',            'Industrieanlage · Reinigung',        'HF-Reinigungsanlage',                                       'Ultralight AG · FL-Schaanwald',           12),
('/assets/p7_img16.jpeg', 'Motorrad Custom Parts',          'Motorrad · Custom Parts',            'Motorrad Custom Parts',                                     'Regal-Raptor Schweiz GmbH · CH-Buchs',   13),
('/assets/p9_img1.jpeg',  'Heisswasser-Hochdruckleitungssystem', 'Rohrsysteme · Hochdruck',      'Studie Heisswasser-Hochdruckleitungssystem',                'Heinz Braukhoff AG · CH-Buchs',           14),
('/assets/p9_img4.jpeg',  'Architektonische Studien',       'Architektur · 3D-Studie',            'Architektonische Studien',                                  'SAH · CH-Sevelen',                        15),
('/assets/p10_img2.jpeg', 'Magazinwagen Elring Klinger',    'Industrie · Logistik',               'Diverse Magazinwagen für Dämmbleche',                       'Elring Klinger · CH-Sevelen',             16),
('/assets/p11_img3.jpeg', 'Drohne Wasp FlyTec',             'Aerospace · Drohnentechnologie',     'Studie Antriebseinheit & Special Tools Drohne Wasp',        'FlyTec AG · CH-Sevelen',                  17),
('/assets/p12_img4.jpeg', 'Trommel-Automat RMB',            'Maschinenbau · Automation',          'Trommel-Automat',                                           'RMB AG · CH-Sevelen',                     18),
('/assets/p12_img5.jpeg', 'Trommelautomat MAS',             'Maschinenbau · Spezialwerkzeuge',    'Trommelautomat & diverse Spezial-Werkzeuge',                'MAS AG · CH-Sevelen',                     19);

-- ───────────────────────────────────────────────────────────────
--  GALLERY — Galería de imágenes (página Projekte)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url    VARCHAR(500) NOT NULL,
    alt_text   VARCHAR(255) NOT NULL DEFAULT '',
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO gallery (img_url, alt_text, sort_order) VALUES
('/assets/p7_img8.jpeg',  'Projekt',       1),
('/assets/p8_img3.jpeg',  'Drohne',        2),
('/assets/p9_img1.jpeg',  'Rohrsystem',    3),
('/assets/p8_img4.jpeg',  'Helicopter',    4),
('/assets/p9_img4.jpeg',  'Architektur',   5),
('/assets/p7_img16.jpeg', 'Motorrad',      6),
('/assets/p10_img2.jpeg', 'Magazinwagen',  7),
('/assets/p11_img3.jpeg', 'Drohne Wasp',   8),
('/assets/p7_img17.jpeg', 'FEM Motorrad',  9),
('/assets/p8_img2.jpeg',  'Turbine',      10),
('/assets/p8_img5.jpeg',  'Projekt',      11),
('/assets/p11_img2.jpeg', 'eTribike',     12);

-- ───────────────────────────────────────────────────────────────
--  PROZESS — Pasos del timeline (8 pasos)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS prozess_steps (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    step_num   VARCHAR(10)  NOT NULL DEFAULT '01',
    actors     JSON,        -- ["Kunde"] | ["iNOTEC"] | ["Kunde","iNOTEC"]
    title      VARCHAR(500) NOT NULL,
    desc_text  TEXT,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO prozess_steps (step_num, actors, title, desc_text, sort_order) VALUES
('01', '["Kunde"]',            'Kundenspezifikationen & Pflichtenheft',    'Anforderungen werden definiert und vollständig dokumentiert.',                                     1),
('02', '["Kunde","iNOTEC"]',   'Kick-off Meeting',                        'Gemeinsamer Projektstart, Zieldefinition und Meilensteinplanung.',                                 2),
('03', '["iNOTEC"]',           'Konzepte & Studien',                      'Erarbeitung möglicher Lösungsansätze und technischer Studien.',                                    3),
('04', '["Kunde","iNOTEC"]',   'Konzept-Präsentation V01 & Diskussion',   'Vorstellung erster Konzepte und strukturierte Feedback-Runde.',                                    4),
('05', '["iNOTEC"]',           'Anpassungen & Detailausarbeitung',         'Umsetzung des Feedbacks, FEM-Berechnungen und Animation auf Wunsch.',                             5),
('06', '["iNOTEC"]',           'Fertigungszeichnungen & Stücklisten',      'Vollständige Fertigungsdokumentation für die Produktion.',                                         6),
('07', '["Kunde","iNOTEC"]',   'Prototypenbau & Langzeittest',             'Bau, Funktions- und Langzeittests am physischen Prototypen.',                                     7),
('08', '["Kunde"]',            'Design Review · Serienfertigung · Vertrieb', 'Abschlussprüfung, Serienstart und Markteinführung.',                                            8);

-- ───────────────────────────────────────────────────────────────
--  REFERENZEN CLIENTS — Logos de clientes (24 empresas)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS referenzen_clients (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url    VARCHAR(500) NOT NULL,
    alt_text   VARCHAR(255) NOT NULL DEFAULT '',
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO referenzen_clients (img_url, alt_text, sort_order) VALUES
('/assets/p13_img1.jpeg',  'hcp',                  1),
('/assets/p13_img2.jpeg',  'MAS',                  2),
('/assets/p13_img3.jpeg',  'idonus',               3),
('/assets/p13_img4.jpeg',  'thyssenkrupp',         4),
('/assets/p13_img5.jpeg',  'Heinz Braukhoff',      5),
('/assets/p13_img6.jpeg',  'elringklinger',        6),
('/assets/p13_img7.jpeg',  'Aquarium Systems',     7),
('/assets/p13_img8.jpeg',  'SwissDrones',          8),
('/assets/p13_img9.jpeg',  'connova',              9),
('/assets/p13_img10.jpeg', 'ANAVIA',              10),
('/assets/p13_img11.jpeg', 'Leica Geosystems',    11),
('/assets/p13_img12.jpeg', 'straub',              12),
('/assets/p13_img13.jpeg', 'Oerlikon',            13),
('/assets/p13_img14.jpeg', 'ULTRALIGHT',          14),
('/assets/p13_img15.jpeg', 'Regal Raptor',        15),
('/assets/p13_img16.jpeg', 'spm',                 16),
('/assets/p13_img17.jpeg', 'TEL Mechatronics',    17),
('/assets/p13_img18.jpeg', 'PPS',                 18),
('/assets/p13_img19.jpeg', 'RMB',                 19),
('/assets/p13_img20.jpeg', 'glas trösch',         20),
('/assets/p13_img21.jpeg', 'Rheintal Isolationen', 21),
('/assets/p13_img22.jpeg', 'Andreas Frick AG',    22),
('/assets/p13_img23.jpeg', 'INOXWELDING',         23),
('/assets/p13_img24.jpeg', 'theSign',             24);

-- ───────────────────────────────────────────────────────────────
--  PARTNERS — Socios / Partners (6 empresas)
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url    VARCHAR(500) NOT NULL,
    name       VARCHAR(255) NOT NULL,
    desc_text  VARCHAR(500) NOT NULL DEFAULT '',
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO partners (img_url, name, desc_text, sort_order) VALUES
('/assets/p1_img3.jpeg',  'Kessler Consulting',       'Engineering-Partner · CH-Vilters · seit 2002',   1),
('/assets/p1_img4.png',   'Industrie Technik AG',     'Engineering · Projektierung · Automation · Service', 2),
('/assets/p1_img6.png',   'Hauswirth',                'Industrie-Elektrik · Elektrotechnik',            3),
('/assets/p1_img8.jpeg',  'INOXWELDING System GmbH',  'Spezialist für Edelstahlschweissen',             4),
('/assets/p1_img9.jpeg',  'RMB AG',                   'Maschinenbau & Automatisierung · CH-Sevelen',    5),
('/assets/p1_img10.jpeg', 'MAS AG',                   'Spezialmaschinenbau · CH-Sevelen',               6);

-- ───────────────────────────────────────────────────────────────
--  THREED CONTENT — Textos de la página 3D
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS threed_content (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_tag    VARCHAR(255) NOT NULL DEFAULT '3D-Dienstleistungen',
    page_title  VARCHAR(500) NOT NULL DEFAULT '3D-Animation & Visualisierung',
    page_sub    TEXT,
    -- Columna izquierda: Explosionszeichnung
    expl_tag    VARCHAR(255) NOT NULL DEFAULT '3D Explosion — Technische Erklärung',
    expl_title  VARCHAR(500) NOT NULL DEFAULT 'Was ist eine Explosionszeichnung?',
    expl_text1  TEXT,
    expl_text2  TEXT,
    expl_text3  TEXT,
    -- Columna derecha: Animation
    anim_tag    VARCHAR(255) NOT NULL DEFAULT '3D-Animation & Visualisierung — Vollständig',
    anim_title  VARCHAR(500) NOT NULL DEFAULT 'Parameter & Möglichkeiten',
    anim_text1  TEXT,
    anim_text2  TEXT,
    anim_text3  TEXT,
    anim_quote  TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO threed_content (id, page_sub, expl_text1, expl_text2, expl_text3, anim_text1, anim_text2, anim_text3, anim_quote) VALUES (1,
    'Besonders im Maschinenbau und der technischen Industrie werden Funktionen immer komplexer. Unsere 3D-Darstellungen schaffen klares Verständnis.',
    'Eine Explosionszeichnung (auch Explosionsgrafik, Explosivdarstellung) ist eine Art der Darstellung bei Zeichnungen und Grafiken, die einen komplexen Gegenstand perspektivisch und in seine Einzelteile zerlegt zeigt. Die dargestellten Einzelteile oder Bauteile sind räumlich voneinander getrennt — so, als flögen sie nach einer Explosion auseinander.',
    'Bei dieser Darstellungsweise wird das Wechselverhältnis des Ganzen zu seinen Teilen sowie deren Lage verdeutlicht. Explosivdarstellungen erlauben es, die Funktion und den Zusammenbau von Baugruppen darzustellen sowie einzelne Bauteile anhand angegebener Teilenummern zu bestimmen.',
    'Diese Art der Darstellung findet in verschiedenen Bereichen Verwendung: als Informationsgrafik in Gebrauchsanweisungen und Ersatzteil-Katalogen (auch virtuellen, interaktiven Katalogen).',
    'Besonders im Maschinenbau und der technischen Industrie werden Funktionen und Prozesse immer komplexer. Um diese Abläufe für den Laien, potenziellen Kunden oder den Facharbeiter verständlicher zu machen, benötigt es aussagekräftige Darstellungen oder Animationen, welche ein grundlegendes Verständnis schaffen.',
    '3D-Animationen können komplexe Sachverhalte oder technische Zusammenhänge veranschaulichen und verdeutlichen. Nach der Konstruktion des 3D-Modells erfolgt die Animation — dabei lassen sich fast alle Parameter eines Objekts animieren.',
    'Mit 3D-Visualisierungen erhalten Sie im Voraus einen realistischen Eindruck des geplanten Projekts. Als Grundlage können neben CAD-Daten auch Pläne oder Skizzen übernommen und verarbeitet werden. Nach der Konstruktion werden die Oberflächen bzw. Materialien, die Beleuchtung und die Kameraansichten definiert. Korrekturen und Änderungen am Modell oder der Umgebung sind hier noch jederzeit möglich. Ausgegeben werden hochauflösende Bilddateien zur weiteren Verarbeitung.',
    'Diese beiden Anwendungen sind hervorragend für die Präsentation und Vermarktung neuer Produkte geeignet.'
) ON DUPLICATE KEY UPDATE id = id;

-- ───────────────────────────────────────────────────────────────
--  THREED IMAGES — Imágenes de la página 3D
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS threed_images (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url    VARCHAR(500) NOT NULL,
    alt_text   VARCHAR(255) NOT NULL DEFAULT '',
    caption_h  VARCHAR(255) NOT NULL DEFAULT '',
    caption_p  VARCHAR(500) NOT NULL DEFAULT '',
    type       ENUM('hero_main','hero_small','bottom') NOT NULL DEFAULT 'bottom',
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO threed_images (img_url, alt_text, caption_h, caption_p, type, sort_order) VALUES
('/assets/p4_img1.jpeg', 'iNOTEC-EVO I',        'iNOTEC-EVO I',          '3D-Visualisierung · Vakuumanlage',       'hero_main',  1),
('/assets/p4_img2.jpeg', 'iNO-flex 650',         'iNO-flex 650',          'Rotation & Revolution System',           'hero_small', 2),
('/assets/p3_img2.jpeg', '3D Explosion',         '3D-Explosion',          'Baugruppenzerlegung',                    'hero_small', 3),
('/assets/p5_img1.jpeg', 'Maschineninneres',      'Maschinen-Visualisierung','Fotorealistische 3D-Darstellung',      'hero_small', 4),
('/assets/p4_img3.jpeg', 'iTEC-Sp5',             '3D-Animation',          'Komplexe Sachverhalte animiert für Präsentation & Vermarktung neuer Produkte.', 'bottom', 5),
('/assets/p3_img1.jpeg', '3D Explosion Komponente','3D-Explosionszeichnung','Einzelteile räumlich getrennt dargestellt — für Montageanleitungen und Kataloge.', 'bottom', 6),
('/assets/p6_img1.jpeg', 'Projektmanagement',    '3D-Visualisierung',     'Realistischer Eindruck des geplanten Projekts auf Basis von CAD-Daten und Skizzen.', 'bottom', 7);

-- ───────────────────────────────────────────────────────────────
--  FEM CONTENT — Textos de la página FEM
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fem_content (
    id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    img_url   VARCHAR(500) NOT NULL DEFAULT '/assets/p2_img1.jpeg',
    img_alt   VARCHAR(255) NOT NULL DEFAULT 'FEM Belastungsanalyse',
    img_badge VARCHAR(500) NOT NULL DEFAULT 'FEM · Hauptspannung · Typ 1 · max. 98.1 MPa',
    tag       VARCHAR(255) NOT NULL DEFAULT 'Belastungsanalyse',
    title     VARCHAR(500) NOT NULL DEFAULT 'Digitale Produktentwicklung — heute Realität',
    text1     TEXT,
    text2     TEXT,
    text3     TEXT,
    text4     TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO fem_content (id, text1, text2, text3, text4) VALUES (1,
    'Die digitale Produktentwicklung ist keine Zukunftsmusik, sondern eine reale und notwendige Methode, um die Entwicklungsprozesse effizienter zu gestalten und signifikant zu beschleunigen.',
    'Die konstruktionsbegleitende Berechnung ist ein wesentlicher Teil der digitalen Entwicklung und übernimmt eine wichtige Rolle. Sie hilft mit, Entwicklungszeiten zu verkürzen, den Aufwand beim Bau von Prototypen zu verringern, Fertigungskosten zu reduzieren, Innovationen zu ermöglichen und die Qualität zu verbessern.',
    'Durch die Verlagerung der Untersuchung von Varianten, der Materialoptimierung, der Kostenanalyse und notwendigen Anpassungen in frühen Phasen der Produktentwicklung lassen sich Kosten senken. Spätere Änderungen im Entwicklungsprozess sind kostspielig. Späte Ideen kommen oft nur deshalb nicht mehr zum Zug, weil eine Modifikation zu teuer wäre.',
    'Die Optimierung des virtuellen Prototyps dagegen kostet weniger Zeit und Geld als der Bau von physischen Prototypen und die Durchführung langwieriger Testreihen. Wer Innovationen früher und vor allem vor dem Wettbewerb auf den Markt bringt, kann bessere Preise erzielen und wirtschaftlicher arbeiten. Der Langsame muss sich mit niedrigen Preisen gegen den Schnellen behaupten und auf Rendite verzichten — das kann ein verlustreicher Kampf werden.'
) ON DUPLICATE KEY UPDATE id = id;

-- ───────────────────────────────────────────────────────────────
--  FEM BENEFITS — Lista de ventajas FEM
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fem_benefits (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    text       VARCHAR(500) NOT NULL,
    sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO fem_benefits (text, sort_order) VALUES
('Entwicklungszeiten signifikant verkürzen',              1),
('Prototypenaufwand und Fertigungskosten senken',         2),
('Materialoptimierung durch Variantenvergleich',          3),
('Innovationen früher als der Wettbewerb marktreif',      4),
('Qualitätsverbesserung durch digitale Voruntersuchung',  5),
('Kostenanalyse und Anpassungen in frühen Phasen',        6);

-- ───────────────────────────────────────────────────────────────
--  CONTACT MESSAGES — Mensajes del formulario de contacto
-- ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(100) NOT NULL DEFAULT '',
    message    TEXT         NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read    TINYINT(1)   NOT NULL DEFAULT 0,
    INDEX idx_created (created_at),
    INDEX idx_read    (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ═══════════════════════════════════════════════════════════════
--  FIN DEL SCRIPT
--  Tablas creadas: 15
--  Registros iniciales: todos los datos actuales de la web
-- ═══════════════════════════════════════════════════════════════
