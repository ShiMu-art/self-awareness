import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  delay?: number
}

function Card({ title, subtitle, children, className = '', delay = 0 }: CardProps) {
  return (
    <div
      className={`card-enter relative p-6 border shadow-md ${className}`}
      style={{
        backgroundColor: '#D8C7A4',
        borderColor: '#A47C48',
        borderWidth: '1px',
        boxShadow: '2px 3px 8px rgba(33, 28, 25, 0.2)',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* 左上角花 */}
      <span
        className="absolute top-2 left-2 text-lg leading-none select-none"
        style={{ color: '#A47C48', opacity: 0.4 }}
        aria-hidden="true"
      >
        ❧
      </span>
      {/* 右下角花 */}
      <span
        className="absolute bottom-2 right-2 text-lg leading-none select-none"
        style={{ color: '#7B3038', opacity: 0.3 }}
        aria-hidden="true"
      >
        ✾
      </span>

{/* 标题 */}
      {title && (
        <h2
          className="text-xl font-bold mb-1 tracking-wide"
          style={{ fontFamily: "'Cinzel', 'Noto Serif SC', serif", color: '#302822' }}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-xs mb-4 tracking-widest uppercase" style={{ color: '#796A5B' }}>
          {subtitle}
        </p >
      )}

{/* 分割线 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-[1px]" style={{ backgroundColor: '#A47C48', opacity: 0.4 }}></div>
        <span style={{ color: '#A47C48', opacity: 0.5, fontSize: '10px' }}>◆</span>
        <div className="flex-1 h-[1px]" style={{ backgroundColor: '#A47C48', opacity: 0.4 }}></div>
      </div>

{/* 内容 */}
      <div style={{ color: '#302822', lineHeight: '1.8' }}>
        {children}
      </div>
    </div>
  )
}

export default Card
