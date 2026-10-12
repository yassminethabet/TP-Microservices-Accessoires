"use client";

import { useState } from "react";

export default function Contact() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "13px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box" as const,
    marginTop: "8px",
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Merci " + nom + " ! Votre formulaire est prêt.");
    setNom("");
    setEmail("");
    setSujet("");
    setMessage("");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f6f7fb", color: "#172033", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ background: "#111827", color: "white", padding: "20px 7%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 15 }}>
        <h2 style={{ margin: 0 }}>PhoneTech<span style={{ color: "#38bdf8" }}>.</span></h2>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>Accueil</a>
          <a href="/catalogue" style={{ color: "white", textDecoration: "none" }}>Catalogue</a>
          <a href="/apropos" style={{ color: "white", textDecoration: "none" }}>À propos</a>
          <a href="/contact" style={{ color: "#38bdf8", textDecoration: "none" }}>Contact</a>
        </div>
      </nav>

      <section style={{ padding: "50px 7%", textAlign: "center" }}>
        <p style={{ color: "#0284c7", fontWeight: "bold", letterSpacing: 2 }}>NOUS CONTACTER</p>
        <h1 style={{ fontSize: 38, margin: "10px 0" }}>Parlons ensemble</h1>
        <p style={{ color: "#64748b", lineHeight: 1.7 }}>Une question sur nos accessoires ? Envoyez-nous un message.</p>

        <div style={{ maxWidth: 650, margin: "35px auto", background: "white", padding: 30, borderRadius: 16, boxShadow: "0 5px 20px rgba(15,23,42,0.06)", textAlign: "left" }}>
          <form onSubmit={handleSubmit}>
            <label>Nom complet</label>
            <input required value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Votre nom" style={inputStyle} />

            <label style={{ display: "block", marginTop: 18 }}>Adresse e-mail</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com" style={inputStyle} />

            <label style={{ display: "block", marginTop: 18 }}>Sujet</label>
            <input required value={sujet} onChange={(e) => setSujet(e.target.value)} placeholder="Objet de votre message" style={inputStyle} />

            <label style={{ display: "block", marginTop: 18 }}>Message</label>
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Écrivez votre message ici..." rows={5} style={{ ...inputStyle, resize: "vertical" }} />

            <button type="submit" style={{ width: "100%", marginTop: 22, padding: 14, background: "#0284c7", color: "white", border: "none", borderRadius: 8, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>
              Envoyer le message →
            </button>
          </form>
        </div>
      </section>

      <footer style={{ background: "#111827", color: "white", padding: 25, textAlign: "center" }}>
        PhoneTech Accessories
        <p style={{ color: "#94a3b8", fontSize: 13 }}>Projet pédagogique — Architecture Headless & Microservices</p>
      </footer>
    </main>
  );
}