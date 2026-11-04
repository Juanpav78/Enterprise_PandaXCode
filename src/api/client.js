import { config } from '../config'
import { endpoints } from './endpoints'

const buildQuery = (params = {}) => {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.append(key, value)
  })
  const str = query.toString()
  return str ? `?${str}` : ''
}

async function request(path, options = {}) {
  const res = await fetch(`${config.apiUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  let json = null
  try {
    json = await res.json()
  } catch {
    // respuesta sin cuerpo
  }

  if (!res.ok) {
    const message = json?.message || json?.error || `Error ${res.status}`
    throw new Error(message)
  }

  // Acepta tanto respuestas tipo [..] como { data: [..] }
  return json?.data ?? json
}

export const api = {
  getServices: () => request(`${endpoints.services}${buildQuery({ site: config.site })}`),

  getProjects: (params = {}) =>
    request(`${endpoints.projects}${buildQuery({ site: config.site, ...params })}`),

  getProject: (slug) => request(endpoints.project(slug)),

  getTestimonials: () => request(`${endpoints.testimonials}${buildQuery({ site: config.site })}`),

  sendContact: (data) =>
    request(endpoints.contact, {
      method: 'POST',
      body: JSON.stringify({ ...data, site: config.site }),
    }),
}
