export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  category: 'Audio' | 'Gear' | 'Computing' | 'Wearables';
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: { name: string; hex: string }[];
  specs: { name: string; value: string }[];
  featured: boolean;
  trending: boolean;
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "h900-anc",
    name: "Aura H900 Studio Pro",
    tagline: "High-Fidelity Active Noise Cancelling Headphones",
    description: "Lossless acoustics meets hybrid noise-cancellation in a beautifully sculpted leather design.",
    longDescription: "Engineered for acoustic purity, the Aura H900 Studio Pro delivers true lossless audio reproduction alongside state-of-the-art active noise cancelling technology. With custom 40mm beryllium drivers, handcrafted memory foam ear cups, and up to 48 hours of battery life, it sets a new standard for luxury audio listening.",
    price: 399,
    category: "Audio",
    rating: 4.9,
    reviewsCount: 124,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#0f0f10" },
      { name: "Space Grey", hex: "#4b5563" },
      { name: "Polar White", hex: "#f4f4f5" }
    ],
    specs: [
      { name: "Driver Size", value: "40mm Beryllium Dynamic Drivers" },
      { name: "Frequency Response", value: "5Hz - 40,000Hz" },
      { name: "Battery Life", value: "Up to 48 Hours (ANC On)" },
      { name: "Connectivity", value: "Bluetooth 5.3 & 3.5mm Gold-Plated Jack" }
    ],
    featured: true,
    trending: true,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: "kb-neon",
    name: "Neon 75 Mechanical",
    tagline: "Hot-Swappable RGB Mechanical Keyboard",
    description: "Compact 75% layout keyboard featuring custom linear switches and acrylic frosted chassis.",
    longDescription: "The Neon 75 mechanical keyboard is a tactile masterpiece. Utilizing hot-swappable sockets, pre-lubed linear violet switches, and a solid frosted acrylic casing, the RGB backlighting diffuses evenly for a mesmerizing layout. Designed for developers, writers, and gamers who demand fluid feedback.",
    price: 189,
    category: "Gear",
    rating: 4.8,
    reviewsCount: 86,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Midnight Frost", hex: "#1e1e2f" },
      { name: "Neon Acid", hex: "#a855f7" }
    ],
    specs: [
      { name: "Form Factor", value: "75% ANSI Layout" },
      { name: "Switches", value: "Pre-lubed Aura Violet Linear (45g)" },
      { name: "Keycaps", value: "Double-shot PBT Cherry Profile" },
      { name: "Mounting Style", value: "Gasket Mount with Poron Foam" }
    ],
    featured: true,
    trending: false,
    inStock: true,
    badge: "Limited Run"
  },
  {
    id: "zen-desk",
    name: "Zenith Minimal Desk",
    tagline: "Solid Walnut Floating Desk System",
    description: "Crafted from ethically sourced American Walnut, integrating hidden cable routing.",
    longDescription: "Bring tranquility to your workspace. The Zenith Floating Desk features chamfered edges, a hidden magnetic cable tray beneath, and a durable eco-matte finish that resists water and scratches. Easy to assemble, elegant in form.",
    price: 649,
    category: "Gear",
    rating: 4.7,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Natural Walnut", hex: "#5c4033" },
      { name: "Charcoal Ash", hex: "#2b2b2b" }
    ],
    specs: [
      { name: "Dimensions", value: "140cm x 70cm x 75cm" },
      { name: "Material", value: "FSC Certified American Walnut Wood" },
      { name: "Weight Support", value: "Supports up to 120kg" },
      { name: "Cable Management", value: "Built-in under-desk magnetic channel" }
    ],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: "aura-ring-1",
    name: "Aura Ring Slate",
    tagline: "Ultra-Lightweight Biometric Smart Ring",
    description: "Titanium alloy ring tracking heart rate, sleep quality, and physical recovery markers.",
    longDescription: "A quantum leap in wearable tech. Aura Ring Slate packs complex pulse oximeters, temperature sensors, and accelerometers into a seamless 2.4-gram titanium band. Water resistant up to 100 meters, with no screen to distract you.",
    price: 299,
    category: "Wearables",
    rating: 4.6,
    reviewsCount: 201,
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stealth Titanium", hex: "#1f2937" },
      { name: "Carbon Gold", hex: "#d97706" },
      { name: "Brushed Chrome", hex: "#9ca3af" }
    ],
    specs: [
      { name: "Weight", value: "2.4 grams to 3.0 grams" },
      { name: "Sensors", value: "Infrared Photoplethysmography, Skin Temp, 3D Accelerometer" },
      { name: "Battery Life", value: "Up to 7 Days on a single charge" },
      { name: "Waterproof", value: "IP68 & 100M Depth Rating" }
    ],
    featured: true,
    trending: true,
    inStock: true,
    badge: "New Release"
  },
  {
    id: "pro-comp-1",
    name: "Aura Obsidian Book Pro",
    tagline: "M4 Ultra Liquid-Cooled Laptop",
    description: "16-inch workspace powered by dual vapor chamber cooling and a 120Hz micro-OLED panel.",
    longDescription: "Forged from aerospace-grade aluminum, the Obsidian Book Pro represents computing power without compromises. Featuring custom liquid-filled vapor chambers, the performance remains high even under maximum load. The 16:10 aspect ratio micro-OLED display is professionally calibrated for color accuracy.",
    price: 1899,
    category: "Computing",
    rating: 4.95,
    reviewsCount: 38,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Obsidian", hex: "#111827" },
      { name: "Liquid Titanium", hex: "#6b7280" }
    ],
    specs: [
      { name: "Processor", value: "Aura Core-X 12-Core System" },
      { name: "Memory", value: "32GB Unified LPDDR5X" },
      { name: "Storage", value: "1TB PCIe Gen 5 NVMe SSD" },
      { name: "Display", value: "16\" Micro-OLED, 3456 x 2160, 120Hz" }
    ],
    featured: true,
    trending: true,
    inStock: true,
    badge: "Ultimate Performance"
  },
  {
    id: "sound-pulse",
    name: "Pulse Portable Speaker",
    tagline: "360° Omnidirectional Sound Tube",
    description: "A compact cylinder offering room-filling spatial sound, wrapped in textured fabric.",
    longDescription: "Don't let the compact dimensions fool you. The Pulse Portable Speaker leverages acoustic reflectors and passive radiators to direct sound in all directions. Completely waterproof and equipped with magnetic contact charging, it's the ideal travel acoustic companion.",
    price: 129,
    category: "Audio",
    rating: 4.5,
    reviewsCount: 153,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Midnight Mesh", hex: "#1f2937" },
      { name: "Alpine Sand", hex: "#d1d5db" }
    ],
    specs: [
      { name: "Sound Output", value: "30W Room-Filling Audio" },
      { name: "Battery Life", value: "Up to 24 Hours continuous play" },
      { name: "Waterproof Rating", value: "IP67 Dust and Water Resistant" },
      { name: "Dual Link", value: "Pair two speakers for stereo mode" }
    ],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: "mouse-glider",
    name: "Glider Pro Mouse",
    tagline: "Ergonomic Ultra-Lightweight Wireless Mouse",
    description: "Precision tracking at 26,000 DPI in an ultra-aerated 52g lightweight shell.",
    longDescription: "Constructed for competitive speeds and ergonomic posture, the Glider Pro Mouse features optical switches rated for 90 million clicks, low-friction virgin PTFE feet, and zero-latency wireless connectivity. Charges to full in 30 minutes.",
    price: 99,
    category: "Gear",
    rating: 4.8,
    reviewsCount: 74,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625842268584-8f329044700c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Carbon Black", hex: "#171717" },
      { name: "Ice White", hex: "#fafafa" }
    ],
    specs: [
      { name: "Sensor", value: "Aura Optical Tracker (26K DPI)" },
      { name: "Weight", value: "52 grams" },
      { name: "Battery", value: "Up to 90 Hours (USB-C Fast Charging)" },
      { name: "Switch Type", value: "90M Click Optical Gen-3" }
    ],
    featured: false,
    trending: true,
    inStock: true
  },
  {
    id: "e-ink-mon",
    name: "Iris E-Ink Companion",
    tagline: "Second-Screen E-Ink Paper Monitor",
    description: "13.3-inch glare-free paper screen designed for long code sessions and text editing.",
    longDescription: "Say goodbye to eye strain. The Iris monitor is an e-ink display designed to connect as a vertical or horizontal secondary monitor. Reflects ambient light like real paper, preventing blue light headaches during intense reading and writing marathons.",
    price: 450,
    category: "Computing",
    rating: 4.7,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Eink Black", hex: "#121214" }
    ],
    specs: [
      { name: "Display Panel", value: "13.3\" E-Ink Carta Display" },
      { name: "Resolution", value: "2200 x 1650 (207 PPI)" },
      { name: "Refresh Rate", value: "Ultra-Fast Regal Refresh Mode (Aura-Engine)" },
      { name: "Inputs", value: "USB-C DisplayPort & Mini HDMI" }
    ],
    featured: false,
    trending: true,
    inStock: false,
    badge: "Out of Stock"
  },
  {
    id: "capsule-pods",
    name: "Aura Capsule Buds",
    tagline: "Sleek Slide-Open Wireless Buds",
    description: "Premium wireless audio housed inside a cylindrical metal rotating charging dock.",
    longDescription: "Precision-milled from a single block of anodized aluminum, the Capsule Buds charging case rotates smoothly on steel bearings. Custom dynamic drivers and passive noise isolates provide rich, crisp high-end and deep, controlled bass frequencies.",
    price: 149,
    category: "Audio",
    rating: 4.6,
    reviewsCount: 95,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Titanium Silver", hex: "#b4b4b4" },
      { name: "Gold Dust", hex: "#d97706" }
    ],
    specs: [
      { name: "Case Material", value: "CNC Milled Aluminum" },
      { name: "Battery Life", value: "6 Hours (30 Hours total with Case)" },
      { name: "Codecs Supported", value: "LDAC, AAC, SBC" },
      { name: "IP Rating", value: "IPX4 Sweat Resistance" }
    ],
    featured: false,
    trending: false,
    inStock: true
  },
  {
    id: "chronos-watch",
    name: "Chronos Smart Chronograph",
    tagline: "Mechanical Hybrid Smartwatch",
    description: "Real physical clock hands resting over a circular AMOLED pixel-dense screen.",
    longDescription: "The absolute merging of classic luxury watchmaking and high technology. The Chronos features genuine Swiss mechanical hands layered above a high-resolution color touchscreen. Tracks steps, alerts, oxygen levels, and look gorgeous for any black-tie event.",
    price: 499,
    category: "Wearables",
    rating: 4.8,
    reviewsCount: 67,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Classic Steel", hex: "#e5e7eb" },
      { name: "Onyx Gold", hex: "#854d0e" }
    ],
    specs: [
      { name: "Watch Face", value: "Sapphire Crystal Lens, physical Swiss Hands" },
      { name: "Display", value: "1.2\" AMOLED Ambient Panel" },
      { name: "Waterproof", value: "5 ATM (50 Meters)" },
      { name: "Sensors", value: "Continuous PPG heart-rate, SPO2 tracker, Barometer" }
    ],
    featured: true,
    trending: false,
    inStock: true,
    badge: "Trending"
  }
];
