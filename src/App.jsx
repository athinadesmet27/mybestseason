import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zmtkbjidhndumwfcumww.supabase.co",
  "sb_publishable_XsNsRLQhLcdvqQLN7HZ5jQ_MtW1YtY7"
);

const SEASONS = {
  "Soft Autumn": {
    tagline: "Muted, warm & earthy",
    description: "Your palette is nature at its most poetic — dried botanicals, morning fog, the warmth of terracotta in soft light. You glow in colors that are hushed, golden and deeply grounded.",
    palette: [
      { name: "Terracotta", hex: "#C4856A" },
      { name: "Warm Taupe", hex: "#9E8572" },
      { name: "Dusty Olive", hex: "#8A8C5A" },
      { name: "Camel", hex: "#C49A6C" },
      { name: "Rust", hex: "#A85C3A" },
      { name: "Sage Smoke", hex: "#8C9E85" },
      { name: "Warm Cream", hex: "#E8D8C0" },
      { name: "Chocolate", hex: "#6B4C3B" },
      { name: "Moss", hex: "#6B7A45" },
      { name: "Dusty Peach", hex: "#D4A088" },
      { name: "Mushroom", hex: "#B0A090" },
      { name: "Antique Gold", hex: "#B8963E" },
    ],
    accent: "#C4856A",
    avoid: ["Bright white", "Cool gray", "Neon", "Icy pink"],
  },
  "True Autumn": {
    tagline: "Rich, warm & saturated",
    description: "You carry the richness of amber light through autumn leaves. Your colors are bold and earthy — deep forest greens, burnt oranges, warm golds that make your eyes come alive.",
    palette: [
      { name: "Burnt Orange", hex: "#C4622D" },
      { name: "Forest Green", hex: "#4A6741" },
      { name: "Warm Gold", hex: "#D4A017" },
      { name: "Deep Teal", hex: "#3D6B6B" },
      { name: "Chocolate", hex: "#6B3A2A" },
      { name: "Olive", hex: "#7A8C3A" },
      { name: "Brick Red", hex: "#A83C2A" },
      { name: "Mustard", hex: "#C49A1A" },
      { name: "Warm Brown", hex: "#8C6040" },
      { name: "Pumpkin", hex: "#D46B2A" },
      { name: "Amber", hex: "#C48C2A" },
      { name: "Deep Olive", hex: "#5A6B30" },
    ],
    accent: "#C4622D",
    avoid: ["Cool pink", "Lavender", "Icy blue", "Pure white"],
  },
  "Soft Summer": {
    tagline: "Cool, muted & delicate",
    description: "You are watercolor and morning haze. Your palette is dusty, cool and romantic — blush roses, powder blues, soft mauves that create an effortlessly refined look.",
    palette: [
      { name: "Dusty Rose", hex: "#C49090" },
      { name: "Powder Blue", hex: "#8AAABA" },
      { name: "Lavender Gray", hex: "#9A90AA" },
      { name: "Cool Taupe", hex: "#9A9090" },
      { name: "Dusty Mauve", hex: "#B08090" },
      { name: "Soft Navy", hex: "#5A6A8A" },
      { name: "Cool Sage", hex: "#8A9A8A" },
      { name: "Blush", hex: "#D4A8A8" },
      { name: "Muted Teal", hex: "#6A9090" },
      { name: "Gray Lilac", hex: "#A898B8" },
      { name: "Cool Cream", hex: "#E0D8D0" },
      { name: "Soft Plum", hex: "#8A6878" },
    ],
    accent: "#8AAABA",
    avoid: ["Warm orange", "Warm brown", "Bright yellow", "Stark black"],
  },
  "True Summer": {
    tagline: "Cool, medium & classic",
    description: "Clear skies and garden roses — your palette is cool, fresh and polished. Rose pinks, periwinkle blues and soft raspberries that make you look effortlessly elegant.",
    palette: [
      { name: "Rose Pink", hex: "#C46878" },
      { name: "Sky Blue", hex: "#6898C4" },
      { name: "Raspberry", hex: "#A84060" },
      { name: "Periwinkle", hex: "#7878C4" },
      { name: "Soft Navy", hex: "#3A5A88" },
      { name: "Icy Pink", hex: "#E0A8B8" },
      { name: "Orchid", hex: "#A868A8" },
      { name: "Cool Blue", hex: "#4878A8" },
      { name: "Watermelon", hex: "#D45870" },
      { name: "Lavender", hex: "#9878C4" },
      { name: "Soft Fuchsia", hex: "#C84888" },
      { name: "Steel Blue", hex: "#507898" },
    ],
    accent: "#C46878",
    avoid: ["Warm orange", "Camel", "Warm gold", "Earthy tones"],
  },
  "Soft Spring": {
    tagline: "Warm, light & delicate",
    description: "You carry the softness of early spring — warm peaches, light corals and golden creams that give you a fresh, natural radiance without overwhelming your gentle coloring.",
    palette: [
      { name: "Warm Peach", hex: "#E8B898" },
      { name: "Light Coral", hex: "#E89878" },
      { name: "Cream", hex: "#F0E0C8" },
      { name: "Warm Beige", hex: "#D4B898" },
      { name: "Soft Gold", hex: "#D4B868" },
      { name: "Light Aqua", hex: "#88C8C8" },
      { name: "Warm Ivory", hex: "#F0DCC0" },
      { name: "Peach Pink", hex: "#E8A8A0" },
      { name: "Warm Mint", hex: "#98C8A8" },
      { name: "Buff", hex: "#D4B888" },
      { name: "Light Camel", hex: "#C8A870" },
      { name: "Warm Sky", hex: "#88B8D0" },
    ],
    accent: "#E8B898",
    avoid: ["Cool gray", "Stark black", "Icy tones", "Muted earthy"],
  },
  "True Spring": {
    tagline: "Warm, clear & fresh",
    description: "Meadow flowers and golden sunlight — your palette is warm, bright and joyful. Coral, apple green, warm turquoise that make you look alive with a natural, radiant glow.",
    palette: [
      { name: "Coral", hex: "#E87858" },
      { name: "Warm Peach", hex: "#E8A878" },
      { name: "Golden Yellow", hex: "#E8C840" },
      { name: "Apple Green", hex: "#78C850" },
      { name: "Turquoise", hex: "#40B8B0" },
      { name: "Coral Pink", hex: "#E88878" },
      { name: "Warm Gold", hex: "#E8A820" },
      { name: "Grass Green", hex: "#60B840" },
      { name: "Aqua", hex: "#40C8C0" },
      { name: "Warm Ivory", hex: "#F0E0C0" },
      { name: "Light Camel", hex: "#D4B070" },
      { name: "Robin Egg", hex: "#60C8D0" },
    ],
    accent: "#E87858",
    avoid: ["Cool pink", "Icy tones", "Muted earthy", "Cool gray"],
  },
  "Light Spring": {
    tagline: "Warm, very light & bright",
    description: "You are sunshine and fresh blossoms. Your palette is the lightest and brightest of all — delicate warm pinks, soft yellows and clear aquas that enhance your luminous, light coloring.",
    palette: [
      { name: "Light Peach", hex: "#F0C8B0" },
      { name: "Warm Blush", hex: "#F0B8B0" },
      { name: "Butter Yellow", hex: "#F0E090" },
      { name: "Light Mint", hex: "#A8E0C8" },
      { name: "Warm Lilac", hex: "#D0B8D8" },
      { name: "Champagne", hex: "#F0D8B0" },
      { name: "Soft Coral", hex: "#F0A898" },
      { name: "Pale Aqua", hex: "#A8D8E0" },
      { name: "Light Gold", hex: "#E8D098" },
      { name: "Warm White", hex: "#F8F0E8" },
      { name: "Petal Pink", hex: "#F0C0C0" },
      { name: "Sky Mint", hex: "#B0E0D0" },
    ],
    accent: "#F0C8B0",
    avoid: ["Dark colors", "Cool tones", "Stark black", "Neon"],
  },
  "Light Summer": {
    tagline: "Cool, very light & soft",
    description: "Your palette is the lightest of the cool seasons — icy pinks, pale lavenders and soft blues that create a polished, ethereal look perfectly suited to your delicate, cool coloring.",
    palette: [
      { name: "Icy Pink", hex: "#F0C8D0" },
      { name: "Pale Lavender", hex: "#D8C8E8" },
      { name: "Soft Blue", hex: "#B8D0E8" },
      { name: "Light Mauve", hex: "#D8B8C8" },
      { name: "Pale Aqua", hex: "#B8D8E0" },
      { name: "Cool White", hex: "#F0F0F8" },
      { name: "Powder Pink", hex: "#F0D0D8" },
      { name: "Pale Periwinkle", hex: "#C8C8E8" },
      { name: "Ice Blue", hex: "#C8E0F0" },
      { name: "Soft Rose", hex: "#E8C0C8" },
      { name: "Pale Mint", hex: "#C0E0D8" },
      { name: "Light Gray", hex: "#D8D8E0" },
    ],
    accent: "#B8D0E8",
    avoid: ["Warm tones", "Orange", "Warm gold", "Dark earthy"],
  },
  "True Winter": {
    tagline: "Cool, dark & high contrast",
    description: "You command attention. True black, pure white, icy cool tones — your palette is dramatic and precise. High contrast colors that make your features striking and unforgettable.",
    palette: [
      { name: "True Black", hex: "#1A1A2A" },
      { name: "Pure White", hex: "#F8F8FF" },
      { name: "Deep Navy", hex: "#1A2A5A" },
      { name: "Burgundy", hex: "#7A1A3A" },
      { name: "Emerald", hex: "#1A6A4A" },
      { name: "Royal Purple", hex: "#4A1A7A" },
      { name: "True Red", hex: "#C01A2A" },
      { name: "Royal Blue", hex: "#1A3AC0" },
      { name: "Deep Teal", hex: "#1A5A6A" },
      { name: "Hot Pink", hex: "#C01A6A" },
      { name: "Charcoal", hex: "#3A3A4A" },
      { name: "Ice Blue", hex: "#9AB8D0" },
    ],
    accent: "#1A3AC0",
    avoid: ["Warm brown", "Orange", "Camel", "Muted tones"],
  },
  "Deep Winter": {
    tagline: "Cool, very dark & intense",
    description: "Rich, deep and powerful — your palette carries the depth of midnight. Dark jewel tones and bold contrasts that bring out the intensity and drama of your striking coloring.",
    palette: [
      { name: "Midnight Navy", hex: "#0A1A3A" },
      { name: "Deep Burgundy", hex: "#5A0A28" },
      { name: "Forest Black", hex: "#0A2A1A" },
      { name: "Deep Plum", hex: "#3A0A5A" },
      { name: "Dark Teal", hex: "#0A3A4A" },
      { name: "Charcoal", hex: "#2A2A3A" },
      { name: "Deep Red", hex: "#8A0A1A" },
      { name: "Midnight Blue", hex: "#0A1A6A" },
      { name: "Dark Emerald", hex: "#0A4A2A" },
      { name: "Deep Fuchsia", hex: "#8A0A5A" },
      { name: "Graphite", hex: "#3A3A4A" },
      { name: "Steel Blue", hex: "#2A5A7A" },
    ],
    accent: "#5A0A28",
    avoid: ["Warm tones", "Orange", "Camel", "Light pastels"],
  },
  "Deep Autumn": {
    tagline: "Warm, very dark & rich",
    description: "You carry the richest, deepest warmth — dark chocolate, deep olive, earthy burgundy. Your palette is intense and grounding, bringing out the depth and richness of your coloring.",
    palette: [
      { name: "Dark Chocolate", hex: "#3A1A0A" },
      { name: "Deep Olive", hex: "#3A4A1A" },
      { name: "Earthy Burgundy", hex: "#6A1A1A" },
      { name: "Dark Teal", hex: "#1A3A3A" },
      { name: "Coffee", hex: "#4A2A1A" },
      { name: "Dark Gold", hex: "#8A6A0A" },
      { name: "Deep Rust", hex: "#7A2A0A" },
      { name: "Dark Moss", hex: "#3A4A2A" },
      { name: "Espresso", hex: "#2A1A0A" },
      { name: "Warm Black", hex: "#1A1A0A" },
      { name: "Deep Amber", hex: "#7A4A0A" },
      { name: "Dark Forest", hex: "#1A3A1A" },
    ],
    accent: "#8A6A0A",
    avoid: ["Cool pink", "Lavender", "Icy blue", "Bright white"],
  },
  "Bright Winter": {
    tagline: "Cool, dark & vivid",
    description: "You are electric and striking. Your palette is cool, high contrast and intensely vivid — bright fuchsia, electric blue, vivid emerald that make you look luminous and powerful.",
    palette: [
      { name: "Electric Blue", hex: "#0A50D0" },
      { name: "Vivid Fuchsia", hex: "#D00A7A" },
      { name: "True Red", hex: "#D00A1A" },
      { name: "Bright Emerald", hex: "#0A9A5A" },
      { name: "Royal Purple", hex: "#6A0AD0" },
      { name: "True Black", hex: "#0A0A1A" },
      { name: "Pure White", hex: "#F8F8FF" },
      { name: "Bright Teal", hex: "#0AB0C0" },
      { name: "Hot Pink", hex: "#E00A8A" },
      { name: "Cobalt", hex: "#0A3AC0" },
      { name: "Vivid Green", hex: "#0AC04A" },
      { name: "Ice Blue", hex: "#8AC8E8" },
    ],
    accent: "#0A50D0",
    avoid: ["Warm brown", "Muted tones", "Camel", "Dusty colors"],
  },
};

const CATEGORIES = ["All", "Dresses", "Tops", "Trousers", "Skirts", "Knitwear", "Outerwear", "Bottoms"];
const BRANDS = ["All Brands", "Zara", "Reformation", "Madewell", "Mango", "Quince", "Sézane"];
const SEASON_LIST = Object.keys(SEASONS);

function ClothingIllustration({ color, category }) {
  const c = color;
  const lighter = c + "99";
  if (category === "Dresses" || category === "Skirts") return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M32 18 Q50 10 68 18 L80 48 Q62 44 58 56 L58 122 Q50 126 42 122 L42 56 Q38 44 20 48 Z" fill={c} opacity="0.92"/>
      <path d="M32 18 Q50 10 68 18" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      <path d="M42 56 L58 56" stroke="white" strokeWidth="0.5" opacity="0.2"/>
    </svg>
  );
  if (category === "Trousers" || category === "Bottoms") return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M18 22 L82 22 L82 62 L55 68 L50 125 L45 125 L40 68 L18 62 Z" fill={c} opacity="0.92"/>
      <line x1="50" y1="22" x2="50" y2="70" stroke="white" strokeWidth="0.6" opacity="0.2"/>
      <line x1="18" y1="22" x2="82" y2="22" stroke="white" strokeWidth="1" opacity="0.15"/>
    </svg>
  );
  if (category === "Tops" || category === "Knitwear") return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M36 16 Q50 10 64 16 L88 44 L72 50 L72 118 L28 118 L28 50 L12 44 Z" fill={c} opacity="0.92"/>
      <path d="M36 16 Q50 24 64 16" fill="none" stroke="white" strokeWidth="1" opacity="0.25"/>
      {category === "Knitwear" && [35,48,61,74,87,100].map(y => <line key={y} x1="28" y1={y} x2="72" y2={y} stroke="white" strokeWidth="0.4" opacity="0.12"/>)}
    </svg>
  );
  if (category === "Outerwear") return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M30 14 Q50 8 70 14 L90 42 L73 50 L73 124 L27 124 L27 50 L10 42 Z" fill={c} opacity="0.92"/>
      <path d="M50 14 L43 124" stroke="white" strokeWidth="1.2" opacity="0.18"/>
      <path d="M50 14 L57 124" stroke="white" strokeWidth="1.2" opacity="0.18"/>
      <circle cx="46" cy="68" r="2" fill="white" opacity="0.25"/>
      <circle cx="46" cy="82" r="2" fill="white" opacity="0.25"/>
      <circle cx="46" cy="96" r="2" fill="white" opacity="0.25"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 100 130" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M32 18 Q50 10 68 18 L80 48 Q62 44 58 56 L58 122 Q50 126 42 122 L42 56 Q38 44 20 48 Z" fill={c} opacity="0.92"/>
    </svg>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FDFAF6",
        border: `1px solid ${hovered ? product.color + "60" : "#EDE8E0"}`,
        transition: "all 0.35s ease",
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 32px ${product.color}20` : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{
        height: "240px",
        background: `radial-gradient(ellipse at 60% 40%, ${product.color}18 0%, #F5F0E8 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}>
        {product.img ? (
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
        ) : (
          <div style={{ width: "72px", height: "120px", padding: "16px" }}>
            <ClothingIllustration color={product.color} category={product.category} />
          </div>
        )}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: product.color,
          boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        }} />
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{
          fontSize: "9px",
          letterSpacing: "0.2em",
          color: product.color,
          textTransform: "uppercase",
          marginBottom: "3px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
        }}>{product.brand}</div>
        <div style={{
          fontSize: "13px",
          color: "#2C2418",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          marginBottom: "10px",
          lineHeight: 1.3,
          fontWeight: 500,
        }}>{product.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: product.color, flexShrink: 0 }} />
            <span style={{ fontSize: "10px", color: "#9A8E80", fontFamily: "'DM Sans', sans-serif" }}>{product.colorName}</span>
          </div>
          <span style={{ fontSize: "13px", color: "#2C2418", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{product.price}</span>
        </div>
        <a href={product.url || "#"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            marginTop: "10px",
            padding: "8px",
            background: hovered ? product.color : "transparent",
            border: `1px solid ${product.color}`,
            color: hovered ? "white" : product.color,
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.25s ease",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
          }}>Shop Now →</button>
        </a>
      </div>
    </div>
  );
}

function EmailCapture({ season, accentColor }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  if (submitted) return (
    <div style={{
      textAlign: "center",
      padding: "32px",
      background: `${accentColor}10`,
      border: `1px solid ${accentColor}30`,
    }}>
      <div style={{ fontSize: "20px", marginBottom: "8px" }}>✨</div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#2C2418", fontStyle: "italic", marginBottom: "4px" }}>
        You're on the list
      </p>
      <p style={{ fontSize: "12px", color: "#9A8E80", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
        We'll notify you when new {season} pieces drop.
      </p>
    </div>
  );

  return (
    <div style={{
      background: `linear-gradient(135deg, ${accentColor}08 0%, #FAF7F2 100%)`,
      border: `1px solid ${accentColor}20`,
      padding: "32px",
      textAlign: "center",
    }}>
      <p style={{
        fontSize: "10px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: accentColor,
        marginBottom: "10px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
      }}>Never miss a drop</p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "22px",
        color: "#2C2418",
        fontStyle: "italic",
        marginBottom: "6px",
        fontWeight: 500,
        lineHeight: 1.2,
      }}>New {season} pieces, straight to your inbox</p>
      <p style={{
        fontSize: "12px",
        color: "#9A8E80",
        fontFamily: "'DM Sans', sans-serif",
        marginBottom: "20px",
        lineHeight: 1.5,
      }}>Get notified when new arrivals land in your palette from Zara, Reformation and more.</p>
      <div style={{ display: "flex", gap: "0", maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={{
            flex: 1,
            padding: "12px 16px",
            border: `1px solid ${focused ? accentColor : "#DDD8D0"}`,
            borderRight: "none",
            background: "white",
            fontSize: "13px",
            fontFamily: "'DM Sans', sans-serif",
            color: "#2C2418",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 20px",
            background: accentColor,
            border: `1px solid ${accentColor}`,
            color: "white",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >Notify Me</button>
      </div>
    </div>
  );
}

// ─── Welcome / AI Season Analyser ────────────────────────────────────────────
function WelcomePage({ onSeasonSelected }) {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const SEASONS_LIST = [
    "Soft Autumn", "True Autumn", "Deep Autumn",
    "Soft Summer", "True Summer", "Light Summer",
    "True Winter", "Deep Winter", "Bright Winter",
    "Soft Spring", "True Spring", "Light Spring"
  ];

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageBase64(e.target.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const analysePhoto = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setError(null);
    try {
      // Detect actual image type from base64 header
      const mediaType = image.startsWith("data:image/png") ? "image/png"
        : image.startsWith("data:image/webp") ? "image/webp"
        : image.startsWith("data:image/gif") ? "image/gif"
        : "image/jpeg";

      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, mediaType })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        setError(`API error ${response.status}: ${errData.error || "Please try again."}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.error) {
        setError(`Error: ${data.error}`);
        setLoading(false);
        return;
      }

      const text = data.content?.[0]?.text || "";
      if (!text) {
        setError("No response from analysis. Please try again.");
        setLoading(false);
        return;
      }

      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (SEASONS_LIST.includes(parsed.season)) {
        setResult(parsed);
      } else {
        setError("Could not determine a clear season. Please try a clearer photo.");
      }
    } catch (e) {
      setError(`Something went wrong: ${e.message}`);
    }
    setLoading(false);
  };

  const seasonAccents = {
    "Soft Autumn": "#C4856A", "True Autumn": "#C4622D", "Deep Autumn": "#8B4513",
    "Soft Summer": "#8AAABA", "True Summer": "#C46878", "Light Summer": "#B8A8C8",
    "True Winter": "#2A3A5A", "Deep Winter": "#1A2A4A", "Bright Winter": "#1A50D0",
    "Soft Spring": "#E8B898", "True Spring": "#E87858", "Light Spring": "#F0A8B8"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .upload-zone { transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #C4856A !important; background: #FDF9F5 !important; }
        .analyse-btn { transition: all 0.2s ease; }
        .analyse-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .shop-btn { transition: all 0.2s ease; }
        .shop-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        @media (max-width: 768px) {
          .welcome-inner { padding: 40px 20px !important; }
          .welcome-title { font-size: 48px !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ padding: "24px 48px", borderBottom: "1px solid #EDE8E0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 500, color: "#2C2418", letterSpacing: "0.02em" }}>
          My Best Season
        </div>
        <button onClick={() => onSeasonSelected(null)} style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#9A8E80", background: "none", border: "none", cursor: "pointer" }}>
          Browse All Seasons →
        </button>
      </header>

      <div className="welcome-inner" style={{ maxWidth: "680px", margin: "0 auto", padding: "80px 24px 60px" }}>

        {/* Hero text */}
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4856A", marginBottom: "20px" }}>
          — Discover Your Color Season
        </p>
        <h1 className="welcome-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "64px", fontWeight: 400, color: "#2C2418", lineHeight: 1.05, marginBottom: "24px", letterSpacing: "-0.01em" }}>
          What season<br /><em>are you?</em>
        </h1>
        <p style={{ fontSize: "16px", color: "#7A7060", lineHeight: 1.7, marginBottom: "48px", fontWeight: 300, maxWidth: "520px" }}>
          Upload a photo and our AI will analyse your natural coloring — skin tone, hair, and eyes — to reveal your personal color season and unlock a curated wardrobe built just for you.
        </p>

        {/* Upload zone */}
        {!image ? (
          <div
            className="upload-zone"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => document.getElementById("photo-input").click()}
            style={{
              border: `2px dashed ${dragOver ? "#C4856A" : "#D8D0C8"}`,
              borderRadius: "4px",
              padding: "64px 40px",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "#FDF9F5" : "transparent",
              marginBottom: "32px"
            }}
          >
            <input id="photo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>📸</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontStyle: "italic", color: "#2C2418", marginBottom: "8px" }}>
              Upload your photo
            </p>
            <p style={{ fontSize: "12px", color: "#B8AFA0", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Drag & drop or click to browse
            </p>
            <p style={{ fontSize: "11px", color: "#C8C0B8", marginTop: "12px" }}>
              Best results: natural lighting, no heavy filter, face clearly visible
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: "32px" }}>
            <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
              <img src={image} alt="Your photo" style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "4px", display: "block" }} />
              <button
                onClick={() => { setImage(null); setImageBase64(null); setResult(null); }}
                style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px" }}
              >×</button>
            </div>
          </div>
        )}

        {/* Analyse button */}
        {image && !result && (
          <button
            className="analyse-btn"
            onClick={analysePhoto}
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              background: "#2C2418",
              color: "#FAF7F2",
              border: "none",
              borderRadius: "2px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "16px",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Analysing your coloring…" : "Discover My Season →"}
          </button>
        )}

        {error && (
          <p style={{ color: "#C4622D", fontSize: "13px", textAlign: "center", marginBottom: "16px" }}>{error}</p>
        )}

        {/* Result */}
        {result && (
          <div style={{ border: "1px solid #EDE8E0", borderRadius: "4px", padding: "40px", background: "white", marginBottom: "24px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: seasonAccents[result.season] || "#C4856A", marginBottom: "12px" }}>
              — Your Color Season
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", fontWeight: 400, color: "#2C2418", marginBottom: "16px", lineHeight: 1.1 }}>
              {result.season}
            </h2>
            <p style={{ fontSize: "15px", color: "#7A7060", lineHeight: 1.7, marginBottom: "24px", fontWeight: 300 }}>
              {result.explanation}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
              {result.keyTraits.map(t => (
                <span key={t} style={{ fontSize: "11px", padding: "6px 14px", border: `1px solid ${seasonAccents[result.season] || "#C4856A"}`, color: seasonAccents[result.season] || "#C4856A", borderRadius: "2px", letterSpacing: "0.08em" }}>
                  {t}
                </span>
              ))}
            </div>
            <p style={{ fontSize: "11px", color: "#B8AFA0", marginBottom: "24px", letterSpacing: "0.05em" }}>
              Confidence: {result.confidence}
            </p>
            <button
              className="shop-btn"
              onClick={() => onSeasonSelected(result.season)}
              style={{
                width: "100%",
                padding: "18px",
                background: seasonAccents[result.season] || "#C4856A",
                color: "white",
                border: "none",
                borderRadius: "2px",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer"
              }}
            >
              Shop My {result.season} Palette →
            </button>
          </div>
        )}

        {/* Manual season select */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "#B8AFA0", marginTop: "24px" }}>
          Already know your season?{" "}
          <span onClick={() => onSeasonSelected(null)} style={{ color: "#7A7060", cursor: "pointer", textDecoration: "underline" }}>
            Browse all seasons
          </span>
        </p>
      </div>
    </div>
  );
}


export default function App() {
  const [selectedSeason, setSelectedSeason] = useState("Soft Autumn");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [seasonMenuOpen, setSeasonMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeSeason, setWelcomeSeason] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("Product")
        .select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        const normalised = data.map(p => ({
          id: p.id,
          brand: p.brand,
          name: p.name,
          price: p.price ? `$${p.price}` : "",
          color: p.color_hex || "#C4856A",
          colorName: p.color_name,
          season: p.season,
          category: p.category,
          url: p.product_url || "",
          img: p.image_url || "",
        }));
        setProducts(normalised);
      }
      setLoadingProducts(false);
    }
    fetchProducts();
  }, []);

  const season = SEASONS[selectedSeason];
  const accent = season.accent;

  const filtered = products.filter(p => {
    if (p.season !== selectedSeason) return false;
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedBrand !== "All Brands" && p.brand !== selectedBrand) return false;
    return true;
  });

  const changeSeason = (s) => {
    setSelectedSeason(s);
    setSelectedCategory("All");
    setSelectedBrand("All Brands");
    setSeasonMenuOpen(false);
    setPaletteOpen(false);
  };

  if (showWelcome) {
    return (
      <WelcomePage onSeasonSelected={(season) => {
        if (season) setSelectedSeason(season);
        setShowWelcome(false);
      }} />
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", color: "#2C2418", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-text-size-adjust: 100%; }
        body { background: #FAF7F2; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F0EBE3; }
        ::-webkit-scrollbar-thumb { background: #C8BFB0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .season-chip:hover { background: #EDE8E0 !important; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .header-inner { padding: 0 20px !important; }
          .hero-section { padding: 40px 20px 32px !important; }
          .filters-section { padding: 16px 20px !important; gap: 16px !important; }
          .products-section { padding: 24px 16px !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .season-menu { display: none !important; }
          .season-menu-open { display: block !important; }
          .mobile-season-toggle { display: flex !important; }
          .filters-section { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .filter-row { overflow-x: auto !important; flex-wrap: nowrap !important; width: 100% !important; padding-bottom: 4px !important; -webkit-overflow-scrolling: touch !important; }
          .filter-row::-webkit-scrollbar { display: none !important; }
        }
        @media (max-width: 480px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>

      {/* Header */}
      <header className="header-inner" style={{
        borderBottom: "1px solid #EDE8E0",
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        position: "sticky",
        top: 0,
        background: "rgba(250,247,242,0.96)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#2C2418",
          }}>My Best Season</span>
          <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            shop your palette
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{ fontSize: "11px", color: "#9A8E80", letterSpacing: "0.12em" }}>
            {selectedSeason}
          </span>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: `conic-gradient(${season.palette.slice(0,6).map((c,i) => `${c.hex} ${i*60}deg ${(i+1)*60}deg`).join(", ")})`,
            border: "2px solid white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }} />
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section" style={{
        padding: "64px 48px 48px",
        borderBottom: "1px solid #EDE8E0",
        background: `linear-gradient(135deg, #FAF7F2 60%, ${accent}08 100%)`,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

            {/* Left: Season info */}
            <div className={mounted ? "fade-up" : ""}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", background: accent }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.25em", color: accent, textTransform: "uppercase", fontWeight: 600 }}>
                  Your color season
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 500,
                lineHeight: 1.05,
                marginBottom: "8px",
                color: "#2C2418",
              }}>{selectedSeason}</h1>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "16px",
                color: accent,
                fontStyle: "italic",
                marginBottom: "16px",
                fontWeight: 400,
              }}>{season.tagline}</p>
              <p style={{
                fontSize: "14px",
                color: "#7A7060",
                lineHeight: 1.7,
                marginBottom: "28px",
                maxWidth: "440px",
              }}>{season.description}</p>

              {/* Palette strip */}
              <div
                onClick={() => setPaletteOpen(!paletteOpen)}
                style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ display: "flex", gap: "3px" }}>
                  {season.palette.map(c => (
                    <div key={c.hex} title={c.name} style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: c.hex,
                      border: "1.5px solid white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s",
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: "10px", color: "#9A8E80", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {paletteOpen ? "▲" : "▼"} {paletteOpen ? "Hide" : "View"} palette
                </span>
              </div>

              {/* Expanded palette */}
              {paletteOpen && (
                <div style={{
                  marginTop: "16px",
                  padding: "20px",
                  background: "white",
                  border: "1px solid #EDE8E0",
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: "12px",
                }}>
                  {season.palette.map(c => (
                    <div key={c.hex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: c.hex, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }} />
                      <span style={{ fontSize: "9px", color: "#9A8E80", textAlign: "center", lineHeight: 1.2 }}>{c.name}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", overflowX: "auto", flexWrap: "nowrap", WebkitOverflowScrolling: "touch", paddingBottom: "4px" }}>
                    <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.12em", textTransform: "uppercase" }}>Avoid: </span>
                    <span style={{ fontSize: "10px", color: "#9A8E80" }}>{season.avoid.join(" · ")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Season selector */}
            <div>
              <div
                className="mobile-season-toggle"
                onClick={() => setSeasonMenuOpen(!seasonMenuOpen)}
                style={{ display: "none", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", border: "1px solid #EDE8E0", background: "white", cursor: "pointer", marginBottom: "8px" }}
              >
                <span style={{ fontSize: "11px", color: "#7A7060", letterSpacing: "0.1em", textTransform: "uppercase" }}>Change season</span>
                <span style={{ fontSize: "11px", color: "#9A8E80" }}>{seasonMenuOpen ? "▲" : "▼"}</span>
              </div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8AFA0", marginBottom: "14px" }}>
                Not your season? Change it
              </p>
              <div className={`season-menu${seasonMenuOpen ? " season-menu-open" : ""}`} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {SEASON_LIST.map(s => (
                  <button
                    key={s}
                    className="season-chip"
                    onClick={() => changeSeason(s)}
                    style={{
                      padding: "7px 14px",
                      border: `1px solid ${selectedSeason === s ? accent : "#DDD8D0"}`,
                      background: selectedSeason === s ? accent : "white",
                      color: selectedSeason === s ? "white" : "#7A7060",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: selectedSeason === s ? 600 : 400,
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section" style={{
        padding: "20px 48px",
        borderBottom: "1px solid #EDE8E0",
        display: "flex",
        gap: "32px",
        alignItems: "center",
        flexWrap: "wrap",
        background: "white",
      }}>
        <div className="filter-row" style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.2em", textTransform: "uppercase", marginRight: "4px", flexShrink: 0 }}>Category</span>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setSelectedCategory(c)} style={{
              padding: "5px 12px",
              border: `1px solid ${selectedCategory === c ? accent : "#EDE8E0"}`,
              background: selectedCategory === c ? `${accent}12` : "transparent",
              color: selectedCategory === c ? accent : "#9A8E80",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: selectedCategory === c ? 600 : 400,
            }}>{c}</button>
          ))}
        </div>
        <div className="filter-row" style={{ display: "flex", gap: "6px", alignItems: "center", overflowX: "auto", flexWrap: "nowrap", WebkitOverflowScrolling: "touch", paddingBottom: "4px" }}>
          <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.2em", textTransform: "uppercase", marginRight: "4px", flexShrink: 0 }}>Brand</span>
          {BRANDS.map(b => (
            <button key={b} onClick={() => setSelectedBrand(b)} style={{ flexShrink: 0,
              padding: "5px 12px",
              border: `1px solid ${selectedBrand === b ? accent : "#EDE8E0"}`,
              background: selectedBrand === b ? `${accent}12` : "transparent",
              color: selectedBrand === b ? accent : "#9A8E80",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: selectedBrand === b ? 600 : 400,
              flexShrink: 0,
            }}>{b}</button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="products-section" style={{ padding: "40px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", color: "#B8AFA0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {loadingProducts ? "Loading…" : `${filtered.length} piece${filtered.length !== 1 ? "s" : ""} in your palette`}
          </p>
          <p style={{ fontSize: "11px", color: "#B8AFA0", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px" }}>
            All products curated for {selectedSeason}
          </p>
        </div>

        {loadingProducts ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#B8AFA0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontStyle: "italic", color: "#9A8E80" }}>
              Curating your palette…
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 0",
            color: "#B8AFA0",
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontStyle: "italic", marginBottom: "8px", color: "#9A8E80" }}>
              No pieces found for this filter
            </p>
            <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Try a different combination</p>
          </div>
        ) : (
          <div className="product-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "20px",
            marginBottom: "56px",
          }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        {/* Email capture */}
        <EmailCapture season={selectedSeason} accentColor={accent} />
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid #EDE8E0",
        padding: "28px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        marginTop: "40px",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#9A8E80", fontStyle: "italic" }}>
          My Best Season
        </span>
        <span style={{ fontSize: "10px", color: "#C8BFB0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Dress in your best season
        </span>
        <span style={{ fontSize: "10px", color: "#C8BFB0", letterSpacing: "0.15em" }}>
          © 2025
        </span>
      </footer>
    </div>
  );
}
