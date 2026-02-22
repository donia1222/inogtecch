# iNOTEC Engineering — Website

Sitio web corporativo de **iNOTEC Engineering**, empresa especializada en ingeniería mecánica, vacuumtechnik, diseño 3D y prototipado. Desarrollado con **Next.js 14** y CSS puro.

---

## Stack

- [Next.js 14](https://nextjs.org/) — App Router
- React 18
- CSS global (`app/globals.css`) — sin librerías externas
- Fuentes: Inter (Google Fonts)

---

## Estructura del proyecto

```
inotec-next/
├── app/
│   ├── layout.js          # Layout global (Navbar + Footer)
│   ├── page.js            # Inicio — Hero, About, Kontakt
│   ├── globals.css        # Estilos globales + modo día/noche
│   ├── leistungen/        # Página Leistungen (servicios)
│   ├── fem/               # Página FEM (Belastungsanalyse)
│   ├── 3d/                # Página 3D Animation & Visualisierung
│   ├── prozess/           # Página Projektmanagement
│   ├── projekte/          # Página Projekte & Galerie
│   └── referenzen/        # Página Referenzen & Partner
├── components/
│   ├── Navbar.js          # Navegación con menú móvil hamburger
│   ├── Footer.js          # Pie de página
│   ├── ContactForm.js     # Formulario de contacto (client)
│   └── FadeInObserver.js  # Animaciones fade-in con IntersectionObserver
└── public/
    └── assets/            # Imágenes del proyecto
```

---

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Hero, presentación, servicios, contacto |
| `/leistungen` | Kernkompetenzen — tarjetas de servicios |
| `/fem` | FEM Belastungsanalyse |
| `/3d` | 3D Animation, Visualisierung, Explosionszeichnungen |
| `/prozess` | Projektmanagement — timeline de 8 pasos |
| `/projekte` | Proyectos realizados + galería |
| `/referenzen` | Logos de clientes + red de partners |

---

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# → http://localhost:3000

# Build de producción
npm run build
npm start
```

---

## Características

- **Modo día / noche** — toggle persistente en `localStorage`
- **Menú móvil** — panel hamburger con animación, cierre por overlay
- **Animaciones fade-in** — activadas por `IntersectionObserver`
- **Ticker animado** — cinta de tecnologías en la home
- **Formulario de contacto** — client component con validación
- **Totalmente responsive** — móvil, tablet y desktop

---

## Contacto

**iNOTEC Engineering**
Bahnhofstrasse 2 · CH-9475 Sevelen · Schweiz
Tel: +41 81 756 74 55
www.inotecengineering.ch
# inotec
