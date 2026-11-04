import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../config'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-bg shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-accent-strong"
    >
      <MessageCircle size={26} />
    </a>
  )
}
