export default function StickyNav({ active }) {
  const tabs = ['journey', 'skills'];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 52;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'sticky', top: 'var(--sticky-nav-top)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 clamp(16px, 4vw, 40px)', height: 52,
      background: 'var(--nav-bg)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', gap: 4, background: 'var(--nav-pill-bg)', borderRadius: 22, padding: 4 }}>
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button key={tab} onClick={() => scrollTo(tab)} style={{
              padding: '6px 24px', borderRadius: 18,
              background: isActive ? 'var(--red)' : 'transparent',
              border: 'none',
              color: isActive ? '#fff' : 'var(--fg2)',
              fontSize: 13, fontWeight: isActive ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: "'Space Grotesk'", textTransform: 'capitalize',
            }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
