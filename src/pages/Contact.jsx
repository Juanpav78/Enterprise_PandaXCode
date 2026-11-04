import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Mail, MessageCircle, Send } from 'lucide-react'
import Seo from '../components/Seo'
import SectionHeader from '../components/SectionHeader'
import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { fallbackServices } from '../data/fallback'
import { config, whatsappLink } from '../config'
import { idOf } from '../utils/format'

const budgets = ['Menos de $1.000.000', '$1.000.000 a $2.000.000', '$2.000.000 a $4.000.000', 'Más de $4.000.000', 'No lo sé aún']

// Fuera del componente para que los inputs no pierdan el foco al escribir
const Field = ({ error, children }) => (
  <div>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
)

const initial = { name: '', email: '', phone: '', company: '', service: '', budget: '', message: '', website: '', consent: false }

export default function Contact() {
  const [params] = useSearchParams()
  const { data: services } = useApi(api.getServices, fallbackServices)
  const [form, setForm] = useState({ ...initial, service: params.get('servicio') || '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [serverError, setServerError] = useState('')

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Escribe tu nombre'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Escribe un correo válido'
    if (!form.message.trim() || form.message.trim().length < 10) er.message = 'Cuéntanos un poco más de tu proyecto'
    if (!form.consent) er.consent = 'Debes aceptar la política de tratamiento de datos'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (form.website) return // honeypot: si un bot llena este campo oculto, no enviamos
    if (!validate()) return

    setStatus('sending')
    setServerError('')
    try {
      const { website, ...payload } = form
      await api.sendContact(payload)
      setStatus('sent')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  return (
    <>
      <Seo title="Contacto" description="Cotiza tu página web con PandaX Code. Respondemos en menos de 24 horas." />
      <section className="container-px grid gap-12 pt-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeader
            eyebrow="Contacto"
            title="Cotiza tu"
            highlight="proyecto"
            description="Cuéntanos qué necesitas y te enviamos una propuesta con alcance, tiempos y valor. Respondemos en menos de 24 horas hábiles."
            center={false}
          />
          <div className="mt-8 space-y-4">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-5 transition hover:border-accent/40">
              <MessageCircle className="text-accent" />
              <div>
                <p className="font-semibold">WhatsApp</p>
                <p className="text-sm text-muted">La forma más rápida de hablar con nosotros</p>
              </div>
            </a>
            <a href={`mailto:${config.email}`} className="card flex items-center gap-4 p-5 transition hover:border-accent/40">
              <Mail className="text-accent" />
              <div>
                <p className="font-semibold">Correo</p>
                <p className="text-sm text-muted">{config.email}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          {status === 'sent' ? (
            <div className="card flex flex-col items-center p-10 text-center">
              <CheckCircle2 size={48} className="text-accent" />
              <h2 className="mt-4 text-2xl font-semibold">¡Mensaje recibido!</h2>
              <p className="mt-2 text-muted">Te contactaremos muy pronto con tu propuesta.</p>
              <button onClick={() => setStatus('idle')} className="btn-ghost mt-6">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="card grid gap-5 p-6 md:grid-cols-2 md:p-8">
              {/* Honeypot anti-spam: oculto para personas */}
              <input type="text" name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <Field error={errors.name}>
                <label className="mb-1.5 block text-sm" htmlFor="name">Nombre *</label>
                <input id="name" name="name" className="input" value={form.name} onChange={update} autoComplete="name" />
              </Field>
              <Field error={errors.email}>
                <label className="mb-1.5 block text-sm" htmlFor="email">Correo *</label>
                <input id="email" name="email" type="email" className="input" value={form.email} onChange={update} autoComplete="email" />
              </Field>
              <Field error={errors.phone}>
                <label className="mb-1.5 block text-sm" htmlFor="phone">WhatsApp / teléfono</label>
                <input id="phone" name="phone" type="tel" className="input" value={form.phone} onChange={update} autoComplete="tel" />
              </Field>
              <Field error={errors.company}>
                <label className="mb-1.5 block text-sm" htmlFor="company">Empresa o negocio</label>
                <input id="company" name="company" className="input" value={form.company} onChange={update} autoComplete="organization" />
              </Field>
              <Field error={errors.service}>
                <label className="mb-1.5 block text-sm" htmlFor="service">Servicio</label>
                <select id="service" name="service" className="input" value={form.service} onChange={update}>
                  <option value="">Selecciona una opción</option>
                  {(services || []).map((s) => (
                    <option key={idOf(s)} value={s.slug || s.title}>{s.title}</option>
                  ))}
                  <option value="otro">Otro</option>
                </select>
              </Field>
              <Field error={errors.budget}>
                <label className="mb-1.5 block text-sm" htmlFor="budget">Presupuesto aproximado</label>
                <select id="budget" name="budget" className="input" value={form.budget} onChange={update}>
                  <option value="">Selecciona una opción</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field error={errors.message}>
                  <label className="mb-1.5 block text-sm" htmlFor="message">Cuéntanos de tu proyecto *</label>
                  <textarea id="message" name="message" rows={5} className="input resize-y" value={form.message} onChange={update} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field error={errors.consent}>
                  <label className="flex items-start gap-3 text-sm text-muted">
                    <input type="checkbox" name="consent" checked={form.consent} onChange={update} className="mt-1 accent-[var(--color-accent)]" />
                    <span>
                      Autorizo el tratamiento de mis datos personales según la{' '}
                      <Link to="/privacidad" className="text-accent underline">política de privacidad</Link>.
                    </span>
                  </label>
                </Field>
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 md:col-span-2">
                  No pudimos enviar tu mensaje ({serverError}). Intenta de nuevo o escríbenos por WhatsApp.
                </p>
              )}

              <div className="md:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn-primary disabled:opacity-60">
                  {status === 'sending' ? 'Enviando…' : 'Enviar solicitud'} <Send size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
