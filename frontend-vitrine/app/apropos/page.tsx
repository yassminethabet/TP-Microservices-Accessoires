export default function Apropos() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6f7fb", color: "#172033", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ background: "#111827", color: "white", padding: "20px 7%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 15 }}>
        <h2 style={{ margin: 0 }}>PhoneTech<span style={{ color: "#38bdf8" }}>.</span></h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>Accueil</a>
          <a href="/catalogue" style={{ color: "white", textDecoration: "none" }}>Catalogue</a>
          <a href="/apropos" style={{ color: "#38bdf8", textDecoration: "none" }}>À propos</a>
          <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      <section style={{ padding: "70px 7%", textAlign: "center", background: "linear-gradient(120deg, #102542, #164e63)", color: "white" }}>
        <p style={{ color: "#7dd3fc", fontWeight: "bold", letterSpacing: 2 }}>QUI SOMMES-NOUS ?</p>
        <h1 style={{ fontSize: 42, margin: "15px 0" }}>À propos de PhoneTech</h1>
        <p style={{ maxWidth: 700, margin: "auto", lineHeight: 1.8, color: "#dbeafe" }}>
          Votre partenaire pour des accessoires téléphoniques pratiques, modernes et adaptés à votre quotidien.
        </p>
      </section>

      <section style={{ padding: "55px 7%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 25 }}>
        <article style={{ background: "white", padding: 28, borderRadius: 14 }}>
          <div style={{ fontSize: 38 }}>🎯</div>
          <h2>Notre mission</h2>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>
            Proposer un catalogue d'accessoires téléphoniques permettant aux visiteurs de découvrir facilement les produits disponibles.
          </p>
        </article>

        <article style={{ background: "white", padding: 28, borderRadius: 14 }}>
          <div style={{ fontSize: 38 }}>💎</div>
          <h2>Notre engagement</h2>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>
            Présenter les informations des produits de manière claire, avec leurs images, leurs catégories, leurs descriptions et leurs prix.
          </p>
        </article>

        <article style={{ background: "white", padding: 28, borderRadius: 14 }}>
          <div style={{ fontSize: 38 }}>💻</div>
          <h2>Notre technologie</h2>
          <p style={{ color: "#64748b", lineHeight: 1.8 }}>
            Le site utilise Next.js pour l'interface et Strapi comme système de gestion de contenu, dans le cadre d'une architecture Headless.
          </p>
        </article>
      </section>

      <div style={{ textAlign: "center", padding: "0 20px 55px" }}>
        <a href="/catalogue" style={{ display: "inline-block", background: "#0284c7", color: "white", padding: "14px 24px", borderRadius: 8, textDecoration: "none", fontWeight: "bold" }}>
          Découvrir nos produits →
        </a>
      </div>

      <footer style={{ background: "#111827", color: "white", padding: 25, textAlign: "center" }}>
        PhoneTech Accessories
        <p style={{ color: "#94a3b8", fontSize: 13 }}>Projet pédagogique — Architecture Headless & Microservices</p>
      </footer>
    </main>
  );
}