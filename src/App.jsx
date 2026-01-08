import { useState, useMemo } from "react";
import "./index.css";
import "./App.css";

export default function App() {
  const materials = [
    {
      id: 1,
      name: "Mycelium Panels",
      desc: "Panels grown from mushroom fibers — lightweight & non-toxic.",
      price: 300,
      unit: "per sq ft",
      co2: -10,
      recycle: "100%",
      tags: ["Bio-Grown", "Fire Resistant"],
      score: 95,
      image: "https://mogu.bio/wp-content/uploads/2019/06/home_mind.jpg",

      packType: "sheet",
      packAreaSqft: 32,
      installDifficulty: "medium",
    },
    {
      id: 2,
      name: "Reclaimed Wood Panels",
      desc: "Upcycled wood from demolished structures. Strong & aesthetic.",
      price: 320,
      unit: "per sq ft",
      co2: 5,
      recycle: "95%",
      tags: ["Salvaged", "Zero Waste"],
      score: 94,
      image: "https://i.etsystatic.com/14468988/r/il/6a7541/2081529405/il_1588xN.2081529405_fa7t.jpg",
      packType: "sheet",
      packAreaSqft: 24, 
      installDifficulty: "high",
    },
    {
      id: 3,
      name: "Rammed Earth Blocks",
      desc: "Compressed earth blocks with natural texture and strength.",
      price: 65,
      unit: "per block",
      co2: 4,
      recycle: "85%",
      tags: ["Low Carbon", "Locally Sourced Soil"],
      score: 93,
      image: "https://www.structuralguide.com/wp-content/uploads/2022/11/Earth-Block.jpeg",
      packType: "block",
      // average single block face area assuming 8\" x 8\" (0.444 sqft)
      blockFaceSqft: 0.444,
      installDifficulty: "medium",
    },
    {
      id: 4,
      name: "Recycled Steel",
      desc: "High-strength steel made from recycled scrap with 70% less CO₂.",
      price: 1200,
      unit: "per ton",
      co2: 40,
      recycle: "100%",
      tags: ["High Strength", "100% Recyclable"],
      score: 87,
      image: "https://usbridge.com/wp-content/uploads/2022/02/USB-blog-Recycled-Steel-in-Construction.png",
      packType: "manual",
      installDifficulty: "high",
    },
    {
      id: 5,
      name: "Agricultural Waste Bricks",
      desc: "Eco-bricks using crop residue with lower emissions.",
      price: 40,
      unit: "per brick",
      co2: -5,
      recycle: "70%",
      tags: ["Low Energy", "Upcycled"],
      score: 82,
      image: "data:image/jpeg;base64,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",
      packType: "brick",
      brickFaceSqft: 0.75,
      installDifficulty: "low",
    },
    {
      id: 6,
      name: "Hempcrete Blocks",
      desc: "Bio-composite of hemp fibers and lime — excellent insulation and carbon negative.",
      price: 90,
      unit: "per block",
      co2: -12,
      recycle: "80%",
      tags: ["Carbon Negative", "Thermal Insulation"],
      score: 91,
      image: "https://files.ekmcdn.com/limelincs/images/hemp-blocks-500-x-200-x-250-6736-p.jpg?v=63002210-6244-4A8C-BF97-9044342D2E93",
      packType: "block",
      blockFaceSqft: 0.5,
      installDifficulty: "medium",
    },
    {
      id: 7,
      name: "Bamboo Reinforcement",
      desc: "Strong, fast-growing bamboo used as an eco-friendly alternative to steel reinforcement.",
      price: 150,
      unit: "per rod",
      co2: 8,
      recycle: "60%",
      tags: ["Rapid Renewable", "High Strength"],
      score: 89,
      image: "https://www.vivaconstructions.co.in/wp-content/uploads/2022/07/Bamboo-as-a-Reinforcement-Material-in-Building-Construction.jpg",
      packType: "manual",
      installDifficulty: "high",
    },
    {
      id: 8,
      name: "Coconut Coir Boards",
      desc: "Composite boards made from compressed coconut husks — water-resistant and durable.",
      price: 250,
      unit: "per sq ft",
      co2: 3,
      recycle: "95%",
      tags: ["Natural Fiber", "Water Resistant"],
      score: 90,
      image: "https://img500.exportersindia.com/product_images/bc-500/2023/9/830152/coir-ply-boards-1537615939-4329070.jpg",
      packType: "sheet",
      packAreaSqft: 16,
      installDifficulty: "medium",
    },
    {
      id: 9,
      name: "Fly Ash Bricks",
      desc: "Bricks made from industrial fly ash — lightweight, cheap & low-carbon.",
      price: 35,
      unit: "per brick",
      co2: -2,
      recycle: "75%",
      tags: ["Industrial Waste Reuse", "Lightweight"],
      score: 88,
      image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Fly_Ash_Bricks.jpg",
      packType: "brick",
      brickFaceSqft: 0.6,
      installDifficulty: "low",
    },
    {
      id: 10,
      name: "Recycled Glass Tiles",
      desc: "Tiles made from post-consumer glass — glossy finish with zero resource mining.",
      price: 220,
      unit: "per sq ft",
      co2: 10,
      recycle: "100%",
      tags: ["Upcycled Glass", "Durable"],
      score: 86,
      image: "https://5.imimg.com/data5/SELLER/Default/2020/12/AI/WP/LW/7139265/recycled-glass-mosaic-tiles-1000x1000.jpg",
      packType: "tile",
      tileAreaSqft: 1, // 1 sqft tile
      boxTiles: 10, // sold in boxes of 10 sqft
      installDifficulty: "medium",
    },
    {
      id: 11,
      name: "Ferrock",
      desc: "Iron-rich carbon-negative concrete alternative outperforming cement.",
      price: 400,
      unit: "per sq ft",
      co2: -15,
      recycle: "100%",
      tags: ["Carbon Negative", "Ultra Strong"],
      score: 97,
      image: "https://a3511.wordpress.com/wp-content/uploads/2018/11/ferrock.png",
      packType: "sheet",
      packAreaSqft: 10,
      installDifficulty: "high",
    },
    {
      id: 12,
      name: "Recycled Plastic Lumber",
      desc: "Weather-proof beams made from 100% recycled plastic — replaces traditional wood.",
      price: 500,
      unit: "per plank",
      co2: 12,
      recycle: "100%",
      tags: ["Upcycled", "Weather Proof"],
      score: 85,
      image: "https://neotimber.com/furniture/wp-content/uploads/sites/10/2024/03/Plastic-Lumber-For-Furniture.jpg",
      packType: "manual",
      installDifficulty: "medium",
    },
    {
      id: 13,
      name: "Compressed Straw Panels",
      desc: "High-performance insulation panels made from agricultural straw.",
      price: 180,
      unit: "per sq ft",
      co2: -8,
      recycle: "90%",
      tags: ["Thermal Insulation", "Bio-Based"],
      score: 92,
      image: "https://offsiteinnovators.com/wp-content/uploads/2025/02/image-17.png",
      packType: "sheet",
      packAreaSqft: 12,
      installDifficulty: "low",
    },
    {
      id: 14,
      name: "Low-Carbon Cement",
      desc: "Cement manufactured using alternative fuels and clinker substitutes.",
      price: 520,
      unit: "per bag",
      co2: 18,
      recycle: "50%",
      tags: ["Reduced Emissions", "High Strength"],
      score: 84,
      image: "https://carbicrete.com/wp-content/uploads/2023/02/building.jpg",
      packType: "manual",
      installDifficulty: "high",
    },
    {
      id: 15,
      name: "Recycled Rubber Flooring",
      desc: "Durable flooring made from recycled tires – great for shock absorption.",
      price: 260,
      unit: "per sq ft",
      co2: 6,
      recycle: "100%",
      tags: ["Upcycled Tires", "Shock Absorbent"],
      score: 83,
      image: "https://cdn.shopify.com/s/files/1/0843/7897/6562/files/05-06-09ecosurfaces-272x182_jpg_480x480.webp?v=1709034820",
      packType: "sheet",
      packAreaSqft: 9,
      installDifficulty: "low",
    },
  ];

  // UI state
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [co2Filter, setCO2Filter] = useState("all");

  // Project inputs
  const [lengthFt, setLengthFt] = useState(20);
  const [widthFt, setWidthFt] = useState(15);
  const [heightFt, setHeightFt] = useState(10);
  const [applyFloor, setApplyFloor] = useState(true);
  const [applyWalls, setApplyWalls] = useState(false);
  const [manualQtyById, setManualQtyById] = useState({}); 
  
  //coverage area in sq ft
  const coverageAreaSqft = useMemo(() => {
    const L = Number(lengthFt) || 0;
    const W = Number(widthFt) || 0;
    const H = Number(heightFt) || 0;
    let area = 0;
    if (applyFloor) area += L * W; 
    if (applyWalls) {
      const perimeter = 2 * (L + W);
      area += perimeter * H;
    }
    return Math.max(0, Number(area.toFixed(3)));
  }, [lengthFt, widthFt, heightFt, applyFloor, applyWalls]);

  // Basic filters
  const filteredMaterials = materials.filter((m) => {
    const text = (m.name + " " + m.tags.join(" ") + " " + m.desc).toLowerCase();
    const searchOk = searchTerm === "" || text.includes(searchTerm.toLowerCase());

    let scoreOk = true;
    if (scoreFilter === "90+") scoreOk = m.score >= 90;
    else if (scoreFilter === "80-89") scoreOk = m.score >= 80 && m.score < 90;
    else if (scoreFilter === "<80") scoreOk = m.score < 80;

    let co2Ok = true;
    if (co2Filter === "negative") co2Ok = m.co2 < 0;
    else if (co2Filter === "low") co2Ok = m.co2 >= -5 && m.co2 <= 10;
    else if (co2Filter === "high") co2Ok = m.co2 > 10;

    return searchOk && scoreOk && co2Ok;
  });

  // ---- Simulation logic ----
  function simulateQuantity(material, areaSqft) {
    const area = Number(areaSqft) || 0;
    const m = material;
    if (area <= 0) {
      return {
        assumptionNote: "No coverage area selected.",
        requiredUnits: 0,
        soldUnits: 0,
        wasteUnits: 0,
        wastePercent: 0,
        lowEstimateUnits: 0,
        highEstimateUnits: 0,
        totalPrice: 0,
        adjustedCO2: 0,
      };
    }

    if (m.packType === "sheet") {
      const packArea = m.packAreaSqft || 32;
      const pricePerSqft = m.price; 
      const requiredSqft = area;
      const soldUnits = Math.ceil(requiredSqft / packArea);
      const soldSqft = soldUnits * packArea;
      const wasteSqft = soldSqft - requiredSqft;
      const wastePercent = requiredSqft === 0 ? 0 : (wasteSqft / requiredSqft) * 100;

      const lowRequiredSqft = Math.max(0, requiredSqft * 0.95);
      const highRequiredSqft = requiredSqft * 1.15;
      const lowSoldUnits = Math.ceil(lowRequiredSqft / packArea);
      const highSoldUnits = Math.ceil(highRequiredSqft / packArea);

      const totalPrice = Math.round(pricePerSqft * soldSqft);

      const adjustedCO2 = Math.round(m.co2 * soldSqft);

      return {
        assumptionNote: `Assumes sheets of ${packArea} sq ft. Sold as whole sheets.`,
        requiredUnits: Number(requiredSqft.toFixed(3)),
        soldUnits,
        soldSqft: Number(soldSqft.toFixed(3)),
        wasteUnits: Number(wasteSqft.toFixed(3)),
        wastePercent: Number(wastePercent.toFixed(2)),
        lowEstimateUnits: lowSoldUnits,
        medEstimateUnits: soldUnits,
        highEstimateUnits: highSoldUnits,
        totalPrice,
        adjustedCO2,
      };
    } else if (m.packType === "tile") {
      const tileArea = m.tileAreaSqft || 1;
      const boxTiles = m.boxTiles || 10;
      const pricePerSqft = m.price;
      const requiredSqft = area;
      const tilesNeeded = Math.ceil(requiredSqft / tileArea);
      const boxesNeeded = Math.ceil(tilesNeeded / boxTiles);
      const soldTiles = boxesNeeded * boxTiles;
      const soldSqft = soldTiles * tileArea;
      const wasteSqft = soldSqft - requiredSqft;
      const wastePercent = (wasteSqft / requiredSqft) * 100;
      const totalPrice = Math.round(pricePerSqft * soldSqft);
      const adjustedCO2 = Math.round(m.co2 * soldSqft);

      const lowTiles = Math.ceil((requiredSqft * 0.95) / tileArea);
      const highTiles = Math.ceil((requiredSqft * 1.15) / tileArea);
      const lowBoxes = Math.ceil(lowTiles / boxTiles);
      const highBoxes = Math.ceil(highTiles / boxTiles);

      return {
        assumptionNote: `Assumes tiles ${tileArea} sq ft each, sold in boxes of ${boxTiles}.`,
        requiredUnits: tilesNeeded,
        soldUnits: soldTiles,
        soldSqft: Number(soldSqft.toFixed(3)),
        wasteUnits: soldTiles - tilesNeeded,
        wasteSqft: Number(wasteSqft.toFixed(3)),
        wastePercent: Number(wastePercent.toFixed(2)),
        lowEstimateUnits: lowBoxes,
        medEstimateUnits: boxesNeeded,
        highEstimateUnits: highBoxes,
        totalPrice,
        adjustedCO2,
      };
    } else if (m.packType === "block" || m.packType === "brick") {
      const faceArea = m.blockFaceSqft || m.brickFaceSqft || 0.5;
      const requiredUnits = Math.ceil(area / faceArea);
      const soldUnits = requiredUnits; 
      const coveredSqft = soldUnits * faceArea;
      const wasteSqft = coveredSqft - area;
      const wastePercent = (wasteSqft / area) * 100;
      const totalPrice = Math.round(m.price * soldUnits);
      const adjustedCO2 = Math.round(m.co2 * soldUnits);

      const lowUnits = Math.ceil((area * 0.95) / faceArea);
      const highUnits = Math.ceil((area * 1.15) / faceArea);

      return {
        assumptionNote: `Using unit face area ${faceArea} sq ft per block/brick.`,
        requiredUnits,
        soldUnits,
        soldSqft: Number(coveredSqft.toFixed(3)),
        wasteUnits: soldUnits - Math.ceil(area / faceArea * 1), 
        wasteSqft: Number(wasteSqft.toFixed(3)),
        wastePercent: Number(wastePercent.toFixed(2)),
        lowEstimateUnits: lowUnits,
        medEstimateUnits: requiredUnits,
        highEstimateUnits: highUnits,
        totalPrice,
        adjustedCO2,
      };
    } else {
      const assumptionNote =
        "This material requires manual quantity input (unit not directly mappable to coverage area). Enter estimated quantity below.";
      const manualQty = Number(manualQtyById[m.id] || 0);
      const totalPrice = Math.round(manualQty * m.price);
      const adjustedCO2 = Math.round(manualQty * m.co2);

      return {
        assumptionNote,
        requiredUnits: manualQty,
        soldUnits: manualQty,
        wasteUnits: 0,
        wastePercent: 0,
        lowEstimateUnits: Math.ceil(manualQty * 0.95),
        medEstimateUnits: manualQty,
        highEstimateUnits: Math.ceil(manualQty * 1.15),
        totalPrice,
        adjustedCO2,
      };
    }
  }

  const addToCart = (material) => {
    const sim = simulateQuantity(material, coverageAreaSqft);
    const needsManual =
      material.packType === "manual" && (!manualQtyById[material.id] || manualQtyById[material.id] <= 0);

    const cartItem = {
      ...material,
      sim,
      manualQty: manualQtyById[material.id] || 0,
      needsManual,
    };

    if (!cart.find((c) => c.id === material.id)) setCart([...cart, cartItem]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
  };

  function findAlternative(badMaterial) {
    if (!coverageAreaSqft || coverageAreaSqft <= 0) return null;
    const sameType = materials.filter((m) => m.packType === badMaterial.packType && m.id !== badMaterial.id);
    if (sameType.length === 0) return null;

    const evaluated = sameType.map((m) => {
      const s = simulateQuantity(m, coverageAreaSqft);
      return { mat: m, sim: s };
    });

    evaluated.sort((a, b) => {
      const wa = a.sim.wastePercent || 100;
      const wb = b.sim.wastePercent || 100;
      if (wa === wb) return b.mat.score - a.mat.score;
      return wa - wb;
    });

    return evaluated[0];
  }

  const cartTotals = useMemo(() => {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, c) => sum + (c.sim?.totalPrice || 0), 0);
    const totalCO2 = cart.reduce((sum, c) => sum + (c.sim?.adjustedCO2 || 0), 0);
    const totalWasteSqft = cart.reduce((sum, c) => sum + (c.sim?.wasteSqft || 0), 0);
    return {
      totalItems,
      totalPrice,
      totalCO2,
      totalWasteSqft: Number(totalWasteSqft.toFixed(3)),
    };
  }, [cart]);

  const fmt = (n) => (typeof n === "number" ? n.toLocaleString() : n);

  return (
    <>
      {/* HERO / Landing — FULL SCREEN */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <h1>EcoIndia</h1>
          <p>The sustainability building-material advisor with layout simulation & waste-aware quantities.</p>
          <button
            className="hero-btn"
            onClick={() =>
              document.getElementById("materials-section")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Simulation
          </button>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-wrapper">
        <div className="stats-section">
          <div className="stat-box"><h2>500+</h2><p>Sustainable Materials</p></div>
          <div className="stat-box"><h2>-40%</h2><p>Avg CO₂ Reduction</p></div>
          <div className="stat-box"><h2>10k+</h2><p>Active Users</p></div>
          <div className="stat-box"><h2>98%</h2><p>Satisfaction Rate</p></div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container" id="materials-section">
        {/* Project Inputs */}
        <section className="project-inputs card">
          <h2>Project Dimensions & Surfaces</h2>
          <p className="muted">Enter the project dimensions below. Coverage area is auto-calculated for simulation.</p>

          <div className="project-row">
            <label>Length (ft)</label>
            <input type="number" value={lengthFt} onChange={(e) => setLengthFt(e.target.value)} />
            <label>Width (ft)</label>
            <input type="number" value={widthFt} onChange={(e) => setWidthFt(e.target.value)} />
            <label>Height (ft)</label>
            <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
          </div>

          <div className="project-row">
            <label className="checkbox-label">
              <input type="checkbox" checked={applyFloor} onChange={(e) => setApplyFloor(e.target.checked)} />
              Cover Floor
            </label>

            <label className="checkbox-label">
              <input type="checkbox" checked={applyWalls} onChange={(e) => setApplyWalls(e.target.checked)} />
              Cover Walls (perimeter * height)
            </label>

            <div className="computed-area">Computed Coverage Area: <strong>{coverageAreaSqft} sq ft</strong></div>
          </div>
        </section>

        {/* Filters */}
        <section className="materials-header">
          <h2 className="section-title">Material Database & Advisor</h2>
          <p className="section-subtitle">Browse materials — simulate quantities, see waste and CO₂ impact.</p>

          <div className="filters-row">
            <input
              className="filter-input"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select className="filter-select" value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)}>
              <option value="all">Sustainability Score</option>
              <option value="90+">90 and above</option>
              <option value="80-89">80 - 89</option>
              <option value="<80">Below 80</option>
            </select>

            <select className="filter-select" value={co2Filter} onChange={(e) => setCO2Filter(e.target.value)}>
              <option value="all">Carbon Footprint</option>
              <option value="negative">Negative</option>
              <option value="low">Low (−5 to 10)</option>
              <option value="high">High (&gt;10)</option>
            </select>
          </div>
        </section>

        {/* MATERIAL CARDS */}
        <div className="materials-grid">
          {filteredMaterials.map((m) => {
            const sim = simulateQuantity(m, coverageAreaSqft);
            const alt = sim && sim.wastePercent > 12 ? findAlternative(m) : null;

            return (
              <div className="card" key={m.id}>
                <div className="card-score">{m.score}</div>
                {m.image && <img src={m.image} alt={m.name} className="card-img" />}

                <h3>{m.name}</h3>
                <p className="card-desc">{m.desc}</p>

                <div className="tag-container">
                  {m.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                <div className="card-info">
                  <span>🌿 {m.co2} kg CO₂ / unit</span>
                  <span>♻ {m.recycle}</span>
                </div>

                <div className="price">
                  ₹{m.price} <span>{m.unit}</span>
                </div>

                {/* Manual qty input for manual-pack types */}
                {m.packType === "manual" && (
                  <div className="manual-qty">
                    <label>Manual qty (units):</label>
                    <input
                      type="number"
                      min="0"
                      value={manualQtyById[m.id] || ""}
                      onChange={(e) => setManualQtyById({ ...manualQtyById, [m.id]: e.target.value })}
                      placeholder="Enter qty for this material"
                    />
                    <div className="muted small">Because this is '{m.unit}', we can't auto-calc from area.</div>
                  </div>
                )}

                {/* Simulation summary */}
                <div className="sim-summary">
                  <div className="muted small">Simulation:</div>
                  <div><strong>Assumption:</strong> {sim.assumptionNote}</div>

                  {m.packType === "sheet" || m.packType === "tile" ? (
                    <>
                      <div><strong>Required area:</strong> {coverageAreaSqft} sq ft</div>
                      <div><strong>Sold coverage:</strong> {sim.soldSqft ?? sim.soldUnits} sq ft ({sim.soldUnits} {m.packType === "sheet" ? "sheets" : "tiles/boxes"})</div>
                      <div><strong>Waste:</strong> {sim.wasteSqft ?? sim.wasteUnits} sq ft ({sim.wastePercent}%)</div>
                    </>
                  ) : m.packType === "block" || m.packType === "brick" ? (
                    <>
                      <div><strong>Units required:</strong> {sim.requiredUnits}</div>
                      <div><strong>Waste units:</strong> {sim.wasteUnits} ({sim.wastePercent}%)</div>
                    </>
                  ) : (
                    <>
                      <div><strong>Manual qty used:</strong> {sim.requiredUnits}</div>
                      <div className="muted small">If left blank, quantity will be 0 — enter an estimated qty before adding to cart.</div>
                    </>
                  )}

                  {/* Estimates */}
                  <div className="estimates">
                    <span className="pill">Low: {sim.lowEstimateUnits}</span>
                    <span className="pill">Med: {sim.medEstimateUnits ?? sim.soldUnits}</span>
                    <span className="pill">High: {sim.highEstimateUnits}</span>
                  </div>

                  {/* Warnings */}
                  {sim.wastePercent > 15 && (
                    <div className="warning">⚠️ High waste predicted ({sim.wastePercent}%). Consider alternate materials or a different pack size.</div>
                  )}

                  {m.installDifficulty === "high" && <div className="muted small">Install difficulty: High — requires skilled labor.</div>}

                  {/* Alternative suggestion */}
                  {alt && (
                    <div className="alt-suggestion">
                      <div className="muted small">Suggested alternative to reduce waste:</div>
                      <div className="alt-card">
                        <div><strong>{alt.mat.name}</strong> — score {alt.mat.score}</div>
                        <div className="muted small">{alt.sim.assumptionNote}</div>
                        <div className="muted small">Predicted waste: {alt.sim.wastePercent}%</div>
                        <button className="tiny-btn" onClick={() => {
                          if (cart.find(c => c.id === m.id)) removeFromCart(m.id);
                          addToCart(alt.mat);
                        }}>Try Alternative</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add / Remove */}
                {cart.find((c) => c.id === m.id) ? (
                  <button className="remove-btn" onClick={() => removeFromCart(m.id)}>
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => addToCart(m)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* CART */}
        <section className="cart">
          <h2>Your Cart</h2>
          <hr />

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <div style={{flex: 1}}>
                <div style={{display: "flex", justifyContent: "space-between", gap: 12}}>
                  <strong>{item.name}</strong>
                  {item.needsManual && <span className="badge">Needs qty</span>}
                </div>
                <div className="muted small">{item.sim.assumptionNote}</div>
                <div className="muted small">Qty: {fmt(item.sim.soldUnits)} {item.packType === "sheet" ? "packs" : item.unit}</div>
                <div className="muted small">Waste: {fmt(item.sim.wasteUnits ?? item.sim.wasteSqft)} {item.packType === "sheet" ? "sqft" : ""} ({item.sim.wastePercent}%)</div>
                <div className="muted small">Adjusted CO₂: {fmt(item.sim.adjustedCO2)} kg</div>
              </div>
              <div style={{textAlign: "right"}}>
                <div>₹{item.sim.totalPrice}</div>
                <div className="muted small">Unit: {item.unit}</div>
                <button className="remove-btn small" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <hr />
              <p><strong>Total Items:</strong> {cartTotals.totalItems}</p>
              <p><strong>Total Price:</strong> ₹{cartTotals.totalPrice}</p>
              <p><strong>Total CO₂ Impact:</strong> {cartTotals.totalCO2} kg</p>
              <p className="muted small">Total predicted waste (sq ft): {cartTotals.totalWasteSqft}</p>

              <button className="checkout-btn">Proceed to Checkout</button>
            </>
          )}
        </section>
      </div>
    </>
  );
}
