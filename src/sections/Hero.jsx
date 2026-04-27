import { useState, useEffect, forwardRef } from "react";
import { Typewriter, RichTypewriter, CountUp } from "../components/Typewriter";
import { STACK_PALETTE } from "../data/portfolio";
import heroImg from "../assets/Jonathan_Chueh.jpg";
import cartoonImg from "../assets/jonathan_chueh_carton.png";

const TRAITS = [
  { icon: "📍", text: "Rhodes, NSW" },
  { icon: "☁️", text: "Cloud & DevOps" },
  { icon: "🏛", text: "Microservices & DDD" },
  { icon: "⚡", text: "Agile Delivery" },
];

const TAGS = [
  { label: "React", cat: "frontend" },
  { label: "TypeScript", cat: "frontend" },
  { label: "Node.js", cat: "backend" },
  { label: "Kotlin", cat: "backend" },
  { label: "PostgreSQL", cat: "data" },
  { label: "Kafka", cat: "backend" },
  { label: "AWS", cat: "cloud" },
  { label: "Docker", cat: "cloud" },
  { label: "React Native", cat: "frontend" },
];

const Hero = forwardRef(function Hero({ onExplore }, ref) {
  const [bioDone, setBioDone] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [hasAutoFlipped, setHasAutoFlipped] = useState(false);

  // Auto-flip once after 2s to tease the cartoon version
  useEffect(() => {
    if (hasAutoFlipped) return;
    const timer = setTimeout(() => {
      setAvatarHover(true);
      setHasAutoFlipped(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasAutoFlipped]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "calc(var(--nav-h) + 16px) 20px 48px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Avatar */}
      <div
        onMouseEnter={() => setAvatarHover(true)}
        onMouseLeave={() => setAvatarHover(false)}
        onClick={() => setAvatarHover((h) => !h)}
        style={{
          width: "clamp(96px, 20vw, 140px)",
          height: "clamp(96px, 20vw, 140px)",
          borderRadius: "50%",
          flexShrink: 0,
          border: "2.5px solid var(--avatar-border)",
          boxShadow:
            "0 0 0 6px var(--avatar-glow), 0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
          marginBottom: 24,
          animation: "scaleIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          transform: avatarHover ? "scale(1.05)" : "scale(1)",
        }}
      >
        <img
          src={avatarHover ? cartoonImg : heroImg}
          alt="Jonathan Chueh"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: "clamp(36px,5vw,62px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 8,
          animation: "slideInL 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }}
      >
        Jonathan Chueh
      </h1>

      {/* Typewriter */}
      <div
        style={{
          fontFamily: "'DM Mono'",
          fontSize: 13,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          marginBottom: 28,
          animation: "fadeIn 0.5s ease 0.5s both",
          minHeight: 22,
          textAlign: "center",
        }}
      >
        <Typewriter
          text="Software Engineer · Full-Stack · Cloud"
          delay={700}
        />
      </div>

      {/* Bio */}
      <p
        style={{
          maxWidth: 540,
          textAlign: "center",
          fontSize: "clamp(13.5px, 2.5vw, 15.5px)",
          lineHeight: 1.8,
          color: "var(--bio-fg)",
          fontWeight: 300,
          marginBottom: 16,
          animation: "fadeIn 0.4s ease 1.0s both",
          minHeight: "auto",
        }}
      >
        <RichTypewriter
          delay={3500}
          speed={18}
          onDone={() => setBioDone(true)}
          segments={[
            {
              text: "Software engineer with experience building web applications and distributed systems across ",
            },
            { text: "frontend and backend technologies", highlight: true },
            {
              text: ". Experienced in leading projects, Agile delivery, and collaborating across teams to solve complex challenges.",
            },
          ]}
        />
      </p>

      {/* Traits */}
      {bioDone && (
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          {TRAITS.map(({ icon, text }, i) => (
            <span
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 12px",
                borderRadius: 20,
                background: "var(--chip-bg)",
                border: "1px solid var(--chip-border)",
                fontSize: "clamp(11px, 2vw, 13px)",
                color: "var(--chip-fg)",
                fontWeight: 400,
                animation: `popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.18}s both`,
              }}
            >
              <span style={{ fontSize: 14 }}>{icon}</span>
              {text}
            </span>
          ))}
        </div>
      )}

      {/* Stack */}
      {bioDone && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
            maxWidth: 620,
            marginBottom: 40,
            padding: "0 8px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono'",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--fg2)",
              paddingRight: 10,
              borderRight: "1px solid var(--border)",
              animation: "fadeIn 0.9s ease 0.6s both",
            }}
          >
            Stack
          </span>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {TAGS.map((t, i) => {
              const c = STACK_PALETTE[t.cat];
              return (
                <span
                  key={t.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'DM Mono'",
                    fontSize: 11.5,
                    letterSpacing: "0.02em",
                    padding: "5px 11px 5px 9px",
                    borderRadius: 4,
                    border: `1px solid ${c}33`,
                    background: `linear-gradient(180deg, ${c}10, ${c}06)`,
                    color: "var(--fg)",
                    animation: `popIn 1s cubic-bezier(0.34,1.56,0.64,1) ${0.7 + i * 0.05}s both`,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: c,
                      boxShadow: `0 0 6px ${c}99`,
                    }}
                  />
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats */}
      {bioDone && (
        <div
          style={{
            display: "flex",
            gap: "clamp(20px, 5vw, 48px)",
            marginBottom: 52,
            padding: "20px clamp(20px, 4vw, 44px)",
            background: "var(--stats-bg)",
          }}
        >
          {[
            { value: 7, suffix: "+", label: "YEARS EXP" },
            { value: 5, suffix: "", label: "COMPANIES" },
            { value: 10, suffix: "+", label: "PROJECTS" },
          ].map((s, i) => (
            <div key={s.label} style={{ display: "contents" }}>
              {i > 0 && (
                <div style={{ width: 1, background: "var(--border)" }} />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  alignItems: "center",
                  animation: `popIn 1s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.5}s both`,
                }}
              >
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    background:
                      "linear-gradient(135deg,var(--stat-grad-1) 30%,var(--stat-grad-2))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    duration={1500}
                    delay={250 + i * 250 + 100}
                  />
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--fg2)",
                    fontFamily: "'DM Mono'",
                    letterSpacing: "0.08em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scroll cue */}
      {bioDone && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            if (onExplore) onExplore();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          style={{
            animation: "fadeIn 0.7s ease 1.5s both",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 8,
            transition: "transform 0.2s ease, opacity 0.2s ease",
            userSelect: "none",
            outline: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "var(--fg2)",
              fontFamily: "'DM Mono'",
              letterSpacing: "0.1em",
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ animation: "fadeUp 1.2s ease-in-out infinite alternate" }}
          >
            <path
              d="M8 0v20M1 13l7 7 7-7"
              stroke="var(--fg2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </section>
  );
});

export default Hero;
