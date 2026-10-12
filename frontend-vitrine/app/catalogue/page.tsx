"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description?: { type: string; children?: { type: string; text?: string }[] }[];
  price: number;
  image?: { url: string } | null;
  category?: { name: string } | null;
};

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");

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

  const categories = [
    "Toutes",
    ...Array.from(
      new Set(products.map((p) => p.category?.name).filter(Boolean) as string[])
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      (product.category?.name ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "Toutes" || product.category?.name === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f6f7fb", color: "#172033", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ background: "#111827", color: "white", padding: "20px 7%", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 15 }}>
        <h2 style={{ margin: 0 }}>PhoneTech<span style={{ color: "#38bdf8" }}>.</span></h2>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>Accueil</a>
          <a href="/catalogue" style={{ color: "#38bdf8", textDecoration: "none" }}>Catalogue</a>
          <a href="/apropos" style={{ color: "white", textDecoration: "none" }}>À propos</a>
          <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      <section style={{ padding: "45px 7% 25px", background: "white" }}>
        <p style={{ color: "#0284c7", fontWeight: "bold", letterSpacing: 2 }}>NOTRE BOUTIQUE</p>
        <h1 style={{ fontSize: 36, margin: "10px 0" }}>Catalogue des accessoires</h1>
        <p style={{ color: "#64748b" }}>Trouvez facilement l'accessoire qu'il vous faut.</p>

        <input
          type="search"
          placeholder="🔍 Rechercher une coque, un chargeur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 600, padding: 15, border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 16, marginTop: 20, boxSizing: "border-box" }}
        />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              style={{ padding: "10px 16px", borderRadius: 22, border: "1px solid #cbd5e1", cursor: "pointer", background: category === item ? "#0284c7" : "white", color: category === item ? "white" : "#334155" }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: "30px 7% 55px" }}>
        <p style={{ color: "#64748b" }}>
          {loading ? "Chargement..." : `${filteredProducts.length} produit(s) trouvé(s)`}
        </p>

        {loading ? (
          <p>Chargement des produits...</p>
        ) : filteredProducts.length === 0 ? (
          <p style={{ background: "white", padding: 25, borderRadius: 12 }}>
            Aucun produit trouvé. Essayez un autre mot-clé.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24, marginTop: 25 }}>
            {filteredProducts.map((product) => (
              <article key={product.id} style={{ background: "white", borderRadius: 14, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 5px 18px rgba(15,23,42,0.06)" }}>
                <div style={{ background: "#f8fafc", padding: 15 }}>
                  {product.image?.url ? (
                    <img src={`http://localhost:1337${product.image.url}`} alt={product.title} style={{ width: "100%", height: 220, objectFit: "contain" }} />
                  ) : (
                    <div style={{ height: 220, display: "grid", placeItems: "center", fontSize: 65 }}>📱</div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "6px 10px", borderRadius: 20, fontSize: 12 }}>
                    {product.category?.name ?? "Accessoire"}
                  </span>
                  <h3 style={{ fontSize: 19, margin: "16px 0 8px" }}>{product.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>
                    {product.description?.map((block) => block.children?.map((child) => child.text).join("")).join(" ") ?? "Découvrez cet accessoire."}
                  </p>
                  <strong style={{ color: "#0284c7", fontSize: 21 }}>{product.price} TND</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer style={{ background: "#111827", color: "white", padding: 25, textAlign: "center" }}>
        PhoneTech Accessories — Votre smartphone, votre style.
      </footer>
    </main>
  );
}