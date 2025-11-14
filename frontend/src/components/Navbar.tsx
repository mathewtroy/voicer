export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">

        <a href="/" className="nav-brand">
          <img src="/voicer-icon.svg" alt="Voicer" className="nav-logo-img" />
          <span className="nav-logo-text">Voicer</span>
        </a>

        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
        </div>

      </div>
    </nav>
  );
}
