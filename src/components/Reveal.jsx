import { useEnPantalla } from '../hooks/useMotion'

// Envuelve un bloque para que aparezca (fundido + 16px hacia arriba) al entrar en pantalla,
// una sola vez. El estilo vive en index.css (.reveal), que lo desactiva con menos movimiento.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, visto] = useEnPantalla()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visto ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
