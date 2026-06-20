export default function Home() {
  return (
    <main>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 3rem", background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(20px)", borderBottom: "1px solid #eee",
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", letterSpacing: "-0.02em" }}>Orbonomy</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "#555" }}>
          <a href="#services" style={{ color: "#555", textDecoration: "none" }}>Services</a>
          <a href="#how" style={{ color: "#555", textDecoration: "none" }}>How it works</a>
          <a href="#pricing" style={{ color: "#555", textDecoration: "none" }}>Pricing</a>
        </div>
      </nav>

      {/* HERO WITH ORBIT */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        overflow: "hidden", padding: "0 3rem",
      }}>
        {/* Orbit Background */}
        <div style={{ position: "absolute", right: "-10%", top: "50%", transform: "translateY(-50%)", width: "700px", height: "700px" }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "600px", height: "600px",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "50%",
            animation: "spin 60s linear infinite",
          }}>
            {/* Orbital node 1 */}
            <div style={{
              position: "absolute", top: "0", left: "50%",
              width: "10px", height: "10px",
              background: "#111", borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }} />
            {/* Orbital node 2 */}
            <div style={{
              position: "absolute", bottom: "0", left: "50%",
              width: "6px", height: "6px",
              background: "rgba(0,0,0,0.2)", borderRadius: "50%",
              transform: "translate(-50%, 50%)",
            }} />
          </div>

          {/* Middle ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "400px", height: "400px",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(0,0,0,0.04)",
            borderRadius: "50%",
            animation: "spin 40s linear infinite reverse",
          }}>
            <div style={{
              position: "absolute", top: "50%", right: "0",
              width: "8px", height: "8px",
              background: "#111", borderRadius: "50%",
              transform: "translate(50%, -50%)",
            }} />
          </div>

          {/* Inner ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "200px", height: "200px",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(0,0,0,0.03)",
            borderRadius: "50%",
            animation: "spin 25s linear infinite",
          }} />

          {/* Center */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "14px", height: "14px",
            background: "#111", borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 30px rgba(0,0,0,0.1)",
          }} />
        </div>

        {/* Hero Content */}
        <div style={{ maxWidth: "600px", paddingTop: "6rem" }}>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#999", marginBottom: "1rem" }}>
            Unified API Platform
          </p>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "3.5rem", fontWeight: 400,
            lineHeight: 1.1, letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}>
            Everything in<br />one orbit.
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#555", marginBottom: "2.5rem", maxWidth: "480px" }}>
            50+ pay-per-call API endpoints spanning accommodation, AI inference, content generation, fact-checking, and real-time data. No subscriptions. No API keys. Just USDC on Base.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#services" style={{
              padding: "0.85rem 2rem", background: "#111", color: "#fff",
              borderRadius: "4px", fontSize: "0.85rem", textDecoration: "none",
              fontWeight: 500, letterSpacing: "0.02em",
            }}>
              Explore Services
            </a>
            <a href="/openapi.json" style={{
              padding: "0.85rem 2rem", background: "transparent", color: "#111",
              border: "1px solid #ddd", borderRadius: "4px", fontSize: "0.85rem",
              textDecoration: "none", fontWeight: 400,
            }}>
              OpenAPI Spec
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        display: "flex", justifyContent: "center", gap: "4rem",
        padding: "4rem 3rem", borderTop: "1px solid #eee", borderBottom: "1px solid #eee",
      }}>
        {[
          { value: "50+", label: "Endpoints" },
          { value: "5", label: "Services" },
          { value: "$0.01", label: "Starting Price" },
          { value: "Base", label: "Chain" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", marginBottom: "0.25rem" }}>{stat.value}</div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#999" }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "6rem 3rem" }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: "2rem",
          fontWeight: 400, marginBottom: "3rem", textAlign: "center",
        }}>
          Services
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
          {[
            { name: "Accommodation", desc: "Search, compare, and plan stays worldwide. Real-time data from major booking platforms.", endpoints: "8 endpoints", range: "$0.02 — $0.50", icon: "⌂" },
            { name: "AI Inference", desc: "Chat, reason, translate, analyze, generate. Multi-model with automatic fallback.", endpoints: "13 endpoints", range: "$0.02 — $0.15", icon: "◎" },
            { name: "Content Studio", desc: "Draft, edit, rewrite, audit. Professional content generation with tone control.", endpoints: "13 endpoints", range: "$0.03 — $0.15", icon: "¶" },
            { name: "Fact Check", desc: "Multi-source verification against Wikidata, Wikipedia, and fact-check databases.", endpoints: "4 endpoints", range: "$0.02 — $0.10", icon: "✓" },
            { name: "Data Intelligence", desc: "Geocoding, weather, finance, crypto, DNS, WHOIS, company data, and trends.", endpoints: "12 endpoints", range: "$0.02 — $0.05", icon: "◇" },
            { name: "Utility", desc: "Health checks, service discovery, pricing, and capability endpoints.", endpoints: "7 endpoints", range: "$0.01", icon: "— " },
          ].map((svc, i) => (
            <div key={i} style={{
              border: "1px solid #e8e8e8", borderRadius: "6px", padding: "2rem",
              background: "#fff", transition: "border-color 0.2s",
            }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#111" }}>{svc.icon}</div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", fontWeight: 400, marginBottom: "0.5rem" }}>{svc.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6, marginBottom: "1.25rem" }}>{svc.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#999" }}>
                <span>{svc.endpoints}</span>
                <span>{svc.range}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "6rem 3rem", background: "#fff", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: "2rem",
          fontWeight: 400, marginBottom: "3rem", textAlign: "center",
        }}>
          How it works
        </h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "4rem", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { num: "01", title: "Request", desc: "POST to any endpoint with your data" },
            { num: "02", title: "402", desc: "Server returns payment-required response" },
            { num: "03", title: "Pay", desc: "Sign USDC payment with your wallet" },
            { num: "04", title: "Response", desc: "Receive your data, instantly" },
          ].map((step, i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <div style={{
                fontFamily: "'DM Serif Display', serif", fontSize: "2rem",
                color: "#111", marginBottom: "0.75rem",
              }}>{step.num}</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 500, marginBottom: "0.5rem" }}>{step.title}</div>
              <div style={{ fontSize: "0.8rem", color: "#777", lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CODE EXAMPLE */}
      <section style={{ padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem",
            fontWeight: 400, marginBottom: "1.5rem", textAlign: "center",
          }}>
            Quick start
          </h2>
          <pre style={{
            background: "#111", color: "#ccc", padding: "2rem",
            borderRadius: "6px", fontSize: "0.8rem", lineHeight: 1.8,
            overflow: "auto",
          }}>
{`$ curl -X POST https://orbonomy.vercel.app/api/llm/chat \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"Hello"}]}'

→ 402 Payment Required

$ # Pay with x402 wallet (USDC on Base)
$ # Retry with payment signature

→ 200 OK
  {"success":true,"content":"Hello! How can I help?"}`}
          </pre>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section id="pricing" style={{ padding: "6rem 3rem", background: "#fff", borderTop: "1px solid #eee" }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: "2rem",
          fontWeight: 400, marginBottom: "3rem", textAlign: "center",
        }}>
          Pricing
        </h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
          {[
            { tier: "Utility", price: "$0.01", desc: "Health, status, and discovery endpoints" },
            { tier: "Standard", price: "$0.02 — $0.08", desc: "Data lookups, translation, classification" },
            { tier: "Premium", price: "$0.10 — $0.15", desc: "AI inference, content generation, pipelines" },
            { tier: "Enterprise", price: "$0.25 — $0.50", desc: "Full itineraries, all-in-one bundles" },
          ].map((t, i) => (
            <div key={i} style={{
              flex: 1, border: "1px solid #e8e8e8", borderRadius: "6px",
              padding: "1.75rem", background: "#fafafa", textAlign: "center",
            }}>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", marginBottom: "0.75rem" }}>{t.tier}</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{t.price}</div>
              <div style={{ fontSize: "0.8rem", color: "#777" }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "3rem", borderTop: "1px solid #eee",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1rem" }}>Orbonomy</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: "0.8rem", color: "#999" }}>
          <a href="/openapi.json" style={{ color: "#999", textDecoration: "none" }}>OpenAPI</a>
          <span>Base Mainnet</span>
          <span>USDC</span>
        </div>
      </footer>

      {/* CSS Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      ` }} />
    </main>
  );
}
