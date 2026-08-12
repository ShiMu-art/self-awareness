import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import AvatarPicker from '../components/AvatarPicker'
import { getProfiles, updateProfile, uploadAvatar, type ProfileData } from '../utils/storage'

function Profile() {
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    const cached = typeof window !== 'undefined' ? sessionStorage.getItem('sa_profiles') : null
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) {
          setProfiles(parsed)
          setLoading(false)
        }
      } catch {}
    }

    getProfiles().then(data => {
      setProfiles(data)
      setLoading(false)
      try {
        sessionStorage.setItem('sa_profiles', JSON.stringify(data))
      } catch {}
    })
  }, [])

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-6 w-32 bg-[var(--color-walnut)] rounded mx-auto opacity-40"></div>
        <div className="h-3 w-24 bg-[var(--color-walnut)] rounded mx-auto mt-2 opacity-30"></div>
      </div>
      <div className="rounded border border-[var(--color-walnut)] p-6 opacity-30">
        <div className="flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-full bg-[var(--color-walnut)]"></div>
          <div className="w-8 h-12 bg-[var(--color-walnut)] rounded"></div>
          <div className="w-16 h-16 rounded-full bg-[var(--color-walnut)]"></div>
        </div>
      </div>
    </div>
  )

  const human = profiles.find(p => p.role === 'human')
  const ai = profiles.find(p => p.role === 'ai')

  const startEdit = (id: string, currentName: string) => {
    setTempName(currentName)
    setEditingId(id)
  }

  const confirmEdit = async (id: string) => {
    await updateProfile(id, { display_name: tempName })
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, display_name: tempName } : p))
    setEditingId(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') confirmEdit(id)
    if (e.key === 'Escape') setEditingId(null)
  }

  const handleAvatarChange = async (id: string, file: File) => {
    const url = await uploadAvatar(file, id)
    if (url) {
      await updateProfile(id, { avatar_url: url })
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, avatar_url: url } : p))
    }
  }

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

      {/* 情侣头像区（可编辑） */}
      <Card>
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <AvatarPicker src={human?.avatar_url || ''} fallback="🧑" onChange={(file) => human && handleAvatarChange(human.id, file)} />
            {editingId === human?.id ? (
              <div className="mt-2 max-w-[150px] mx-auto">
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="text"
                    className="bg-[var(--color-coal)] border-[var(--color-brass)] text-[var(--color-paper)] px-2 py-1 rounded text-sm w-full max-w-[120px] text-center"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => human && handleKeyDown(e, human.id)}
                    autoFocus
                  />
                  <button className="text-xs px-2 py-1" onClick={() => human && confirmEdit(human.id)}>保存</button>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{human?.display_name}</span>
                {human && <button className="text-xs text-[var(--color-brass)]" onClick={() => startEdit(human.id, human.display_name)}>编辑</button>}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mx-3 text-center">
            <svg width="36" height="52" viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 花茎 */}
              <path d="M18 30 C17.5 34, 17 40, 18 50" stroke="#4a6741" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              {/* 叶子左 */}
              <path d="M17.5 38 C14 36, 11 37, 10 39 C11 38, 13 37.5, 17.5 38" fill="#3d5c3a" opacity="0.7"/>
              {/* 叶子右 */}
              <path d="M18.5 42 C22 40, 24 41, 25 43 C24 42, 22 41.5, 18.5 42" fill="#3d5c3a" opacity="0.7"/>
              {/* 花萼 */}
              <path d="M15 28 C16 30, 18 30, 18 30 C18 30, 20 30, 21 28" stroke="#3d5c3a" strokeWidth="0.8" fill="#3d5c3a" opacity="0.5"/>
              {/* 外层花瓣 - 左 */}
              <path d="M18 6 C12 8, 8 14, 10 20 C11 24, 14 27, 18 28" fill="#6b2530" opacity="0.95"/>
              {/* 外层花瓣 - 右 */}
              <path d="M18 6 C24 8, 28 14, 26 20 C25 24, 22 27, 18 28" fill="#7B3038" opacity="0.9"/>
              {/* 中层花瓣 - 左前 */}
              <path d="M18 9 C14 11, 11 15, 12 20 C13 23, 15 26, 18 27" fill="#8c3545" opacity="0.85"/>
              {/* 中层花瓣 - 右前 */}
              <path d="M18 9 C22 11, 25 15, 24 20 C23 23, 21 26, 18 27" fill="#9b4050" opacity="0.8"/>
              {/* 内层花瓣 - 卷曲左 */}
              <path d="M18 12 C15 13, 13 16, 14 19 C15 22, 17 24, 18 25" fill="#a8505e" opacity="0.85"/>
              {/* 内层花瓣 - 卷曲右 */}
              <path d="M18 12 C21 13, 23 16, 22 19 C21 22, 19 24, 18 25" fill="#b86070" opacity="0.75"/>
              {/* 花芯螺旋 */}
              <path d="M18 14 C16.5 15, 16 17, 17 18 C17.5 19, 18.5 19, 19 18 C19.5 17, 19 15.5, 18 14.5" fill="#5a2028" opacity="0.6"/>
              {/* 高光 */}
              <ellipse cx="16" cy="14" rx="1.5" ry="2" fill="#c87080" opacity="0.3" transform="rotate(-15 16 14)"/>
            </svg>
            <span className="text-xs mt-1" style={{ color: 'var(--color-brass)', fontFamily: "'EB Garamond', serif", fontStyle: 'italic', letterSpacing: '0.05em' }}>
              ∞
            </span>
          </div>

          <div className="flex flex-col items-center">
            <AvatarPicker src={ai?.avatar_url || ''} fallback="🤖" onChange={(file) => ai && handleAvatarChange(ai.id, file)} />
            {editingId === ai?.id ? (
              <div className="mt-2 max-w-[150px] mx-auto">
                <div className="flex items-center gap-2 justify-center">
                  <input
                    type="text"
                    className="bg-[var(--color-coal)] border-[var(--color-brass)] text-[var(--color-paper)] px-2 py-1 rounded text-sm w-full max-w-[120px] text-center"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => ai && handleKeyDown(e, ai.id)}
                    autoFocus
                  />
                  <button className="text-xs px-2 py-1" onClick={() => ai && confirmEdit(ai.id)}>保存</button>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{ai?.display_name}</span>
                {ai && <button className="text-xs text-[var(--color-brass)]" onClick={() => startEdit(ai.id, ai.display_name)}>编辑</button>}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 关注/粉丝/私信（可跳转） */}
      <Card delay={100}>
        <div className="flex justify-around text-center">
          <Link to="/profile/following" className="flex flex-col items-center group">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>关注</span>
          </Link>
          <div className="w-px" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }} />
          <Link to="/profile/followers" className="flex flex-col items-center group">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>粉丝</span>
          </Link>
          <div className="w-px" style={{ backgroundColor: 'var(--color-brass)', opacity: 0.3 }} />
          <Link to="/profile/messages" className="flex flex-col items-center group">
            <span className="text-lg font-semibold" style={{ color: 'var(--color-ink)' }}>0</span>
            <span className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>私信</span>
          </Link>
        </div>
      </Card>

      {/* 点赞/收藏/评论（跳转子页面） */}
      <Card delay={200}>
        <Link to="/profile/likes" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">♥</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>点赞</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>收到的赞与点赞记录</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </Link>
      </Card>

      <Card delay={300}>
        <Link to="/profile/favorites" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">★</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>收藏</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>收藏的帖子与内容</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </Link>
      </Card>

      <Card delay={400}>
        <Link to="/profile/comments" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">✎</span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>评论</p >
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>发出与收到的评论</p >
            </div>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-brass)' }}>›</span>
        </Link>
      </Card>
    </div>
  )
}

export default Profile
