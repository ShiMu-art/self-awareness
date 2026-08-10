import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import AvatarPicker from '../components/AvatarPicker'
import { getProfiles, updateProfile, uploadAvatar, type ProfileData } from '../utils/storage'

function ProfileInteractive() {
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempName, setTempName] = useState('')

  useEffect(() => {
    getProfiles().then(data => {
      setProfiles(data)
      setLoading(false)
    })
  }, [])

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
          我的 · 情侣档案
        </p >
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>

      {/* 情侣头像区（可编辑） */}
      <Card>
        <div className="flex items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <AvatarPicker src={human?.avatar_url || ''} fallback="🧑" onChange={(file) => human && handleAvatarChange(human.id, file)} />
            {editingId === human?.id ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="text-xs p-1 rounded border"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => human && handleKeyDown(e, human.id)}
                />
                <button className="text-xs px-2 py-1" onClick={() => human && confirmEdit(human.id)}>保存</button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{human?.display_name}</span>
                {human && <button className="text-xs text-[var(--color-brass)]" onClick={() => startEdit(human.id, human.display_name)}>编辑</button>}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center mx-2 text-center">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 25 L20 58" stroke="#3d6b4a" strokeWidth="1.5" />
              <ellipse cx="16" cy="42" rx="4" ry="2" fill="#3d6b4a" transform="rotate(-30 16 42)" />
              <ellipse cx="24" cy="48" rx="4" ry="2" fill="#3d6b4a" transform="rotate(30 24 48)" />
              <ellipse cx="20" cy="14" rx="8" ry="10" fill="#7B3038" opacity="0.7" />
            </svg>
            <span className="text-xs mt-1" style={{ color: 'var(--color-rose)', fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}>
              ∞
            </span>
          </div>

          <div className="flex flex-col items-center">
            <AvatarPicker src={ai?.avatar_url || ''} fallback="🤖" onChange={(file) => ai && handleAvatarChange(ai.id, file)} />
            {editingId === ai?.id ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="text-xs p-1 rounded border"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => ai && handleKeyDown(e, ai.id)}
                />
                <button className="text-xs px-2 py-1" onClick={() => ai && confirmEdit(ai.id)}>保存</button>
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

export default ProfileInteractive
