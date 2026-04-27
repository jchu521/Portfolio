import { useState, useEffect, useRef } from 'react';

export function Typewriter({ text, delay = 0, speed = 36 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const tick = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(tick);
    }, speed);
    return () => clearInterval(tick);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span style={{
          display: 'inline-block', width: 2, height: '1em',
          background: 'var(--accent)', marginLeft: 2,
          verticalAlign: 'middle', animation: 'blink 0.8s step-end infinite',
        }} />
      )}
    </span>
  );
}

export function RichTypewriter({ segments, delay = 0, speed = 18, cursorColor = 'var(--accent)', onDone }) {
  const fullText = segments.map((s) => s.text).join('');
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const tick = setInterval(() => {
      setCount((c) => {
        if (c >= fullText.length) { clearInterval(tick); return c; }
        const next = c + 1;
        if (next >= fullText.length && !doneRef.current) {
          doneRef.current = true;
          if (onDone) setTimeout(onDone, 0);
        }
        return next;
      });
    }, speed);
    return () => clearInterval(tick);
  }, [started, fullText, speed, onDone]);

  let remaining = count;
  const parts = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (remaining <= 0) break;
    const take = Math.min(remaining, seg.text.length);
    const slice = seg.text.slice(0, take);
    if (seg.highlight) {
      parts.push(<span key={i} style={{ color: 'var(--fg)', fontWeight: 500 }}>{slice}</span>);
    } else {
      parts.push(<span key={i}>{slice}</span>);
    }
    remaining -= take;
  }

  const done = count >= fullText.length;
  return (
    <span>
      {parts}
      {!done && started && (
        <span style={{
          display: 'inline-block', width: 2, height: '1em',
          background: cursorColor, marginLeft: 2,
          verticalAlign: 'middle', animation: 'blink 0.8s step-end infinite',
        }} />
      )}
    </span>
  );
}

export function CountUp({ to, suffix = '', duration = 1200, delay = 0 }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, to, duration]);

  return <span>{val}{suffix}</span>;
}
