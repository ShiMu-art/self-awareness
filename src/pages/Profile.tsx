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
          我的 · 情侣档案
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
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 花茎 */}
              <path d="M20 25 L20 58" stroke="#3d6b4a" strokeWidth="1.5" />
              {/* 叶子 */}
              <ellipse cx="16" cy="42" rx="4" ry="2" fill="#3d6b4a" transform="rotate(-30 16 42)" />
              <ellipse cx="24" cy="48" rx="4" ry="2" fill="#3d6b4a" transform="rotate(30 24 48)" />
              {/* 花瓣 - 外层 */}
              <ellipse cx="20" cy="14" rx="8" ry="10" fill="#7B3038" opacity="0.7" />
              <ellipse cx="15" cy="16" rx="6" ry="8" fill="#7B3038" opacity="0.8" transform="rotate(-15 15 16)" />
              <ellipse cx="25" cy="16" rx="6" ry="8" fill="#7B3038" opacity="0.8" transform="rotate(15 25 16)" />
              {/* 花瓣 - 内层 */}
              <ellipse cx="20" cy="13" rx="5" ry="7" fill="#9b3a44" opacity="0.9" />
              <ellipse cx="18" cy="14" rx="3" ry="5" fill="#b04050" transform="rotate(-10 18 14)" />
              <ellipse cx="22" cy="14" rx="3" ry="5" fill="#b04050" transform="rotate(10 22 14)" />
              {/* 花心 */}
              <circle cx="20" cy="12" r="2.5" fill="#5a1a22" />
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
