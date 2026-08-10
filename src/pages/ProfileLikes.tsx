import Card from '../components/Card'
import { Link } from 'react-router-dom'

function ProfileLikes() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl tracking-wider" style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-ivory)' }}>
          LIKES
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
          点赞记录
        </p >
        <hr className="divider-brass max-w-[120px] mx-auto mt-4" />
      </div>
      <Card>
        <p className="text-center text-sm" style={{ color: 'var(--color-muted)', fontFamily: "'Noto Serif SC', serif" }}>
          暂无点赞记录
        </p >
      </Card>
      <div className="text-center">
        <Link to="/profile" className="text-sm hover:underline" style={{ color: 'var(--color-brass)' }}>
          ← 返回档案
        </Link>
      </div>
    </div>
  )
}

export default ProfileLikes
