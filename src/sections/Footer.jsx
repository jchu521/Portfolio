export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{ fontFamily: "'DM Mono'", fontSize: 11, color: "var(--fg2)" }}
      >
        © {new Date().getFullYear()} Jonathan Chueh
      </span>
    </footer>
  );
}
