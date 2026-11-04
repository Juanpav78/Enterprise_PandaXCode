# PandaX Code · Frontend (React + Vite)

Web de la empresa PandaX Code. Consume la **API compartida** (la misma del portafolio y del admin).
Stack: React 18, Vite, React Router, Tailwind CSS v4, lucide-react, react-helmet-async.

## Arrancar

```bash
npm install
cp .env.example .env      # y completa tus datos
npm run dev               # http://localhost:5174
npm run build             # genera /dist para publicar
```

Si la API no responde o aún no tiene contenido, la web muestra los datos de `src/data/fallback.js`,
así que puedes trabajar el diseño sin tener el backend corriendo.

## Ubicación en tu monorepo

```
pandax/
├── api/          ← tu backend (Express + MongoDB)
├── admin/
├── portafolio/
└── code/         ← esta carpeta
```

## Conexión con el backend

Todas las rutas están en **`src/api/endpoints.js`**. Si las tuyas se llaman distinto, cámbialas solo ahí.
El cliente (`src/api/client.js`) acepta respuestas tipo `[...]` o `{ data: [...] }`.

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/services?site=code` | Tarjetas de servicios y select del formulario |
| GET | `/projects?site=code&featured=true&limit=3` | Proyectos (inicio y portafolio) |
| GET | `/projects/:slug` | Detalle de un proyecto (opcional) |
| GET | `/testimonials?site=code` | Testimonios (la sección se oculta si no hay) |
| POST | `/contact` | Formulario de contacto |

El filtro `site=code` es la clave para compartir la base de datos: en el admin, cada documento tiene
`sitios: ["code", "portafolio"]` y la API devuelve solo los que incluyen el sitio pedido.
Ejemplo en Express:

```js
router.get('/projects', async (req, res) => {
  const { site, featured, limit } = req.query
  const filter = { publicado: true }
  if (site) filter.sitios = site
  if (featured === 'true') filter.featured = true
  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).limit(Number(limit) || 0)
  res.json(projects)
})
```

Recuerda habilitar CORS en la API para el dominio de esta web (y `http://localhost:5174` en desarrollo,
en `CORS_ORIGINS` del backend). El puerto 5173 lo usa el portafolio.

## Campos que usa el frontend

**Servicio**
```js
{ title, slug, description, icon, priceFrom, priceSuffix, priceLabelPrefix, priceLabel, order, sitios }
// icon: 'layout' | 'monitor' | 'shopping-bag' | 'pen-tool' | 'code' | 'rocket'
// priceLabel reemplaza el precio (ej: "A la medida de tu proyecto")
```

**Proyecto**
```js
{ title, slug, category, subtitle, summary, description, objective, result,
  highlights: [String], technologies: [String],
  cover, images: [String | { url }], url, featured, order, sitios }
```

**Testimonio**
```js
{ name, company, role, text, sitios }
```

**Contacto (POST)**: el frontend envía
```js
{ name, email, phone, company, service, budget, message, consent: true, site: 'code' }
```
Guárdalo en una colección `mensajes` para verlo en el admin y, si quieres, envíate un correo de aviso.
Valida también en el backend (nombre, correo, mensaje y `consent === true`).

## Pendientes antes de publicar

- [x] Logo del panda en `public/logo.svg` y favicon
- [ ] Poner la imagen del hero en `public/hero.webp` y la foto en `public/nosotros.webp`
- [ ] Completar los datos entre `[ ]` en `src/pages/Privacy.jsx`
- [ ] Escribir tu historia en `src/pages/About.jsx`
- [ ] Completar el `.env` (API, WhatsApp, correo, Instagram, enlace a la tienda)
- [ ] Cargar servicios y proyectos reales desde el admin

## Publicar en Netlify o Cloudflare Pages

- Comando de build: `npm run build`
- Carpeta de salida: `dist`
- Variables de entorno: las mismas del `.env`
- `public/_redirects` ya está incluido para que las rutas (`/servicios`, `/contacto`…) funcionen al recargar.

> Nota SEO: al ser React con Vite (SPA), Google puede leer el contenido, pero más lento que con un sitio
> renderizado en el servidor. Los títulos y descripciones por página ya están con `react-helmet-async`.
> Si más adelante el posicionamiento se vuelve prioridad, migrar a Next.js es directo porque los componentes se reutilizan.
