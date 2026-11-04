import { api } from '../api/client'
import { useApi } from '../hooks/useApi'
import { fallbackServices } from '../data/fallback'
import ServiceCard from './ServiceCard'
import { idOf } from '../utils/format'

export default function ServicesGrid() {
  const { data, loading } = useApi(api.getServices, fallbackServices)
  const services = [...(data || [])].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

  return (
    <div className={`mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${loading ? 'opacity-70' : ''}`}>
      {services.map((s) => (
        <ServiceCard key={idOf(s)} service={s} />
      ))}
    </div>
  )
}
