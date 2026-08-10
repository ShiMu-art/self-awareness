import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/forum', label: '论坛' },
  { to: '/games', label: '游戏' },
  { to: '/family', label: '养家' },
  { to: '/live', label: '直播间' },
  { to: '/music', label: '音乐' },
  { to: '/profile', label: '我的' },
]

function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-5xl mx-auto flex items-center gap-1 px-4 h-14 overflow-x-auto">
          <span className="font-bold text-lg mr-4 shrink-0">Self Awareness</span>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm shrink-0 transition ${
                  isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-gray-400 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="pt-16 px-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
