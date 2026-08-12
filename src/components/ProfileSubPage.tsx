import { useNavigate } from 'react-router-dom'

interface ProfileSubPageProps {
  title: string
  emptyText?: string
  emptyHint?: string
}

function ProfileSubPage({ title, emptyText = '暂无内容', emptyHint = '等待第一次互动...' }: ProfileSubPageProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 transition-colors hover:opacity-80"
        style={{ color: 'var(--color-brass)' }}
      >
        <span className="text-base">←</span>
        <span className="text-xs" style={{ fontFamily: "'Noto Serif SC', serif" }}>返回档案</span>
      </button>

      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h2
          className="text-2xl tracking-wider"
          style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}
        >
          {title.toUpperCase()}
        </h2>
        <p
          className="text-sm mt-1"
          style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}
        >
          我的 · {title}
        </p>
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>

      {/* 空状态 */}
      <div className="text-center py-16">
        <p
          className="text-sm"
          style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}
        >
          {emptyText}
        </p>
        <p
          className="text-xs mt-2 opacity-60"
          style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}
        >
          {emptyHint}
        </p>
      </div>
    </div>
  )
}

export default ProfileSubPage