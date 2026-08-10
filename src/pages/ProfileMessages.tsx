import { useNavigate } from 'react-router-dom'

function ProfileMessages() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[var(--color-coal)] px-4 py-6">
      {/* 顶部返回栏 */}
      <div className="max-w-2xl mx-auto mb-6">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 text-[var(--color-brass)] hover:text-[var(--color-paper)] transition-colors"
        >
          <span className="text-lg">←</span>
          <span className="text-sm font-serif">返回档案</span>
        </button>
      </div>

      {/* 页面标题 */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-[var(--color-paper)] font-serif text-xl tracking-wide">私信</h2>
        <div className="w-12 h-px bg-[var(--color-brass)] mx-auto mt-3 opacity-60"></div>
      </div>

      {/* 空状态 */}
      <div className="max-w-2xl mx-auto text-center py-16">
        <p className="text-[var(--color-muted)] font-serif text-sm">暂无内容</p >
        <p className="text-[var(--color-muted)] font-serif text-xs mt-2 opacity-60">等待第一次互动...</p >
      </div>
    </div>
  )
}

export default ProfileMessages
