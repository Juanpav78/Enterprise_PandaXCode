# 🐼 PandaX Code — sitio web

> Sitio de PandaX Code, mi marca de diseño y desarrollo web: servicios, portafolio, retos y formulario de contacto.
>
> 🔗 **[pandaxcode.com](https://pandaxcode.com)**

![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Express](https://img.shields.io/badge/API-Express_%2B_MongoDB-000000?style=flat&logo=express&logoColor=white)

**Lo que demuestra este proyecto:** un frontend desacoplado que consume una API compartida con mi portafolio, con datos de respaldo si la API no responde, SEO por página con react-helmet-async, rutas SPA en Netlify y una sola fuente de contenido para varios sitios gracias al filtro `site`.

## ✨ Secciones

- **Inicio** con titular animado, servicios, proyectos destacados, proceso de trabajo y testimonios
- **Servicios** con precios desde la API
- **Portafolio** con modal de detalle por proyecto
- **Retos**: una landing nueva por cada temática al azar
- **Nosotros**, **Contacto** (con botón de WhatsApp) y **Política de privacidad**

## 📖 Detalles técnicos

Consume la **API compartida** (la misma del portafolio y del admin).
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


## Publicar en Netlify o Cloudflare Pages

- Comando de build: `npm run build`
- Carpeta de salida: `dist`
- Variables de entorno: las mismas del `.env`
- `public/_redirects` ya está incluido para que las rutas (`/servicios`, `/contacto`…) funcionen al recargar.

> Nota SEO: al ser React con Vite (SPA), Google puede leer el contenido, pero más lento que con un sitio
> renderizado en el servidor. Los títulos y descripciones por página ya están con `react-helmet-async`.
> Si más adelante el posicionamiento se vuelve prioridad, migrar a Next.js es directo porque los componentes se reutilizan.

---

Hecho por **Juan Pablo Alvarado** · [Portafolio](https://juanpalvaradov.com) · [LinkedIn](https://www.linkedin.com/in/juanpavpandax/) · [GitHub](https://github.com/Juanpav78)
