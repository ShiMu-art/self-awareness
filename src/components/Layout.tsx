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
    <div className="min-h-screen text-gray-700">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="text-center py-3">
          <h1 className="text-xl font-bold text-sky-700 tracking-wide">Self Awareness</h1>
        </div>
        <nav className="flex justify-center gap-1 pb-2 px-4 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm transition ${
                  isActive
                    ? 'bg-sky-100 text-sky-700 font-medium'
                    : 'text-sky-500 hover:text-sky-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="pt-28 px-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
