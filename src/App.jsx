import { useState, useEffect } from "react";

const SEASONS = {
  "Soft Autumn": {
    tagline: "Muted, warm & earthy",
    description: "Your palette is nature at its most poetic — dried botanicals, morning fog, the warmth of terracotta in soft light. You glow in colours that are hushed, golden and deeply grounded.",
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
    avoid: ["Bright white", "Cool grey", "Neon", "Icy pink"],
  },
  "True Autumn": {
    tagline: "Rich, warm & saturated",
    description: "You carry the richness of amber light through autumn leaves. Your colours are bold and earthy — deep forest greens, burnt oranges, warm golds that make your eyes come alive.",
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
    description: "You are watercolour and morning haze. Your palette is dusty, cool and romantic — blush roses, powder blues, soft mauves that create an effortlessly refined look.",
    palette: [
      { name: "Dusty Rose", hex: "#C49090" },
      { name: "Powder Blue", hex: "#8AAABA" },
      { name: "Lavender Grey", hex: "#9A90AA" },
      { name: "Cool Taupe", hex: "#9A9090" },
      { name: "Dusty Mauve", hex: "#B08090" },
      { name: "Soft Navy", hex: "#5A6A8A" },
      { name: "Cool Sage", hex: "#8A9A8A" },
      { name: "Blush", hex: "#D4A8A8" },
      { name: "Muted Teal", hex: "#6A9090" },
      { name: "Grey Lilac", hex: "#A898B8" },
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
    description: "You carry the softness of early spring — warm peaches, light corals and golden creams that give you a fresh, natural radiance without overwhelming your gentle colouring.",
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
    avoid: ["Cool grey", "Stark black", "Icy tones", "Muted earthy"],
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
    avoid: ["Cool pink", "Icy tones", "Muted earthy", "Cool grey"],
  },
  "Light Spring": {
    tagline: "Warm, very light & bright",
    description: "You are sunshine and fresh blossoms. Your palette is the lightest and brightest of all — delicate warm pinks, soft yellows and clear aquas that enhance your luminous, light colouring.",
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
    avoid: ["Dark colours", "Cool tones", "Stark black", "Neon"],
  },
  "Light Summer": {
    tagline: "Cool, very light & soft",
    description: "Your palette is the lightest of the cool seasons — icy pinks, pale lavenders and soft blues that create a polished, ethereal look perfectly suited to your delicate, cool colouring.",
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
      { name: "Light Grey", hex: "#D8D8E0" },
    ],
    accent: "#B8D0E8",
    avoid: ["Warm tones", "Orange", "Warm gold", "Dark earthy"],
  },
  "True Winter": {
    tagline: "Cool, dark & high contrast",
    description: "You command attention. True black, pure white, icy cool tones — your palette is dramatic and precise. High contrast colours that make your features striking and unforgettable.",
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
    description: "Rich, deep and powerful — your palette carries the depth of midnight. Dark jewel tones and bold contrasts that bring out the intensity and drama of your striking colouring.",
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
    description: "You carry the richest, deepest warmth — dark chocolate, deep olive, earthy burgundy. Your palette is intense and grounding, bringing out the depth and richness of your colouring.",
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
    avoid: ["Warm brown", "Muted tones", "Camel", "Dusty colours"],
  },
};

const PRODUCTS = [
  // ── SOFT AUTUMN ──────────────────────────────────────────────
  { id: 1,  brand: "Reformation",  name: "Sedona Midi Dress",           price: "$278", color: "#C4856A", colorName: "Terracotta",   season: "Soft Autumn", category: "Dresses" },
  { id: 2,  brand: "Zara",         name: "Linen Wide Leg Trousers",     price: "$69",  color: "#9E8572", colorName: "Warm Taupe",    season: "Soft Autumn", category: "Trousers" },
  { id: 3,  brand: "Mango",        name: "Flowing Wrap Blouse",         price: "$60",  color: "#8A8C5A", colorName: "Dusty Olive",   season: "Soft Autumn", category: "Tops" },
  { id: 4,  brand: "Quince",       name: "Mongolian Cashmere Crewneck", price: "$50",  color: "#C49A6C", colorName: "Camel",         season: "Soft Autumn", category: "Knitwear" },
  { id: 5,  brand: "Reformation",  name: "Amora Midi Skirt",            price: "$168", color: "#A85C3A", colorName: "Rust",          season: "Soft Autumn", category: "Skirts" },
  { id: 6,  brand: "Sézane",       name: "Gaspard Relaxed Shirt",       price: "$115", color: "#8C9E85", colorName: "Sage Smoke",    season: "Soft Autumn", category: "Tops" },
  { id: 7,  brand: "Madewell",     name: "(Re)sourced Cashmere Turtleneck", price: "$138", color: "#B0A090", colorName: "Mushroom", season: "Soft Autumn", category: "Knitwear" },
  { id: 8,  brand: "Zara",         name: "Double Breasted Blazer",      price: "$129", color: "#6B4C3B", colorName: "Chocolate",     season: "Soft Autumn", category: "Outerwear" },
  { id: 9,  brand: "Mango",        name: "Leather Effect Midi Skirt",   price: "$80",  color: "#B8963E", colorName: "Antique Gold",  season: "Soft Autumn", category: "Skirts" },
  { id: 10, brand: "Quince",       name: "European Linen Trousers",     price: "$60",  color: "#6B7A45", colorName: "Moss",          season: "Soft Autumn", category: "Trousers" },

  // ── TRUE AUTUMN ──────────────────────────────────────────────
  { id: 11, brand: "Reformation",  name: "Calista Slip Dress",          price: "$198", color: "#C4622D", colorName: "Burnt Orange",  season: "True Autumn", category: "Dresses" },
  { id: 12, brand: "Zara",         name: "Corduroy Wide Leg Trousers",  price: "$79",  color: "#4A6741", colorName: "Forest Green",  season: "True Autumn", category: "Trousers" },
  { id: 13, brand: "Madewell",     name: "Texture & Thread Midi Dress", price: "$148", color: "#D4A017", colorName: "Warm Gold",     season: "True Autumn", category: "Dresses" },
  { id: 14, brand: "Sézane",       name: "Anatole Knit Cardigan",       price: "$155", color: "#C49A1A", colorName: "Mustard",       season: "True Autumn", category: "Knitwear" },
  { id: 15, brand: "Zara",         name: "Suede Effect A-Line Skirt",   price: "$99",  color: "#A83C2A", colorName: "Brick Red",     season: "True Autumn", category: "Skirts" },
  { id: 16, brand: "Mango",        name: "Knitted Polo Neck Sweater",   price: "$70",  color: "#8C6040", colorName: "Warm Brown",    season: "True Autumn", category: "Knitwear" },
  { id: 17, brand: "Quince",       name: "Stretch Organic Cotton Blazer", price: "$120", color: "#5A6B30", colorName: "Deep Olive", season: "True Autumn", category: "Outerwear" },
  { id: 18, brand: "Reformation",  name: "Hailey Midi Wrap Dress",      price: "$218", color: "#D46B2A", colorName: "Pumpkin",       season: "True Autumn", category: "Dresses" },
  { id: 19, brand: "Zara",         name: "Faux Leather Biker Jacket",   price: "$149", color: "#6B3A2A", colorName: "Chocolate",     season: "True Autumn", category: "Outerwear" },
  { id: 20, brand: "Madewell",     name: "Oversized Flannel Shirt",     price: "$78",  color: "#3D6B6B", colorName: "Deep Teal",     season: "True Autumn", category: "Tops" },

  // ── SOFT SUMMER ──────────────────────────────────────────────
  { id: 21, brand: "Reformation",  name: "Valletta Midi Dress",         price: "$248", color: "#C49090", colorName: "Dusty Rose",    season: "Soft Summer", category: "Dresses" },
  { id: 22, brand: "Zara",         name: "Fine Knit V-Neck Cardigan",   price: "$65",  color: "#8AAABA", colorName: "Powder Blue",   season: "Soft Summer", category: "Knitwear" },
  { id: 23, brand: "Sézane",       name: "Prune Floral Midi Dress",     price: "$195", color: "#9A90AA", colorName: "Lavender Grey", season: "Soft Summer", category: "Dresses" },
  { id: 24, brand: "Mango",        name: "Fluid Straight Trousers",     price: "$70",  color: "#5A6A8A", colorName: "Soft Navy",     season: "Soft Summer", category: "Trousers" },
  { id: 25, brand: "Madewell",     name: "Lightspun Tiered Midi Skirt", price: "$88",  color: "#B08090", colorName: "Dusty Mauve",   season: "Soft Summer", category: "Skirts" },
  { id: 26, brand: "Quince",       name: "Washable Silk Blouse",        price: "$80",  color: "#D4A8A8", colorName: "Blush",         season: "Soft Summer", category: "Tops" },
  { id: 27, brand: "Zara",         name: "Linen Blend Blazer",          price: "$119", color: "#6A9090", colorName: "Muted Teal",    season: "Soft Summer", category: "Outerwear" },
  { id: 28, brand: "Reformation",  name: "Cynthia High Rise Trouser",   price: "$188", color: "#9A9090", colorName: "Cool Taupe",    season: "Soft Summer", category: "Trousers" },
  { id: 29, brand: "Mango",        name: "Draped Asymmetric Blouse",    price: "$55",  color: "#A898B8", colorName: "Grey Lilac",    season: "Soft Summer", category: "Tops" },
  { id: 30, brand: "Sézane",       name: "Nino Straight Leg Jeans",     price: "$145", color: "#8A6878", colorName: "Soft Plum",     season: "Soft Summer", category: "Trousers" },

  // ── TRUE SUMMER ──────────────────────────────────────────────
  { id: 31, brand: "Reformation",  name: "Caspian Wrap Dress",          price: "$228", color: "#C46878", colorName: "Rose Pink",     season: "True Summer", category: "Dresses" },
  { id: 32, brand: "Zara",         name: "Satin Finish Midi Skirt",     price: "$89",  color: "#A84060", colorName: "Raspberry",     season: "True Summer", category: "Skirts" },
  { id: 33, brand: "Madewell",     name: "Whisper Cotton Crewneck Tee", price: "$35",  color: "#6898C4", colorName: "Sky Blue",      season: "True Summer", category: "Tops" },
  { id: 34, brand: "Mango",        name: "Flowing Midi Dress",          price: "$90",  color: "#7878C4", colorName: "Periwinkle",    season: "True Summer", category: "Dresses" },
  { id: 35, brand: "Sézane",       name: "Beatrice Knit Cardigan",      price: "$165", color: "#A868A8", colorName: "Orchid",        season: "True Summer", category: "Knitwear" },
  { id: 36, brand: "Quince",       name: "100% Silk Midi Slip Dress",   price: "$100", color: "#E0A8B8", colorName: "Icy Pink",      season: "True Summer", category: "Dresses" },
  { id: 37, brand: "Zara",         name: "Structured Shoulder Blazer",  price: "$139", color: "#3A5A88", colorName: "Soft Navy",     season: "True Summer", category: "Outerwear" },
  { id: 38, brand: "Reformation",  name: "Remy Wide Leg Trouser",       price: "$178", color: "#507898", colorName: "Steel Blue",    season: "True Summer", category: "Trousers" },
  { id: 39, brand: "Mango",        name: "Ribbed Knit Midi Skirt",      price: "$60",  color: "#D45870", colorName: "Watermelon",    season: "True Summer", category: "Skirts" },
  { id: 40, brand: "Madewell",     name: "Emmett Wide Leg Crop Pant",   price: "$118", color: "#9878C4", colorName: "Lavender",      season: "True Summer", category: "Trousers" },

  // ── TRUE WINTER ──────────────────────────────────────────────
  { id: 41, brand: "Reformation",  name: "Camille Wrap Midi Dress",     price: "$268", color: "#1A1A2A", colorName: "True Black",    season: "True Winter", category: "Dresses" },
  { id: 42, brand: "Zara",         name: "Tailored Double Breast Blazer", price: "$139", color: "#7A1A3A", colorName: "Burgundy",  season: "True Winter", category: "Outerwear" },
  { id: 43, brand: "Madewell",     name: "Cali Demi-Boot Jean",         price: "$148", color: "#1A2A5A", colorName: "Deep Navy",     season: "True Winter", category: "Trousers" },
  { id: 44, brand: "Sézane",       name: "Adele Silk Blouse",           price: "$185", color: "#F8F8FF", colorName: "Pure White",    season: "True Winter", category: "Tops" },
  { id: 45, brand: "Quince",       name: "Italian Wool Turtleneck",     price: "$60",  color: "#3A3A4A", colorName: "Charcoal",      season: "True Winter", category: "Knitwear" },
  { id: 46, brand: "Zara",         name: "Faux Leather Flare Trousers", price: "$89",  color: "#1A1A2A", colorName: "True Black",    season: "True Winter", category: "Trousers" },
  { id: 47, brand: "Mango",        name: "Structured Wool Coat",        price: "$220", color: "#1A2A5A", colorName: "Deep Navy",     season: "True Winter", category: "Outerwear" },
  { id: 48, brand: "Reformation",  name: "Rosetta Satin Midi Skirt",    price: "$158", color: "#C01A2A", colorName: "True Red",      season: "True Winter", category: "Skirts" },
  { id: 49, brand: "Quince",       name: "Stretch Ponte Blazer",        price: "$90",  color: "#1A6A4A", colorName: "Emerald",       season: "True Winter", category: "Outerwear" },
  { id: 50, brand: "Madewell",     name: "Oversized Turtleneck Sweater", price: "$98", color: "#9AB8D0", colorName: "Ice Blue",     season: "True Winter", category: "Knitwear" },

  // ── TRUE SPRING ──────────────────────────────────────────────
  { id: 51, brand: "Reformation",  name: "Lyra Wrap Sundress",          price: "$218", color: "#E87858", colorName: "Coral",         season: "True Spring", category: "Dresses" },
  { id: 52, brand: "Zara",         name: "Printed Linen Midi Dress",    price: "$79",  color: "#E8A878", colorName: "Warm Peach",    season: "True Spring", category: "Dresses" },
  { id: 53, brand: "Mango",        name: "Flowy Printed Blouse",        price: "$50",  color: "#78C850", colorName: "Apple Green",   season: "True Spring", category: "Tops" },
  { id: 54, brand: "Madewell",     name: "Linen Blend Wide Leg Pant",   price: "$108", color: "#40B8B0", colorName: "Turquoise",     season: "True Spring", category: "Trousers" },
  { id: 55, brand: "Sézane",       name: "Elia Floral Midi Skirt",      price: "$145", color: "#E8C840", colorName: "Golden Yellow", season: "True Spring", category: "Skirts" },
  { id: 56, brand: "Quince",       name: "Stretch Organic Sundress",    price: "$60",  color: "#E88878", colorName: "Coral Pink",    season: "True Spring", category: "Dresses" },
  { id: 57, brand: "Zara",         name: "Knitted Cotton Cardigan",     price: "$59",  color: "#60C8D0", colorName: "Robin Egg",     season: "True Spring", category: "Knitwear" },
  { id: 58, brand: "Reformation",  name: "Nadia High Rise Trouser",     price: "$188", color: "#D4B070", colorName: "Light Camel",   season: "True Spring", category: "Trousers" },
  { id: 59, brand: "Mango",        name: "Ruffled Hem Midi Dress",      price: "$85",  color: "#E8A820", colorName: "Warm Gold",     season: "True Spring", category: "Dresses" },
  { id: 60, brand: "Madewell",     name: "Garment-Dyed Poplin Shirt",   price: "$72",  color: "#F0E0C0", colorName: "Warm Ivory",    season: "True Spring", category: "Tops" },

  // ── SOFT SPRING ──────────────────────────────────────────────
  { id: 61, brand: "Reformation",  name: "Isabeau Midi Dress",          price: "$228", color: "#E8B898", colorName: "Warm Peach",    season: "Soft Spring", category: "Dresses" },
  { id: 62, brand: "Zara",         name: "Flowy Printed Midi Skirt",    price: "$55",  color: "#F0C8B0", colorName: "Light Peach",   season: "Soft Spring", category: "Skirts" },
  { id: 63, brand: "Quince",       name: "Washable Silk Cami",          price: "$50",  color: "#F0E090", colorName: "Butter Yellow", season: "Soft Spring", category: "Tops" },
  { id: 64, brand: "Mango",        name: "Linen Blend Straight Trousers", price: "$65", color: "#A8E0C8", colorName: "Light Mint",  season: "Soft Spring", category: "Trousers" },
  { id: 65, brand: "Sézane",       name: "Margot Floral Blouse",        price: "$125", color: "#F0A898", colorName: "Soft Coral",    season: "Soft Spring", category: "Tops" },
  { id: 66, brand: "Madewell",     name: "Signature Poplin Shirtdress", price: "$128", color: "#C8A870", colorName: "Light Camel",   season: "Soft Spring", category: "Dresses" },
  { id: 67, brand: "Reformation",  name: "Harriet Knit Mini Dress",     price: "$198", color: "#D0B8D8", colorName: "Warm Lilac",    season: "Soft Spring", category: "Dresses" },
  { id: 68, brand: "Zara",         name: "Soft Touch Knit Cardigan",    price: "$55",  color: "#F0D8B0", colorName: "Champagne",     season: "Soft Spring", category: "Knitwear" },

  // ── LIGHT SPRING ─────────────────────────────────────────────
  { id: 69, brand: "Reformation",  name: "Lisbon Floral Midi Dress",    price: "$218", color: "#F0C8B0", colorName: "Light Peach",   season: "Light Spring", category: "Dresses" },
  { id: 70, brand: "Zara",         name: "Flowing Pleated Midi Skirt",  price: "$49",  color: "#F0B8B0", colorName: "Warm Blush",    season: "Light Spring", category: "Skirts" },
  { id: 71, brand: "Mango",        name: "Printed Wrap Dress",          price: "$75",  color: "#A8D8E0", colorName: "Pale Aqua",     season: "Light Spring", category: "Dresses" },
  { id: 72, brand: "Quince",       name: "European Linen Blouse",       price: "$50",  color: "#F0D8B0", colorName: "Champagne",     season: "Light Spring", category: "Tops" },
  { id: 73, brand: "Madewell",     name: "Tie-Front Midi Dress",        price: "$118", color: "#F8F0E8", colorName: "Warm White",    season: "Light Spring", category: "Dresses" },
  { id: 74, brand: "Sézane",       name: "Victoire Broderie Blouse",    price: "$135", color: "#F0C0C0", colorName: "Petal Pink",    season: "Light Spring", category: "Tops" },
  { id: 75, brand: "Zara",         name: "Linen Relaxed Blazer",        price: "$99",  color: "#E8D098", colorName: "Light Gold",    season: "Light Spring", category: "Outerwear" },
  { id: 76, brand: "Reformation",  name: "Brigitte High Rise Short",    price: "$98",  color: "#B0E0D0", colorName: "Sky Mint",      season: "Light Spring", category: "Bottoms" },

  // ── LIGHT SUMMER ─────────────────────────────────────────────
  { id: 77, brand: "Reformation",  name: "Elina Midi Dress",            price: "$238", color: "#F0C8D0", colorName: "Icy Pink",      season: "Light Summer", category: "Dresses" },
  { id: 78, brand: "Zara",         name: "Fluid Straight Trousers",     price: "$65",  color: "#D8C8E8", colorName: "Pale Lavender", season: "Light Summer", category: "Trousers" },
  { id: 79, brand: "Quince",       name: "Washable Crepe Blouse",       price: "$60",  color: "#B8D0E8", colorName: "Soft Blue",     season: "Light Summer", category: "Tops" },
  { id: 80, brand: "Mango",        name: "Flowy V-neck Midi Dress",     price: "$80",  color: "#E8C0C8", colorName: "Soft Rose",     season: "Light Summer", category: "Dresses" },
  { id: 81, brand: "Sézane",       name: "Camille Broderie Midi Skirt", price: "$155", color: "#C8C8E8", colorName: "Pale Periwinkle", season: "Light Summer", category: "Skirts" },
  { id: 82, brand: "Madewell",     name: "Lightspun Open-Back Dress",   price: "$108", color: "#C8E0F0", colorName: "Ice Blue",      season: "Light Summer", category: "Dresses" },
  { id: 83, brand: "Zara",         name: "Ribbed Knit Cardigan",        price: "$55",  color: "#D8D8E0", colorName: "Light Grey",    season: "Light Summer", category: "Knitwear" },
  { id: 84, brand: "Reformation",  name: "Basia Wide Leg Trouser",      price: "$178", color: "#C0E0D8", colorName: "Pale Mint",     season: "Light Summer", category: "Trousers" },

  // ── DEEP AUTUMN ──────────────────────────────────────────────
  { id: 85, brand: "Reformation",  name: "Helena Velvet Midi Dress",    price: "$288", color: "#6A1A1A", colorName: "Earthy Burgundy", season: "Deep Autumn", category: "Dresses" },
  { id: 86, brand: "Zara",         name: "Faux Suede Wide Leg Trousers", price: "$89", color: "#3A1A0A", colorName: "Dark Chocolate", season: "Deep Autumn", category: "Trousers" },
  { id: 87, brand: "Mango",        name: "Oversize Wool Blend Coat",    price: "$240", color: "#4A2A1A", colorName: "Coffee",         season: "Deep Autumn", category: "Outerwear" },
  { id: 88, brand: "Quince",       name: "Mongolian Cashmere Turtleneck", price: "$50", color: "#2A1A0A", colorName: "Espresso",      season: "Deep Autumn", category: "Knitwear" },
  { id: 89, brand: "Sézane",       name: "Arno Wool Cardigan",          price: "$175", color: "#8A6A0A", colorName: "Dark Gold",      season: "Deep Autumn", category: "Knitwear" },
  { id: 90, brand: "Madewell",     name: "Corduroy Straight Leg Jean",  price: "$128", color: "#3A4A1A", colorName: "Deep Olive",     season: "Deep Autumn", category: "Trousers" },
  { id: 91, brand: "Zara",         name: "Leather Effect Midi Skirt",   price: "$109", color: "#7A2A0A", colorName: "Deep Rust",      season: "Deep Autumn", category: "Skirts" },
  { id: 92, brand: "Reformation",  name: "Thea Oversized Blazer",       price: "$248", color: "#3A4A2A", colorName: "Dark Moss",      season: "Deep Autumn", category: "Outerwear" },

  // ── DEEP WINTER ──────────────────────────────────────────────
  { id: 93, brand: "Reformation",  name: "Midnight Satin Midi Dress",   price: "$268", color: "#0A1A3A", colorName: "Midnight Navy",  season: "Deep Winter", category: "Dresses" },
  { id: 94, brand: "Zara",         name: "Structured Wool Coat",        price: "#2A2A3A", colorName: "Charcoal", price: "$199", color: "#2A2A3A", season: "Deep Winter", category: "Outerwear" },
  { id: 95, brand: "Mango",        name: "Velvet Blazer",               price: "$160", color: "#3A0A5A", colorName: "Deep Plum",      season: "Deep Winter", category: "Outerwear" },
  { id: 96, brand: "Quince",       name: "Italian Cashmere V-Neck",     price: "$50",  color: "#0A1A6A", colorName: "Midnight Blue",  season: "Deep Winter", category: "Knitwear" },
  { id: 97, brand: "Sézane",       name: "Manon Velvet Midi Skirt",     price: "$165", color: "#5A0A28", colorName: "Deep Burgundy",  season: "Deep Winter", category: "Skirts" },
  { id: 98, brand: "Madewell",     name: "Skinny Flare Jean",           price: "$138", color: "#0A0A1A", colorName: "True Black",     season: "Deep Winter", category: "Trousers" },
  { id: 99, brand: "Zara",         name: "Faux Leather Straight Trousers", price: "$89", color: "#0A2A1A", colorName: "Forest Black", season: "Deep Winter", category: "Trousers" },
  { id: 100, brand: "Reformation", name: "Izzy Power Shoulder Dress",   price: "$248", color: "#8A0A5A", colorName: "Deep Fuchsia",   season: "Deep Winter", category: "Dresses" },

  // ── TRUE WINTER ──────────────────────────────────────────────
  { id: 41, brand: "Reformation",  name: "Camille Wrap Midi Dress",     price: "$268", color: "#1A1A2A", colorName: "True Black",    season: "True Winter", category: "Dresses" },
  { id: 42, brand: "Zara",         name: "Tailored Double Breast Blazer", price: "$139", color: "#7A1A3A", colorName: "Burgundy",  season: "True Winter", category: "Outerwear" },
  { id: 43, brand: "Madewell",     name: "Cali Demi-Boot Jean",         price: "$148", color: "#1A2A5A", colorName: "Deep Navy",     season: "True Winter", category: "Trousers" },
  { id: 44, brand: "Sézane",       name: "Adele Silk Blouse",           price: "$185", color: "#F8F8FF", colorName: "Pure White",    season: "True Winter", category: "Tops" },
  { id: 45, brand: "Quince",       name: "Italian Wool Turtleneck",     price: "$60",  color: "#3A3A4A", colorName: "Charcoal",      season: "True Winter", category: "Knitwear" },
  { id: 46, brand: "Zara",         name: "Faux Leather Flare Trousers", price: "$89",  color: "#1A1A2A", colorName: "True Black",    season: "True Winter", category: "Trousers" },
  { id: 47, brand: "Mango",        name: "Structured Wool Coat",        price: "$220", color: "#1A2A5A", colorName: "Deep Navy",     season: "True Winter", category: "Outerwear" },
  { id: 48, brand: "Reformation",  name: "Rosetta Satin Midi Skirt",    price: "$158", color: "#C01A2A", colorName: "True Red",      season: "True Winter", category: "Skirts" },
  { id: 49, brand: "Quince",       name: "Stretch Ponte Blazer",        price: "$90",  color: "#1A6A4A", colorName: "Emerald",       season: "True Winter", category: "Outerwear" },
  { id: 50, brand: "Madewell",     name: "Oversized Turtleneck Sweater", price: "$98", color: "#9AB8D0", colorName: "Ice Blue",     season: "True Winter", category: "Knitwear" },

  // ── BRIGHT WINTER ────────────────────────────────────────────
  { id: 101, brand: "Reformation", name: "Vesta Mini Dress",            price: "$218", color: "#D00A7A", colorName: "Vivid Fuchsia",  season: "Bright Winter", category: "Dresses" },
  { id: 102, brand: "Zara",        name: "Electric Knit Midi Dress",    price: "$79",  color: "#0A50D0", colorName: "Electric Blue",  season: "Bright Winter", category: "Dresses" },
  { id: 103, brand: "Mango",       name: "Structured Blazer",           price: "$140", color: "#0A0A1A", colorName: "True Black",     season: "Bright Winter", category: "Outerwear" },
  { id: 104, brand: "Quince",      name: "Stretch Ponte Trouser",       price: "$60",  color: "#F8F8FF", colorName: "Pure White",     season: "Bright Winter", category: "Trousers" },
  { id: 105, brand: "Sézane",      name: "Colette Silk Blouse",         price: "$175", color: "#6A0AD0", colorName: "Royal Purple",   season: "Bright Winter", category: "Tops" },
  { id: 106, brand: "Madewell",    name: "Emerald Midi Slip Skirt",     price: "$88",  color: "#0A9A5A", colorName: "Bright Emerald", season: "Bright Winter", category: "Skirts" },
  { id: 107, brand: "Zara",        name: "Faux Leather Tuxedo Blazer",  price: "$129", color: "#0A0A1A", colorName: "True Black",     season: "Bright Winter", category: "Outerwear" },
  { id: 108, brand: "Reformation", name: "Briella Knit Mini Dress",     price: "$198", color: "#E00A8A", colorName: "Hot Pink",       season: "Bright Winter", category: "Dresses" },
];

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
        height: "200px",
        background: `radial-gradient(ellipse at 60% 40%, ${product.color}18 0%, #F5F0E8 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        position: "relative",
      }}>
        <div style={{ width: "72px", height: "120px" }}>
          <ClothingIllustration color={product.color} category={product.category} />
        </div>
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: product.color,
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
        }}>Shop Now</button>
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

export default function App() {
  const [selectedSeason, setSelectedSeason] = useState("Soft Autumn");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [seasonMenuOpen, setSeasonMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const season = SEASONS[selectedSeason];
  const accent = season.accent;

  const filtered = PRODUCTS.filter(p => {
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

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", color: "#2C2418", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF7F2; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F0EBE3; }
        ::-webkit-scrollbar-thumb { background: #C8BFB0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .season-chip:hover { background: #EDE8E0 !important; }
      `}</style>

      {/* Header */}
      <header style={{
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
      <section style={{
        padding: "64px 48px 48px",
        borderBottom: "1px solid #EDE8E0",
        background: `linear-gradient(135deg, #FAF7F2 60%, ${accent}08 100%)`,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

            {/* Left: Season info */}
            <div className={mounted ? "fade-up" : ""}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "32px", height: "1px", background: accent }} />
                <span style={{ fontSize: "10px", letterSpacing: "0.25em", color: accent, textTransform: "uppercase", fontWeight: 600 }}>
                  Your colour season
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
                  <div style={{ gridColumn: "1/-1", borderTop: "1px solid #EDE8E0", paddingTop: "10px", marginTop: "4px" }}>
                    <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.12em", textTransform: "uppercase" }}>Avoid: </span>
                    <span style={{ fontSize: "10px", color: "#9A8E80" }}>{season.avoid.join(" · ")}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Season selector */}
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8AFA0", marginBottom: "14px" }}>
                Not your season? Change it
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
      <section style={{
        padding: "20px 48px",
        borderBottom: "1px solid #EDE8E0",
        display: "flex",
        gap: "32px",
        alignItems: "center",
        flexWrap: "wrap",
        background: "white",
      }}>
        <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.2em", textTransform: "uppercase", marginRight: "4px" }}>Category</span>
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
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <span style={{ fontSize: "9px", color: "#B8AFA0", letterSpacing: "0.2em", textTransform: "uppercase", marginRight: "4px" }}>Brand</span>
          {BRANDS.map(b => (
            <button key={b} onClick={() => setSelectedBrand(b)} style={{
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
            }}>{b}</button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "40px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
          <p style={{ fontSize: "11px", color: "#B8AFA0", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {filtered.length} piece{filtered.length !== 1 ? "s" : ""} in your palette
          </p>
          <p style={{ fontSize: "11px", color: "#B8AFA0", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "13px" }}>
            All products curated for {selectedSeason}
          </p>
        </div>

        {filtered.length === 0 ? (
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
          <div style={{
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
