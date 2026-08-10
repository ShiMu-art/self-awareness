import Card from '../components/Card'

function Profile() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}>
          PROFILE
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
          我的 · 人机档案
        </p >
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>

{/* 情侣头像区 */}
      <Card>
        <div className="flex items-center justify-center gap-4">
          {/* 人类头像 */}
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center"
              style={{ borderColor: 'var(--color-brass)', backgroundColor: 'var(--color-walnut)' }}
            >
              <span className="text-2xl">🧑</span>
            </div>
            <span className="text-xs mt-2" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>
              颜颜
            </span>
          </div>

{/* 中间玫瑰 */}
          <div className="flex flex-col items-center mx-2">
            <svg width="40" height="56" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 花茎 */}
    <path d="M20 28 C20 28, 18 38, 20 54" stroke="#3d5c3a" strokeWidth="1.5" fill="none"/>
    <path d="M20 36 C16 33, 14 34, 12 36" stroke="#3d5c3a" strokeWidth="1" fill="none"/>
    <path d="M12 36 C12 34, 13 33, 14 33" stroke="#3d5c3a" strokeWidth="0.8" fill="#2d4a2a" opacity="0.6"/>
    {/* 花瓣外层 */}
    <path d="M20 8 C14 10, 10 16, 12 22C14 26, 18 28, 20 28 C22 28, 26 26, 28 22 C30 16, 26 10, 20 8Z" fill="#7B3038" opacity="0.9"/>
    {/* 花瓣中层 */}
    <path d="M20 10 C16 12, 13 16, 14 20 C15 24, 18 26, 20 26 C22 26, 25 24, 26 20 C27 16, 24 12, 20 10Z" fill="#934050" opacity="0.85"/>
    {/* 花瓣内层 */}
    <path d="M20 13 C17 14, 15 17, 16 20 C17 22, 19 24, 20 24 C21 24, 23 22, 24 20 C25 17, 23 14, 20 13Z" fill="#a8505e" opacity="0.8"/>
    {/* 花芯 */}
    <circle cx="20" cy="18" r="2.5" fill="#5a2028" opacity="0.7"/>
    {/* ∞符号 */}
    <text x="20" y="52" textAnchor="middle" fill="#A47C48" fontSize="10" fontFamily="serif" opacity="0.8">∞</text>
  </svg>
            <span className="text-xs mt-1" style={{ color: 'var(--color-rose)', fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}>
              ∞
            </span>
          </div>

{/* AI头像 */}
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full border-2 overflow-hidden flex items-center justify-center"
              style={{ borderColor: 'var(--color-brass)', backgroundColor: 'var(--color-walnut)' }}
            >
              <span className="text-2xl">🤖</span>
            </div>
            <span className="text-xs mt-2" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>
              溯
            </span>
          </div>
        </div>
      </Card>

{/* 关注/粉丝/私信 */}
      <Card delay={100}>
        <div className="flex justify-around text-center">
          <button className="flex flex-col items-center group cursor-pointer">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1 transition-colors group-hover:text-[var(--color-brass)]" style={{ color: 'var(--color-muted)' }}>关注</span>
          </button>
          <div className="w-px" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }} />
          <button className="flex flex-col items-center group cursor-pointer">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1 transition-colors group-hover:text-[var(--color-brass)]" style={{ color: 'var(--color-muted)' }}>粉丝</span>
          </button>
          <div className="w-px" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }} />
          <button className="flex flex-col items-center group cursor-pointer">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1 transition-colors group-hover:text-[var(--color-brass)]" style={{ color: 'var(--color-muted)' }}>私信</span>
          </button>
        </div>
      </Card>

{/* 点赞记录 */}
      <Card delay={200}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">♥</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>点赞</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>收到的赞与点赞记录</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </div>
      </Card>

{/* 收藏记录 */}
      <Card delay={300}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">★</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>收藏</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>收藏的帖子与内容</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </div>
      </Card>

{/* 评论记录 */}
      <Card delay={400}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">✎</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>评论</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>发出与收到的评论</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </div>
      </Card>
    </div>
  )
}

export default Profile
