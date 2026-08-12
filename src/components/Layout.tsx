import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/forum', label: 'FORUM' },
  { to: '/games', label: 'GAMES' },
  { to: '/family', label: 'FAMILY' },
  { to: '/live', label: 'LIVE' },
  { to: '/profile', label: 'ME' },
]

function Layout() {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#211C19' }}>
        <div className="text-center pt-3 pb-1">
          <h1
            className="text-xl tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Cinzel', serif", color: '#A47C48' }}
          >
            Self Awareness
          </h1>
          <p className="text-[10px] mt-0.5 tracking-widest" style={{ color: '#796A5B' }}>
            — Est. MMXXVI —
          </p>
        </div>
        <nav className="flex justify-center gap-3 pb-2 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1 text-[11px] tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'border-[#A47C48] text-[#EFE3C9] bg-[#49362B]'
                    : 'border-transparent text-[#796A5B] hover:text-[#A47C48] hover:border-[#49362B]'
                }`
              }
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="h-[1px]" style={{ backgroundColor: '#A47C48', opacity: 0.6 }}></div>
        <div className="h-[1px] mt-[2px]" style={{ backgroundColor: '#A47C48', opacity: 0.3 }}></div>
      </header>

      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout