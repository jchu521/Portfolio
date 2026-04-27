import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import useReveal from '../hooks/useReveal';
import { SKILLS_DATA } from '../data/portfolio';

const R = 280, CX = 480, CY = 270;

function buildSphereNodes() {
  const GA = Math.PI * (3 - Math.sqrt(5));
  const N = SKILLS_DATA.length;
  const hubs = SKILLS_DATA.map((g, gi) => {
    const y = 1 - (gi / (N - 1)) * 2;
    const phi = Math.acos(y);
    const theta = GA * gi;
    return { id: `hub-${gi}`, label: g.category, color: g.color, category: g.category, isHub: true, phi, theta, r: R * 0.78 };
  });
  const leaves = [];
  SKILLS_DATA.forEach((g, gi) => {
    const hub = hubs[gi];
    g.items.forEach((item, ii) => {
      const phi = Math.max(0.1, Math.min(Math.PI - 0.1, hub.phi + (ii % 3 - 1) * 0.28 + Math.floor(ii / 3) * 0.22));
      const theta = hub.theta + (ii - (g.items.length - 1) / 2) * 0.22;
      leaves.push({ id: `${gi}-${ii}`, label: item, color: g.color, category: g.category, isHub: false, phi, theta, r: R, hubId: `hub-${gi}` });
    });
  });
  return { hubs, leaves };
}

function project3D(phi, theta, r, rotX, rotY) {
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  const x2 = x * cosY + z * sinY, z2 = -x * sinY + z * cosY;
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y3 = y * cosX - z2 * sinX, z3 = y * sinX + z2 * cosX;
  const scale = 900 / (900 + z3);
  return { sx: CX + x2 * scale, sy: CY + y3 * scale, sz: z3, depth: (z3 + R * 1.5) / (R * 3) };
}

export default function SkillsSection() {
  const [revealRef, vis] = useReveal(0.05);
  const containerRef = useRef(null);
  const posRef = useRef({ x: 0.3, y: 0 });
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const hubElsRef = useRef({});
  const lineElsRef = useRef({});
  const expandedCatRef = useRef(null);

  const [expandedCat, setExpandedCat] = useState(null);
  const [hovNode, setHovNode] = useState(null);
  const [showAll, setShowAll] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 600
  );

  const sphereNodes = useMemo(() => buildSphereNodes(), []);

  // Keep ref in sync with state for the animation loop
  useEffect(() => { expandedCatRef.current = expandedCat; }, [expandedCat]);

  // Animation loop — direct DOM updates, no React re-renders
  useEffect(() => {
    const loop = () => {
      if (!pausedRef.current && !expandedCatRef.current) {
        posRef.current.y += 0.003;
        posRef.current.x += 0.0005;
      }

      const { x: rotX, y: rotY } = posRef.current;
      const expCat = expandedCatRef.current;

      sphereNodes.hubs.forEach((hub) => {
        const el = hubElsRef.current[hub.id];
        const lineEl = lineElsRef.current[hub.id];
        if (!el) return;

        let sx, sy, depth;
        if (hub.category === expCat) {
          sx = CX; sy = CY; depth = 1;
        } else {
          const proj = project3D(hub.phi, hub.theta, hub.r, rotX, rotY);
          sx = proj.sx; sy = proj.sy; depth = proj.depth;
        }

        const depthScale = hub.category === expCat ? 0.6 : Math.max(0.55, depth * 0.85);
        el.style.left = `${sx}px`;
        el.style.top = `${sy}px`;
        el.style.transform = `translate(-50%,-50%) scale(${depthScale})`;
        el.style.opacity = (expCat && hub.category !== expCat) ? '0.18' : `${Math.max(0.6, depth)}`;

        if (lineEl) {
          lineEl.setAttribute('x1', sx);
          lineEl.setAttribute('y1', sy);
          lineEl.setAttribute('stroke-opacity',
            (expCat && hub.category !== expCat) ? '0.04' : `${Math.max(0.04, depth * 0.25)}`
          );
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sphereNodes]);

  const onMouseEnter = useCallback(() => { pausedRef.current = true; }, []);
  const onMouseLeave = useCallback(() => { pausedRef.current = false; }, []);

  // Expanded leaves — only computed when expandedCat changes (not every frame)
  const expLeaves = useMemo(() => {
    if (!expandedCat) return [];
    const leaves = sphereNodes.leaves.filter((n) => n.category === expandedCat);
    return leaves.map((n, i) => {
      const angle = (i / leaves.length) * Math.PI * 2 - Math.PI / 2;
      const ringR = 180;
      return { ...n, sx: CX + Math.cos(angle) * ringR, sy: CY + Math.sin(angle) * ringR, sz: R, depth: 1 };
    });
  }, [expandedCat, sphereNodes.leaves]);

  // Initial hub positions for SVG lines (static reference)
  const initialHubPositions = useMemo(() => {
    return sphereNodes.hubs.map((hub) => {
      const proj = project3D(hub.phi, hub.theta, hub.r, 0.3, 0);
      return { ...hub, ...proj };
    });
  }, [sphereNodes.hubs]);

  return (
    <section id="skills" style={{ padding: '100px 0 120px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div ref={revealRef} style={{ marginBottom: 32, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg2)', marginBottom: 10 }}>04 · Stack</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em' }}>Skills</h2>
              <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: 'var(--fg2)' }}>
                {showAll ? `${SKILLS_DATA.reduce((a, g) => a + g.items.length, 0)} skills · ${SKILLS_DATA.length} categories` : expandedCat ? `${expandedCat} — click again to collapse` : "Auto-rotates · hover to pause · click a category"}
              </span>
            </div>
            <span onClick={() => { setShowAll((s) => !s); setExpandedCat(null); }}
              style={{
                display: 'var(--skills-toggle-display)',
                cursor: 'pointer', fontFamily: "'DM Mono'", fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '7px 18px', borderRadius: 20,
                border: `1px solid ${showAll ? 'rgba(79,142,247,0.4)' : 'var(--border)'}`,
                background: showAll ? 'rgba(79,142,247,0.12)' : 'transparent',
                color: showAll ? '#4f8ef7' : 'var(--fg2)',
                transition: 'all 0.2s',
              }}>
              {showAll ? 'Show sphere' : 'Show all'}
            </span>
          </div>
        </div>

        {/* Expanded category chip */}
        {!showAll && expandedCat && (() => {
          const cat = SKILLS_DATA.find((c) => c.category === expandedCat);
          if (!cat) return null;
          return (
            <div style={{ marginBottom: 16, animation: 'fadeUp 0.3s ease both' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '8px 20px', borderRadius: 24,
                background: `${cat.color}18`, border: `1.5px solid ${cat.color}60`,
                boxShadow: `0 0 20px ${cat.color}30`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{cat.category}</span>
                <span style={{ fontSize: 12, color: cat.color, fontFamily: "'DM Mono'" }}>{cat.items.length} skills</span>
                <span onClick={() => setExpandedCat(null)} style={{ marginLeft: 6, padding: '0 6px', fontFamily: "'DM Mono'", fontSize: 13, color: 'var(--fg2)', opacity: 0.6, cursor: 'pointer' }}>✕</span>
              </div>
            </div>
          );
        })()}

        {/* Sphere */}
        <div ref={containerRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
          onClick={(e) => { if (e.target === e.currentTarget) setExpandedCat(null); }}
          style={{ width: '100%', height: 'clamp(400px, 60vw, 740px)', position: 'relative', cursor: 'default', userSelect: 'none', overflow: 'hidden', display: showAll ? 'none' : 'block' }}>

          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }} viewBox="0 0 960 540">
            <defs>
              <radialGradient id="sg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.07" /><stop offset="100%" stopColor="transparent" stopOpacity="0" /></radialGradient>
              <filter id="sf"><feGaussianBlur stdDeviation="22" /></filter>
            </defs>
            <ellipse cx={CX} cy={CY} rx={R * 0.9} ry={R * 0.9} fill="url(#sg)" filter="url(#sf)" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--sphere-stroke)" strokeWidth="1" />
            {initialHubPositions.map((hub) => (
              <line key={`hc-${hub.id}`}
                ref={(el) => { lineElsRef.current[hub.id] = el; }}
                x1={hub.sx} y1={hub.sy} x2={CX} y2={CY}
                stroke={hub.color} strokeOpacity={0.12}
                strokeWidth="1" strokeDasharray="3 5" />
            ))}
            {expandedCat && expLeaves.map((leaf) => (
              <line key={`ll-${leaf.id}`} x1={leaf.sx} y1={leaf.sy} x2={CX} y2={CY}
                stroke={leaf.color} strokeOpacity={Math.max(0.06, leaf.depth * 0.4)} strokeWidth="0.8" />
            ))}
            <circle cx={CX} cy={CY} r={13} fill="rgba(79,142,247,0.1)" stroke="rgba(79,142,247,0.4)" strokeWidth="1.5" />
            <circle cx={CX - 4} cy={CY - 4} r={5} fill="#4f8ef7" />
          </svg>

          {/* Leaf nodes */}
          {expLeaves.map((n, i) => {
            const isHov = hovNode === n.id;
            return (
              <div key={n.id} onMouseEnter={() => setHovNode(n.id)} onMouseLeave={() => setHovNode(null)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute', left: n.sx, top: n.sy,
                  transform: 'translate(-50%,-50%)', zIndex: 4000 + i,
                  padding: '5px 13px', borderRadius: 16,
                  background: isHov ? n.color : 'var(--leaf-bg)',
                  border: `1px solid ${n.color}${isHov ? 'ff' : '66'}`,
                  color: isHov ? '#fff' : n.color,
                  fontSize: 13, fontWeight: 500, fontFamily: "'DM Mono'", whiteSpace: 'nowrap',
                  opacity: 1, boxShadow: isHov ? `0 0 12px ${n.color}70` : '0 2px 8px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(5px)',
                  transition: 'background 0.15s, color 0.15s, box-shadow 0.2s',
                  animation: `leafFanIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 30}ms both`,
                }}>{n.label}</div>
            );
          })}

          {/* Hub nodes */}
          {sphereNodes.hubs.map((hub) => {
            const isHov = hovNode === hub.id;
            const isExp = hub.category === expandedCat;
            const dim = expandedCat && !isExp;
            return (
              <div key={hub.id}
                ref={(el) => { hubElsRef.current[hub.id] = el; }}
                onMouseEnter={() => setHovNode(hub.id)} onMouseLeave={() => setHovNode(null)}
                onClick={(e) => { e.stopPropagation(); setExpandedCat(isExp ? null : hub.category); }}
                style={{
                  position: 'absolute', left: CX, top: CY,
                  transform: 'translate(-50%,-50%) scale(0.6)',
                  zIndex: isExp ? 5000 : 2200,
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '10px 22px', borderRadius: 24,
                  background: isExp ? hub.color : isHov ? `${hub.color}22` : 'var(--hub-bg)',
                  border: `1.5px solid ${hub.color}${isExp ? 'ff' : isHov ? 'cc' : '99'}`,
                  color: isExp ? '#fff' : hub.color,
                  fontSize: 24,
                  fontWeight: 600, fontFamily: "'DM Mono'", whiteSpace: 'nowrap', cursor: 'pointer',
                  opacity: dim ? 0.18 : 0.8,
                  letterSpacing: '0.04em',
                  boxShadow: isExp ? `0 0 32px ${hub.color}, 0 0 12px ${hub.color}80` : isHov ? `0 0 14px ${hub.color}60` : '0 3px 10px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  willChange: 'left, top, transform, opacity',
                  transition: 'left 0.08s linear, top 0.08s linear, transform 0.08s linear, opacity 0.25s, background 0.3s, color 0.3s, box-shadow 0.3s',
                }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: isExp ? '#fff' : hub.color, flexShrink: 0, boxShadow: `0 0 10px ${hub.color}` }} />
                {hub.label}
                <span style={{ fontSize: 12, opacity: 0.6, marginLeft: 2 }}>{isExp ? '✕' : '▾'}</span>
              </div>
            );
          })}
        </div>

        {/* Category legend */}
        {!showAll && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 8 }}>
            {SKILLS_DATA.map((g) => (
              <div key={g.category} onClick={() => setExpandedCat(expandedCat === g.category ? null : g.category)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', opacity: !expandedCat || expandedCat === g.category ? 1 : 0.3, transition: 'opacity 0.2s' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
                <span style={{ fontSize: 11, color: 'var(--fg2)', fontFamily: "'DM Mono'", letterSpacing: '0.06em' }}>{g.category}</span>
              </div>
            ))}
          </div>
        )}

        {/* Show all grid */}
        {showAll && (
          <div style={{ animation: 'fadeUp 0.4s ease both', marginTop: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`, gap: 22 }}>
              {SKILLS_DATA.map((g) => (
                <div key={g.category} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ paddingBottom: 10, borderBottom: `2px solid ${g.color}` }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{g.category}</div>
                  </div>
                  {g.items.map((item) => (
                    <div key={item} style={{ fontSize: 12, color: 'var(--fg)', opacity: 0.78, fontFamily: "'DM Mono'", letterSpacing: '0.01em', lineHeight: 1.5 }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
