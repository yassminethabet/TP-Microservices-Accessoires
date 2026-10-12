"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description?: {
    type: string;
    children?: { type: string; text?: string }[];
  }[];
  price: number;
  image?: { url: string } | null;
  category?: { name: string } | null;
};

const categories = [
  { name: "Coques", subtitle: "Style et protection", icon: "📱" },
  { name: "Chargeurs", subtitle: "Rapidité et sécurité", icon: "🔌" },
  { name: "Écouteurs", subtitle: "Son de qualité", icon: "🎧" },
  { name: "Power banks", subtitle: "Toujours chargé", icon: "🔋" },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => setProducts(data.data ?? []))
      .catch((err) => console.error("Erreur :", err))
      .finally(() => setLoading(false));
  }, []);

  const imageFor = (product: Product) =>
    product.image?.url
      ? `http://localhost:1337${product.image.url}`
      : "";

  const descriptionFor = (product: Product) =>
    product.description
      ?.map((block) =>
        block.children?.map((child) => child.text ?? "").join("")
      )
      .join(" ") || "Découvrez notre accessoire et profitez d'un style moderne au quotidien.";

  return (
    <main style={{ background: "#f7f9fc", color: "#102542", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ background: "#101e33", color: "white", padding: "18px 6%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <a href="/" style={{ color: "white", textDecoration: "none", fontSize: 27, fontWeight: 800 }}>
          PhoneTech<span style={{ color: "#16a5ff" }}>.</span>
        </a>
        <div style={{ display: "flex", gap: 25, flexWrap: "wrap", alignItems: "center" }}>
          <a href="/" style={{ color: "#16a5ff", textDecoration: "none", fontWeight: "bold" }}>Accueil</a>
          <a href="/catalogue" style={{ color: "white", textDecoration: "none" }}>Catalogue</a>
          <a href="/apropos" style={{ color: "white", textDecoration: "none" }}>À propos</a>
          <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
          <a href="/catalogue" aria-label="Rechercher" style={{ color: "white", textDecoration: "none", fontSize: 23 }}>⌕</a>
        </div>
      </nav>

      <section id="accueil" style={{ background: "linear-gradient(110deg, #ffffff 35%, #eaf5ff)", padding: "55px 7%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 350px", maxWidth: 590 }}>
          <p style={{ color: "#078ce0", fontWeight: 800, letterSpacing: 2, fontSize: 13 }}>ACCESSOIRES • STYLE • TECHNOLOGIE</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1.12, margin: "18px 0", letterSpacing: -1.5 }}>
            Tout ce qu'il faut pour votre smartphone.
          </h1>
          <p style={{ color: "#526781", fontSize: 17, lineHeight: 1.8 }}>
            Découvrez notre sélection de coques, chargeurs, écouteurs et power banks pour accompagner votre quotidien.
          </p>
          <a href="/catalogue" style={{ display: "inline-block", background: "#0799f5", color: "white", padding: "15px 25px", borderRadius: 30, textDecoration: "none", fontWeight: "bold", marginTop: 15 }}>
            Découvrir le catalogue →
          </a>
        </div>

        <div style={{ flex: "1 1 320px", textAlign: "center", fontSize: 105, padding: 20 }}>
          <div style={{ background: "white", borderRadius: 30, padding: 25, boxShadow: "0 15px 45px rgba(15,50,90,0.10)" }}>
            📱 🎧
            <div style={{ fontSize: 54 }}>🔌 🔋</div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 0 }}>Les essentiels de votre smartphone</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "30px 6%", background: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 20 }}>
          {categories.map((cat) => (
            <a key={cat.name} href={`/catalogue?category=${encodeURIComponent(cat.name)}`} style={{ display: "block", textAlign: "center", padding: "20px 12px", textDecoration: "none", color: "#102542", borderRight: "1px solid #e5edf5" }}>
              <div style={{ background: "#eaf5ff", width: 58, height: 58, borderRadius: "50%", margin: "0 auto 12px", display: "grid", placeItems: "center", fontSize: 27 }}>{cat.icon}</div>
              <strong>{cat.name}</strong>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 0 }}>{cat.subtitle}</p>
            </a>
          ))}
        </div>
      </section>

      <section style={{ padding: "15px 6% 40px", background: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
          {categories.map((cat) => {
            const product = products.find((p) =>
              (p.category?.name ?? "").toLowerCase().includes(cat.name.toLowerCase().replace("power banks", "power"))
            );
            return (
              <a key={cat.name} href={`/catalogue?category=${encodeURIComponent(cat.name)}`} style={{ minHeight: 165, padding: 22, borderRadius: 14, background: "linear-gradient(135deg, #edf5ff, #dceafa)", textDecoration: "none", color: "#102542", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: 40 }}>{cat.icon}</span>
                  <h3 style={{ margin: "12px 0 5px" }}>{cat.name}</h3>
                  <p style={{ margin: 0, color: "#526781", fontSize: 13 }}>{product ? product.title : cat.subtitle}</p>
                </div>
                <strong style={{ color: "#078ce0", fontSize: 13, marginTop: 16 }}>Voir la collection →</strong>
              </a>
            );
          })}
        </div>
      </section>

      <section id="produits" style={{ padding: "45px 6% 55px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#078ce0", fontWeight: "bold", letterSpacing: 1.5, fontSize: 13 }}>NOTRE SÉLECTION</p>
            <h2 style={{ fontSize: 34, margin: "8px 0 20px" }}>Nos produits phares</h2>
          </div>
          <a href="/catalogue" style={{ color: "#078ce0", border: "1px solid #078ce0", borderRadius: 25, padding: "11px 18px", textDecoration: "none", fontWeight: "bold", fontSize: 13 }}>Voir tout le catalogue →</a>
        </div>

        {loading ? (
          <p>Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p>Aucun produit disponible pour le moment.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {products.slice(0, 4).map((product) => (
              <article key={product.id} style={{ background: "white", border: "1px solid #e6edf5", borderRadius: 13, overflow: "hidden", boxShadow: "0 5px 18px rgba(15,35,65,0.05)" }}>
                <div style={{ height: 210, background: "#eef4fb", display: "grid", placeItems: "center", padding: 15 }}>
                  {imageFor(product) ? (
                    <img src={imageFor(product)} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: 70 }}>📱</span>
                  )}
                </div>
                <div style={{ padding: 18 }}>
                  <span style={{ display: "inline-block", background: "#e0f2fe", color: "#0369a1", padding: "5px 10px", borderRadius: 20, fontSize: 12 }}>
                    {product.category?.name ?? "Accessoire"}
                  </span>
                  <h3 style={{ fontSize: 16, margin: "13px 0 8px" }}>{product.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, minHeight: 40 }}>{descriptionFor(product).slice(0, 85)}...</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <strong style={{ color: "#078ce0", fontSize: 19 }}>{product.price} TND</strong>
                    <span style={{ color: "#07985b", fontSize: 12 }}>● Disponible</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="apropos" style={{ background: "white", padding: "35px 7%", textAlign: "center" }}>
        <h2>PhoneTech, votre style au quotidien</h2>
        <p style={{ maxWidth: 700, margin: "12px auto", color: "#64748b", lineHeight: 1.8 }}>
          Une vitrine moderne dédiée aux accessoires téléphoniques. Les produits sont gérés avec Strapi et affichés grâce à Next.js.
        </p>
        <a href="/apropos" style={{ color: "#078ce0", textDecoration: "none", fontWeight: "bold" }}>En savoir plus sur nous →</a>
      </section>

      <footer id="contact" style={{ background: "#101e33", color: "white", padding: "30px 6%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 25, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0 }}>PhoneTech<span style={{ color: "#16a5ff" }}>.</span></h2>
            <p style={{ color: "#cbd5e1", fontSize: 14 }}>Votre smartphone, vos accessoires, votre style.</p>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <a href="/" style={{ color: "white", textDecoration: "none" }}>Accueil</a>
            <a href="/catalogue" style={{ color: "white", textDecoration: "none" }}>Catalogue</a>
            <a href="/apropos" style={{ color: "white", textDecoration: "none" }}>À propos</a>
            <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 12, marginTop: 25 }}>© 2026 PhoneTech Accessories — Projet pédagogique Headless & Microservices.</p>
      </footer>
    </main>
  );
}