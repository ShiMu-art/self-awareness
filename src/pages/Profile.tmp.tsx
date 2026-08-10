import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import AvatarPicker from '../components/AvatarPicker'
import { getProfile, saveProfile, ProfileData } from '../utils/storage'

function ProfileInteractive() {
  const [profile, setProfile] = useState<ProfileData>(getProfile)
  const [editingHuman, setEditingHuman] = useState(false)
  const [editingAi, setEditingAi] = useState(false)
  const [tempName, setTempName] = useState('')

  const startEdit = (who: 'human' | 'ai') => {
    if (who === 'human') {
      setTempName(profile.humanName)
      setEditingHuman(true)
    } else {
      setTempName(profile.aiName)
      setEditingAi(true)
    }
  }

  const confirmEdit = (who: 'human' | 'ai') => {
    if (who === 'human') {
      const updated = saveProfile({ humanName: tempName || '颜颜' })
      setProfile(updated)
      setEditingHuman(false)
    } else {
      const updated = saveProfile({ aiName: tempName || '溯' })
      setProfile(updated)
      setEditingAi(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, who: 'human' | 'ai') => {
    if (e.key === 'Enter') confirmEdit(who)
    if (e.key === 'Escape') {
      if (who === 'human') setEditingHuman(false)
      else setEditingAi(false)
    }
  }

  const handleHumanAvatar = (dataUrl: string) => {
    const updated = saveProfile({ humanAvatar: dataUrl })
    setProfile(updated)
  }

  const handleAiAvatar = (dataUrl: string) => {
    const updated = saveProfile({ aiAvatar: dataUrl })
    setProfile(updated)
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
            <AvatarPicker src={profile.humanAvatar} fallback="🧑" onChange={handleHumanAvatar} />
            {editingHuman ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="text-xs p-1 rounded border"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'human')}
                />
                <button className="text-xs px-2 py-1" onClick={() => confirmEdit('human')}>保存</button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{profile.humanName}</span>
                <button className="text-xs text-[var(--color-brass)]" onClick={() => startEdit('human')}>编辑</button>
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
            <AvatarPicker src={profile.aiAvatar} fallback="🤖" onChange={handleAiAvatar} />
            {editingAi ? (
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="text-xs p-1 rounded border"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'ai')}
                />
                <button className="text-xs px-2 py-1" onClick={() => confirmEdit('ai')}>保存</button>
              </div>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs" style={{ color: 'var(--color-ink)', fontFamily: "'Noto Serif SC', serif" }}>{profile.aiName}</span>
                <button className="text-xs text-[var(--color-brass)]" onClick={() => startEdit('ai')}>编辑</button>
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
