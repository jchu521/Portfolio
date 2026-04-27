import { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import useReveal from '../hooks/useReveal';
import { useColor } from '../hooks/useTheme';
import { JOURNEY } from '../data/portfolio';

const MIN_YEAR = 2011;
const MAX_YEAR = 2026.5;
const SPAN = MAX_YEAR - MIN_YEAR;
const ROW_H = 10;
const ROW_GAP = 4;

function JourneyWorkRow({ exp }) {
  const c = useColor(exp.color);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--journey-cols)', gap: 'clamp(12px, 3vw, 28px)' }}>
      <div style={{ paddingTop: 2 }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 9, color: c, marginBottom: 6, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>Work</div>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: 'var(--fg2)', marginBottom: 6, letterSpacing: '0.04em', opacity: 0.9 }}>{exp.period}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: c, flexShrink: 0, boxShadow: `0 0 6px ${c}` }} />
          <span style={{ fontSize: 12, color: c, fontWeight: 500 }}>{exp.role}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'var(--journey-tools-dir)', flexWrap: 'wrap', gap: 'var(--journey-tools-gap)' }}>
          {exp.tools.map((t) => <span key={t} style={{ fontSize: 10, color: 'var(--fg2)', fontFamily: "'DM Mono'", opacity: 0.85, padding: 'var(--journey-tools-pad)', border: 'var(--journey-tools-border)', borderRadius: 'var(--journey-tools-radius)' }}>{t}</span>)}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{exp.company}</h3>
          {exp.url && <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: `${c}cc` }}>{exp.url}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {exp.duties.map((d, j) => (
            <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: c, flexShrink: 0, fontSize: 11, paddingTop: 3 }}>—</span>
              <span style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.6, fontWeight: 400 }}>{d}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {exp.projects.map((p) => (
            <span key={p} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 12, background: `${c}0d`, border: `1px solid ${c}25`, color: c, fontFamily: "'DM Mono'" }}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function JourneyEduRow({ edu }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'var(--journey-cols)', gap: 'clamp(12px, 3vw, 28px)' }}>
      <div style={{ paddingTop: 2 }}>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 9, color: edu.color, marginBottom: 6, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>Education</div>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: 'var(--fg2)', marginBottom: 6, letterSpacing: '0.04em', opacity: 0.9 }}>{edu.period}</div>
        <div style={{ fontFamily: "'DM Mono'", fontSize: 10, color: 'var(--fg2)', marginBottom: 10, letterSpacing: '0.04em', opacity: 0.85 }}>{edu.location}</div>
        <div style={{
          width: 48, height: 48, borderRadius: 10, background: edu.logoBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk'", fontWeight: 800, fontSize: edu.short.length > 3 ? 12 : 14,
          color: edu.logoFg, letterSpacing: '-0.02em',
          boxShadow: `0 4px 18px ${edu.logoColor}40`, border: `1px solid ${edu.logoColor}80`,
        }}>{edu.short}</div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{edu.school}</h3>
        </div>
        <div style={{ fontSize: 13, color: edu.color, fontWeight: 500, marginBottom: 10 }}>{edu.degree}</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {edu.notes.map((n) => (
            <li key={n} style={{ fontSize: 13, color: 'var(--body)', lineHeight: 1.6, fontWeight: 400, display: 'flex', gap: 8 }}>
              <span style={{ color: edu.color, flexShrink: 0 }}>—</span><span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function JourneySection() {
  const [filter, setFilter] = useState('all');
  const visibleList = useMemo(
    () => filter === 'all' ? JOURNEY : JOURNEY.filter((j) => j.kind === filter),
    [filter],
  );
  const [selectedRaw, setSelected] = useState(JOURNEY[0].id);
  const [showAll, setShowAll] = useState(false);
  const [ref, vis] = useReveal(0.05);
  const rowRefs = useRef({});
  const suppressUntilRef = useRef(0);

  const selected = visibleList.find((j) => j.id === selectedRaw)
    ? selectedRaw
    : visibleList.length ? visibleList[0].id : selectedRaw;

  const sel = JOURNEY.find((j) => j.id === selected);
  const selIdx = visibleList.findIndex((j) => j.id === selected);

  const packed = useMemo(() => {
    const rows = [];
    const placement = {};
    [...visibleList].sort((a, b) => a.start - b.start).forEach((j) => {
      let r = 0;
      while (r < rows.length && rows[r].some((o) => !(j.end <= o.start || j.start >= o.end))) r++;
      if (!rows[r]) rows[r] = [];
      rows[r].push({ start: j.start, end: j.end });
      placement[j.id] = r;
    });
    return { placement, rowCount: Math.max(rows.length, 1) };
  }, [visibleList]);

  const railHeight = packed.rowCount * ROW_H + Math.max(0, packed.rowCount - 1) * ROW_GAP;

  // showAll scroll-sync
  useEffect(() => {
    if (!showAll) return;
    const ANCHOR = 240;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (performance.now() < suppressUntilRef.current) return;
        let best = null, bestDist = Infinity;
        for (const id in rowRefs.current) {
          const el = rowRefs.current[id];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= ANCHOR && rect.bottom >= ANCHOR) { best = id; break; }
          const d = Math.abs(rect.top - ANCHOR);
          if (d < bestDist) { bestDist = d; best = id; }
        }
        if (best) setSelected((prev) => (prev === best ? prev : best));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [showAll, filter]);

  return (
    <section id="journey" style={{ padding: '100px 0 60px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div ref={ref} style={{ marginBottom: 24, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg2)', marginBottom: 10 }}>02 · Journey</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em' }}>Background</h2>
            <button onClick={() => setShowAll(!showAll)} style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 18px', borderRadius: 20,
              background: showAll ? 'rgba(79,142,247,0.12)' : 'transparent',
              border: `1px solid ${showAll ? 'rgba(79,142,247,0.4)' : 'var(--border)'}`,
              color: showAll ? '#4f8ef7' : 'var(--fg2)',
              fontSize: 12, fontFamily: "'DM Mono'", cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.06em',
            }}>
              <span>{showAll ? '◈' : '◇'}</span>
              {showAll ? 'Timeline view' : 'Show all'}
            </button>
          </div>
        </div>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 18, fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {[
            { key: 'all', label: 'All', swatch: null },
            { key: 'work', label: 'Work', swatch: { radius: 5 } },
            { key: 'edu', label: 'Education', swatch: { radius: 2 } },
          ].map((opt) => {
            const isActive = filter === opt.key;
            return (
              <button key={opt.key} onClick={() => setFilter(opt.key)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 10px',
                background: isActive ? 'var(--rail-active-bg)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--rail-active-border)' : 'var(--border)'}`,
                borderRadius: 4,
                color: isActive ? 'var(--fg)' : 'var(--fg2)',
                fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {opt.swatch && <span style={{ width: 18, height: 8, background: isActive ? 'var(--fg)' : 'var(--fg2)', borderRadius: opt.swatch.radius, opacity: isActive ? 0.9 : 0.6 }} />}
                {opt.label}
                {opt.key !== 'all' && <span style={{ opacity: 0.75, fontSize: 9 }}>{JOURNEY.filter((j) => j.kind === opt.key).length}</span>}
              </button>
            );
          })}
        </div>

        {/* unified rail */}
        <div style={{
          marginBottom: 32,
          ...(showAll ? {
            position: 'sticky', top: 52, zIndex: 50,
            background: 'var(--sticky-rail-bg)', backdropFilter: 'blur(12px)',
            padding: '14px 8px 6px', margin: '0 -8px 32px', borderRadius: 6,
          } : {}),
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            {[2011, 2013, 2015, 2017, 2019, 2021, 2023, 2025].map((y) => (
              <span key={y} style={{ fontFamily: "'DM Mono'", fontSize: 9, color: 'var(--fg2)', opacity: 0.7, letterSpacing: '0.04em' }}>{y}</span>
            ))}
          </div>

          <div
            onWheel={(e) => {
              e.preventDefault();
              if (e.deltaY > 0 || e.deltaX > 0) {
                if (selIdx < visibleList.length - 1) setSelected(visibleList[selIdx + 1].id);
              } else {
                if (selIdx > 0) setSelected(visibleList[selIdx - 1].id);
              }
            }}
            title="Scroll to navigate"
            style={{ position: 'relative', height: railHeight, marginBottom: 56, cursor: 'ew-resize', overflow: 'visible' }}>
            {Array.from({ length: packed.rowCount }).map((_, r) => (
              <div key={r} style={{
                position: 'absolute', left: 0, right: 0,
                top: `${r * (ROW_H + ROW_GAP)}px`, height: `${ROW_H}px`,
                background: 'var(--rail-track)', borderRadius: ROW_H / 2,
                pointerEvents: 'none',
              }} />
            ))}
            {visibleList.map((j) => {
              const left = ((j.start - MIN_YEAR) / SPAN) * 100;
              const width = Math.max(((j.end - j.start) / SPAN) * 100, 1.5);
              const isActive = selected === j.id;
              const isOld = j.start < 2018;
              const row = packed.placement[j.id];
              const top = row * (ROW_H + ROW_GAP);
              const isWork = j.kind === 'work';
              const midLeft = left + width / 2;
              const isLastRow = row === packed.rowCount - 1;
              return (
                <Fragment key={j.id}>
                  <div
                    onClick={() => {
                      setSelected(j.id);
                      if (showAll) {
                        const el = rowRefs.current[j.id];
                        if (el) {
                          suppressUntilRef.current = performance.now() + 900;
                          const y = el.getBoundingClientRect().top + window.scrollY - 240;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }}
                    title={`${j.title} · ${j.period}`}
                    style={{
                      position: 'absolute',
                      left: `${left}%`, width: `${width}%`,
                      top: `${top}px`, height: `${ROW_H}px`,
                      borderRadius: isWork ? ROW_H / 2 : 2,
                      background: isActive ? j.color : isOld ? `${j.color}30` : `${j.color}55`,
                      cursor: 'pointer',
                      boxShadow: isActive ? `0 0 10px ${j.color}80` : 'none',
                      transition: 'all 0.25s',
                      zIndex: isActive ? 5 : 2,
                    }}
                  />
                  {isActive && isLastRow && (
                    <div style={{
                      position: 'absolute', left: `${midLeft}%`, top: railHeight,
                      transform: 'translate(-50%, 6px)', pointerEvents: 'none',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10,
                    }}>
                      <div style={{
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                        borderBottom: `8px solid ${j.color}`,
                        filter: `drop-shadow(0 0 4px ${j.color})`,
                      }} />
                      <div style={{
                        marginTop: 6, fontFamily: "'DM Mono'", fontSize: 10,
                        color: j.color, letterSpacing: '0.06em',
                        whiteSpace: 'nowrap', fontWeight: 600,
                        padding: '2px 8px', borderRadius: 4,
                        background: `${j.color}15`, border: `1px solid ${j.color}40`,
                      }}>{j.title}</div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "'DM Mono'", fontSize: 10, color: 'var(--fg2)', opacity: 0.7, letterSpacing: '0.08em' }}>
              ◂ scroll over rail to navigate · {selIdx + 1} / {visibleList.length} ▸
            </span>
          </div>
        </div>

        {/* detail rows */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(showAll ? visibleList : (sel ? [sel] : [])).map((j, i) => (
            <div key={j.id}
              ref={(el) => { rowRefs.current[j.id] = el; }}
              style={{
                padding: '20px 0',
                borderTop: i === 0 && !showAll ? 'none' : '1px solid var(--border)',
                animation: 'fadeUp 0.35s ease both',
              }}>
              {j.kind === 'work'
                ? <JourneyWorkRow exp={j.payload} />
                : <JourneyEduRow edu={j.payload} />}
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      </div>
    </section>
  );
}
