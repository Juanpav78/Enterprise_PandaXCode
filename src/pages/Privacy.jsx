import Seo from '../components/Seo'
import { config } from '../config'

// Datos del responsable del tratamiento (Ley 1581 de 2012). Si cambian (p. ej. al constituir
// la empresa con NIT), actualízalos aquí junto con la fecha de actualización.
const RESPONSABLE = 'Juan Pablo Alvarado Valero'
const DOCUMENTO = 'cédula de ciudadanía n.º 1.127.623.037'
const CIUDAD = 'Bogotá D.C.'
const ACTUALIZACION = '5 de noviembre de 2026'

export default function Privacy() {
  return (
    <>
      <Seo title="Política de privacidad" />
      <article className="container-px max-w-3xl pt-20 text-sm leading-relaxed text-muted">
        <h1 className="text-3xl font-semibold text-ink">Política de tratamiento de datos personales</h1>
        <p className="mt-2">Última actualización: {ACTUALIZACION}</p>

        <h2 className="mt-8 text-lg font-semibold text-ink">1. Responsable</h2>
        <p className="mt-2">
          {RESPONSABLE}, identificado con {DOCUMENTO}, con domicilio en {CIUDAD}, Colombia, quien opera bajo la
          marca PandaX Code. Correo de contacto: {config.email}.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink">2. Datos que recolectamos</h2>
        <p className="mt-2">
          Nombre, correo electrónico, número de teléfono, empresa y la información que nos compartas sobre tu
          proyecto a través del formulario de contacto, WhatsApp o correo.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink">3. Finalidad</h2>
        <p className="mt-2">
          Usamos tus datos para responder tu solicitud, enviarte cotizaciones, prestar los servicios contratados,
          facturar o emitir cuentas de cobro y, si lo autorizas, enviarte información sobre nuestros servicios.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink">4. Derechos del titular</h2>
        <p className="mt-2">
          De acuerdo con la Ley 1581 de 2012, puedes conocer, actualizar, rectificar y solicitar la supresión de tus
          datos, revocar la autorización y presentar quejas ante la Superintendencia de Industria y Comercio.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink">5. Cómo ejercer tus derechos</h2>
        <p className="mt-2">
          Escríbenos a {config.email} indicando tu nombre, documento y tu solicitud. Responderemos dentro de los
          plazos establecidos por la ley.
        </p>

        <h2 className="mt-8 text-lg font-semibold text-ink">6. Seguridad y conservación</h2>
        <p className="mt-2">
          Protegemos tus datos con medidas técnicas razonables y no los vendemos ni compartimos con terceros, salvo
          los proveedores necesarios para operar (por ejemplo, hosting y correo) o cuando la ley lo exija.
        </p>
      </article>
    </>
  )
}
