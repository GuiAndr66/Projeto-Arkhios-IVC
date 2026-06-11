// ===== DATA =====

// Função debounce para evitar sobrecarga em eventos como resize
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const bairros = [
  {
    id: "pimentas",
    nome: "Pimentas",
    score: 8.7,
    risco: "high",
    desc: "Bairro com historico critico de alagamentos, alta densidade populacional e pressao urbana intensa na porcao sudeste de Guarulhos.",
    pop: "142.000",
    area: "18 km2",
    coords: { x: 640, y: 746 },
    indicators: { alagamento: 8.8, calor: 7.6, territorio: 8.4, ocorrencias: 8.1 }
  },
  {
    id: "cumbica",
    nome: "Cumbica",
    score: 7.9,
    risco: "high",
    desc: "Regiao industrial e aeroportuaria com ilhas de calor, solo impermeavel e grande fluxo logistico.",
    pop: "98.000",
    area: "32 km2",
    coords: { x: 465, y: 736 },
    indicators: { alagamento: 7.4, calor: 8.5, territorio: 7.1, ocorrencias: 7.7 }
  },
  {
    id: "vila-galvao",
    nome: "Vila Galvao",
    score: 7.4,
    risco: "high",
    desc: "Area urbanizada no extremo oeste, com alta ocupacao, pouca cobertura vegetal e vulnerabilidade a calor extremo.",
    pop: "87.000",
    area: "12 km2",
    coords: { x: 112, y: 748 },
    indicators: { alagamento: 6.8, calor: 8.3, territorio: 7.1, ocorrencias: 6.9 }
  },
  {
    id: "guarulhos-centro",
    nome: "Centro",
    score: 7.1,
    risco: "high",
    desc: "Centro historico com infraestrutura antiga, solo bastante impermeabilizado e historico de pontos de alagamento.",
    pop: "65.000",
    area: "8 km2",
    coords: { x: 195, y: 802 },
    indicators: { alagamento: 7.6, calor: 7.8, territorio: 6.4, ocorrencias: 6.7 }
  },
  {
    id: "fortaleza",
    nome: "Jardim Fortaleza",
    score: 7.0,
    risco: "high",
    desc: "Area periferica com ocupacoes sensiveis, infraestrutura incompleta e risco territorial elevado.",
    pop: "54.000",
    area: "9 km2",
    coords: { x: 317, y: 779 },
    indicators: { alagamento: 7.1, calor: 6.6, territorio: 7.9, ocorrencias: 6.5 }
  },
  {
    id: "sao-joao",
    nome: "Sao Joao",
    score: 6.9,
    risco: "med",
    desc: "Regiao em crescimento urbano, com pontos de alagamento recorrentes e pressao sobre drenagem local.",
    pop: "72.000",
    area: "11 km2",
    coords: { x: 518, y: 607 },
    indicators: { alagamento: 7.2, calor: 6.3, territorio: 6.8, ocorrencias: 6.5 }
  },
  {
    id: "macedo",
    nome: "Macedo",
    score: 6.7,
    risco: "med",
    desc: "Bairro consolidado com risco moderado, boa centralidade urbana e cobertura vegetal em queda.",
    pop: "61.000",
    area: "10 km2",
    coords: { x: 272, y: 790 },
    indicators: { alagamento: 6.5, calor: 7.1, territorio: 6.2, ocorrencias: 6.3 }
  },
  {
    id: "cocaia",
    nome: "Cocaia",
    score: 6.5,
    risco: "med",
    desc: "Area com topografia irregular, encostas urbanizadas e sensibilidade a chuvas intensas.",
    pop: "43.000",
    area: "14 km2",
    coords: { x: 236, y: 684 },
    indicators: { alagamento: 6.1, calor: 5.8, territorio: 7.4, ocorrencias: 6.7 }
  },
  {
    id: "santo-antonio",
    nome: "Santo Antonio",
    score: 6.2,
    risco: "med",
    desc: "Area urbana proxima ao eixo central, com risco moderado por escoamento superficial e alta impermeabilizacao.",
    pop: "58.000",
    area: "13 km2",
    coords: { x: 252, y: 742 },
    indicators: { alagamento: 6.8, calor: 6.4, territorio: 5.7, ocorrencias: 5.9 }
  },
  {
    id: "gopoura",
    nome: "Gopouva",
    score: 5.9,
    risco: "med",
    desc: "Bairro de ocupacao mista, com melhorias em infraestrutura, mas ainda exposto a calor urbano.",
    pop: "39.000",
    area: "16 km2",
    coords: { x: 156, y: 793 },
    indicators: { alagamento: 5.5, calor: 6.8, territorio: 5.6, ocorrencias: 5.7 }
  },
  {
    id: "bananal",
    nome: "Bananal",
    score: 5.7,
    risco: "med",
    desc: "Regiao extensa ao norte, com trechos verdes e vulnerabilidade pontual em vias de acesso e encostas.",
    pop: "31.000",
    area: "22 km2",
    coords: { x: 440, y: 512 },
    indicators: { alagamento: 5.3, calor: 4.7, territorio: 6.6, ocorrencias: 5.8 }
  },
  {
    id: "taboao",
    nome: "Taboao",
    score: 5.5,
    risco: "med",
    desc: "Bairro em processo de qualificacao urbana, com risco moderado em drenagem e mobilidade.",
    pop: "47.000",
    area: "7 km2",
    coords: { x: 318, y: 624 },
    indicators: { alagamento: 5.9, calor: 5.6, territorio: 5.2, ocorrencias: 5.3 }
  },
  {
    id: "portal-da-granja",
    nome: "Portal da Granja",
    score: 5.3,
    risco: "med",
    desc: "Zona residencial com vulnerabilidade concentrada nas vias de acesso durante chuvas fortes.",
    pop: "28.000",
    area: "19 km2",
    coords: { x: 735, y: 604 },
    indicators: { alagamento: 5.7, calor: 5.1, territorio: 5.0, ocorrencias: 5.2 }
  },
  {
    id: "sadokim",
    nome: "Sadokim",
    score: 5.1,
    risco: "med",
    desc: "Area no distrito de Jardim Presidente Dutra com uso misto e necessidade de monitoramento de drenagem.",
    pop: "35.000",
    area: "11 km2",
    coords: { x: 786, y: 552 },
    indicators: { alagamento: 5.2, calor: 5.4, territorio: 5.1, ocorrencias: 4.7 }
  },
  {
    id: "nogueirao",
    nome: "Nogueirao",
    score: 4.9,
    risco: "med",
    desc: "Regiao de expansao urbana com risco intermediario e maior dependencia de planejamento territorial.",
    pop: "29.000",
    area: "18 km2",
    coords: { x: 690, y: 392 },
    indicators: { alagamento: 4.5, calor: 4.9, territorio: 5.8, ocorrencias: 4.4 }
  },
  {
    id: "torres-tibagy",
    nome: "Torres Tibagy",
    score: 4.7,
    risco: "med",
    desc: "Area oeste com trechos de menor densidade e riscos moderados associados a relevo e drenagem.",
    pop: "22.000",
    area: "25 km2",
    coords: { x: 123, y: 768 },
    indicators: { alagamento: 4.9, calor: 4.6, territorio: 5.1, ocorrencias: 4.2 }
  },
  {
    id: "sao-miguel",
    nome: "Sao Miguel",
    score: 4.5,
    risco: "med",
    desc: "Bairro com infraestrutura relativamente adequada, mas ainda sensivel a eventos de chuva extrema.",
    pop: "41.000",
    area: "9 km2",
    coords: { x: 350, y: 805 },
    indicators: { alagamento: 4.8, calor: 4.7, territorio: 4.2, ocorrencias: 4.3 }
  },
  {
    id: "ponte-grande",
    nome: "Ponte Grande",
    score: 3.8,
    risco: "low",
    desc: "Area tradicional na porcao sudoeste, com baixo historico recente de eventos climaticos adversos.",
    pop: "38.000",
    area: "12 km2",
    coords: { x: 132, y: 884 },
    indicators: { alagamento: 3.9, calor: 3.8, territorio: 3.5, ocorrencias: 3.1 }
  },
  {
    id: "agua-chata",
    nome: "Agua Chata",
    score: 3.5,
    risco: "low",
    desc: "Setor sudeste com topografia favoravel em parte do territorio e risco geral mais baixo.",
    pop: "25.000",
    area: "20 km2",
    coords: { x: 730, y: 688 },
    indicators: { alagamento: 3.6, calor: 3.7, territorio: 3.4, ocorrencias: 3.0 }
  },
  {
    id: "cambui",
    nome: "Cambui",
    score: 3.2,
    risco: "low",
    desc: "Regiao com baixa densidade relativa, maior presenca de vegetacao e boa capacidade de absorcao hidrica.",
    pop: "18.000",
    area: "28 km2",
    coords: { x: 620, y: 360 },
    indicators: { alagamento: 3.1, calor: 3.4, territorio: 3.3, ocorrencias: 2.8 }
  },
  {
    id: "lavras",
    nome: "Lavras",
    score: 3.0,
    risco: "low",
    desc: "Area predominantemente verde, com baixa incidencia historica de eventos climaticos extremos.",
    pop: "12.000",
    area: "35 km2",
    coords: { x: 570, y: 596 },
    indicators: { alagamento: 2.9, calor: 3.1, territorio: 3.4, ocorrencias: 2.5 }
  },
  {
    id: "aeroporto",
    nome: "Aeroporto",
    score: 2.8,
    risco: "low",
    desc: "Area com gestao especial de infraestrutura e baixo indice de vulnerabilidade direta para populacao residente.",
    pop: "8.000",
    area: "42 km2",
    coords: { x: 430, y: 646 },
    indicators: { alagamento: 2.7, calor: 3.2, territorio: 2.6, ocorrencias: 2.4 }
  }
];

const riskConfig = {
  low: { label: "Baixo risco", short: "Baixo", css: "low", colorVar: "var(--success)" },
  med: { label: "Medio risco", short: "Medio", css: "med", colorVar: "var(--warning)" },
  high: { label: "Alto risco", short: "Alto", css: "high", colorVar: "var(--danger)" }
};

const districtZones = [
  {
    className: "map-zone map-zone-main",
    d: "M66 642 L91 558 L137 506 L139 421 L235 354 L337 326 L382 384 L524 359 L566 272 L657 160 L704 86 L804 38 L865 182 L845 314 L913 391 L826 428 L759 519 L702 592 L618 599 L541 641 L462 674 L385 726 L303 773 L246 843 L175 902 L106 959 L75 893 L88 803 Z"
  },
  {
    className: "map-zone map-zone-dutra",
    d: "M358 714 L462 671 L544 640 L619 596 L702 591 L758 516 L829 428 L911 389 L895 536 L813 570 L838 669 L743 704 L782 813 L675 855 L575 802 L452 810 L363 770 Z"
  }
];

let currentFilter = "all";
let selectedBairroId = null;
let dashboardBuilt = false;

function byId(id) {
  return document.getElementById(id);
}

function getRiskColor(risco) {
  return riskConfig[risco]?.colorVar || riskConfig.low.colorVar;
}

function getRiskLabel(risco) {
  return riskConfig[risco]?.label || riskConfig.low.label;
}

function getBadgeClass(risco) {
  return `tooltip-${riskConfig[risco]?.css || "low"}`;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getVisibleBairros() {
  const input = byId("search-bairros");
  const query = normalizeText(input?.value || "");
  return bairros.filter((bairro) => {
    const matchQuery = normalizeText(bairro.nome).includes(query);
    const matchFilter = currentFilter === "all" || bairro.risco === currentFilter;
    return matchQuery && matchFilter;
  });
}

function buildSidebar(list = getVisibleBairros()) {
  const container = byId("bairro-list");
  if (!container) return;

  container.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "bairro-item";
    empty.textContent = "Nenhum bairro encontrado.";
    container.appendChild(empty);
    updateMapVisibility([]);
    return;
  }

  list.forEach((bairro) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "bairro-item";
    item.dataset.id = bairro.id;
    item.innerHTML = `
      <span class="risk-dot risk-${riskConfig[bairro.risco].css}" aria-hidden="true"></span>
      <span class="bairro-info">
        <span class="bairro-name">${bairro.nome}</span>
        <span class="bairro-status">${getRiskLabel(bairro.risco)}</span>
      </span>
      <span class="bairro-score" style="color:${getRiskColor(bairro.risco)}">${bairro.score.toFixed(1)}</span>
    `;
    item.addEventListener("click", () => openBairro(bairro.id));
    item.addEventListener("mouseenter", () => highlightSvg(bairro.id));
    item.addEventListener("mouseleave", () => unhighlightSvg(bairro.id));
    item.addEventListener("focus", () => highlightSvg(bairro.id));
    item.addEventListener("blur", () => unhighlightSvg(bairro.id));
    container.appendChild(item);
  });

  updateMapVisibility(list.map((bairro) => bairro.id));
}

function buildDistrictOverlay() {
  const overlay = byId("map-district-overlay");
  if (!overlay || overlay.dataset.ready === "true") return;

  districtZones.forEach((zone) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", zone.className);
    path.setAttribute("d", zone.d);
    overlay.appendChild(path);
  });

  overlay.dataset.ready = "true";
}

function buildMap() {
  const group = byId("svg-bairros");
  if (!group) return;

  buildDistrictOverlay();
  group.innerHTML = "";

  bairros.forEach((bairro) => {
    const markerSize = bairro.risco === "high" ? 34 : bairro.risco === "med" ? 29 : 25;
    const groupEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupEl.setAttribute("class", "bairro-svg-group");
    groupEl.setAttribute("data-id", bairro.id);
    groupEl.setAttribute("role", "button");
    groupEl.setAttribute("tabindex", "0");
    groupEl.setAttribute("aria-label", `${bairro.nome}, ${getRiskLabel(bairro.risco)}, score ${bairro.score.toFixed(1)}`);
    groupEl.style.color = getRiskColor(bairro.risco);

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${bairro.nome}: ${getRiskLabel(bairro.risco)} (${bairro.score.toFixed(1)})`;

    const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hit.setAttribute("class", "bairro-hit-area");
    hit.setAttribute("cx", bairro.coords.x);
    hit.setAttribute("cy", bairro.coords.y);
    hit.setAttribute("r", markerSize + 20);

    const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    halo.setAttribute("class", "bairro-marker-halo");
    halo.setAttribute("cx", bairro.coords.x);
    halo.setAttribute("cy", bairro.coords.y);
    halo.setAttribute("r", markerSize + 16);

    const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    marker.setAttribute("class", "bairro-marker");
    marker.setAttribute("cx", bairro.coords.x);
    marker.setAttribute("cy", bairro.coords.y);
    marker.setAttribute("r", markerSize);

    const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    core.setAttribute("class", "bairro-marker-core");
    core.setAttribute("cx", bairro.coords.x);
    core.setAttribute("cy", bairro.coords.y);
    core.setAttribute("r", Math.max(markerSize - 13, 9));

    const score = document.createElementNS("http://www.w3.org/2000/svg", "text");
    score.setAttribute("class", "bairro-marker-score");
    score.setAttribute("x", bairro.coords.x);
    score.setAttribute("y", bairro.coords.y + 1);
    score.textContent = Math.round(bairro.score);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "bairro-marker-label");
    label.setAttribute("x", bairro.coords.x);
    label.setAttribute("y", bairro.coords.y + markerSize + 28);
    label.textContent = bairro.nome.length > 12 ? bairro.nome.split(" ")[0] : bairro.nome;

    groupEl.append(title, hit, halo, marker, core, score, label);
    groupEl.addEventListener("mouseenter", (event) => {
      highlightSvg(bairro.id);
      showTooltip(bairro, event);
    });
    groupEl.addEventListener("mousemove", moveTooltip);
    groupEl.addEventListener("mouseleave", () => {
      unhighlightSvg(bairro.id);
      hideTooltip();
    });
    groupEl.addEventListener("focus", (event) => {
      highlightSvg(bairro.id);
      showTooltip(bairro, event);
    });
    groupEl.addEventListener("blur", () => {
      unhighlightSvg(bairro.id);
      hideTooltip();
    });
    groupEl.addEventListener("click", () => openBairro(bairro.id));
    groupEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openBairro(bairro.id);
      }
    });

    group.appendChild(groupEl);
  });

  updateMapVisibility(getVisibleBairros().map((bairro) => bairro.id));
}

function updateMapVisibility(visibleIds) {
  const visible = new Set(visibleIds);
  document.querySelectorAll(".bairro-svg-group").forEach((groupEl) => {
    const isVisible = visible.has(groupEl.dataset.id);
    groupEl.classList.toggle("is-dimmed", !isVisible);
    groupEl.setAttribute("aria-hidden", String(!isVisible));
  });
}

function showTooltip(bairro, event) {
  const tooltip = byId("map-tooltip");
  if (!tooltip) return;

  byId("tt-name").textContent = bairro.nome;
  byId("tt-score").textContent = `Score IVC: ${bairro.score.toFixed(1)}`;
  const badge = byId("tt-badge");
  badge.textContent = getRiskLabel(bairro.risco);
  badge.className = `tooltip-badge ${getBadgeClass(bairro.risco)}`;
  tooltip.classList.add("show");
  moveTooltip(event);
}

function moveTooltip(event) {
  const container = byId("map-container");
  const tooltip = byId("map-tooltip");
  if (!container || !tooltip || !event) return;

  const rect = container.getBoundingClientRect();
  const source = event.touches?.[0] || event;
  let x = source.clientX ? source.clientX - rect.left + 14 : rect.width / 2;
  let y = source.clientY ? source.clientY - rect.top - 12 : rect.height / 2;

  if (x + 220 > rect.width) x -= 230;
  if (y + 120 > rect.height) y -= 116;
  x = Math.max(12, x);
  y = Math.max(12, y);

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  byId("map-tooltip")?.classList.remove("show");
}

function highlightSvg(id) {
  document.querySelector(`.bairro-svg-group[data-id="${id}"]`)?.classList.add("is-highlighted");
  document.querySelector(`.bairro-item[data-id="${id}"]`)?.classList.add("highlighted");
}

function unhighlightSvg(id) {
  document.querySelector(`.bairro-svg-group[data-id="${id}"]`)?.classList.remove("is-highlighted");
  document.querySelector(`.bairro-item[data-id="${id}"]`)?.classList.remove("highlighted");
}

function filterBairros() {
  buildSidebar(getVisibleBairros());
}

function setFilter(filter, button) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
  button?.classList.add("active");
  filterBairros();
}

function riskClassFromValue(value) {
  if (value >= 7) return "high";
  if (value >= 4) return "med";
  return "low";
}

function openBairro(id) {
  const bairro = bairros.find((item) => item.id === id);
  if (!bairro) return;

  selectedBairroId = id;
  document.querySelectorAll(".bairro-svg-group").forEach((el) => el.classList.remove("is-selected"));
  document.querySelector(`.bairro-svg-group[data-id="${id}"]`)?.classList.add("is-selected");

  const scoreDisplay = byId("bairro-score-display");
  scoreDisplay.textContent = bairro.score.toFixed(1);
  scoreDisplay.className = `bairro-score-big score-${bairro.risco}`;

  const badge = byId("bairro-badge-display");
  badge.textContent = getRiskLabel(bairro.risco);
  badge.className = `badge-pill badge-${bairro.risco}`;

  byId("bairro-name-display").textContent = bairro.nome;
  byId("bairro-desc-display").textContent = bairro.desc;

  const indicators = [
    { name: "Alagamento", icon: "Ondas", value: bairro.indicators.alagamento, desc: "Historico de enchentes, cotas baixas e capacidade de drenagem local." },
    { name: "Calor extremo", icon: "Calor", value: bairro.indicators.calor, desc: "Temperatura superficial, densidade construtiva e cobertura vegetal." },
    { name: "Vulnerabilidade territorial", icon: "Territorio", value: bairro.indicators.territorio, desc: "Ocupacao do solo, saneamento, encostas e infraestrutura urbana." },
    { name: "Ocorrencias climaticas", icon: "Eventos", value: bairro.indicators.ocorrencias, desc: "Registros de chuva intensa, queda de arvores, calor e transtornos associados." }
  ];

  byId("bairro-indicators").innerHTML = indicators
    .map((indicator) => {
      const risk = riskClassFromValue(indicator.value);
      const color = getRiskColor(risk);
      const pct = Math.round((indicator.value / 10) * 100);
      return `
        <div class="indicator-bar">
          <div class="indicator-label">
            <span class="indicator-name">${indicator.icon}: ${indicator.name}</span>
            <span class="indicator-val" style="color:${color}">${indicator.value.toFixed(1)}</span>
          </div>
          <div class="progress-track"><div class="progress-fill progress-${risk}" style="width:${pct}%"></div></div>
          <div class="indicator-desc">${indicator.desc}</div>
        </div>
      `;
    })
    .join("");

  const events = buildEventsForBairro(bairro);
  byId("bairro-historico").innerHTML = events
    .map((event) => `
      <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
        <div style="font-size:12px;color:var(--text-muted);min-width:72px">${event.date}</div>
        <div style="flex:1;font-size:14px;font-weight:650">${event.type}</div>
        <div style="font-size:12px;padding:2px 8px;border-radius:999px;background:var(--surface-2);color:var(--text-muted)">${event.level}</div>
      </div>
    `)
    .join("");

  byId("bairro-dados").innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:12px"><span>Populacao estimada</span><strong style="color:var(--text)">${bairro.pop}</strong></div>
    <div style="display:flex;justify-content:space-between;gap:12px"><span>Area aproximada</span><strong style="color:var(--text)">${bairro.area}</strong></div>
    <div style="display:flex;justify-content:space-between;gap:12px"><span>Base cartografica</span><strong style="color:var(--text)">Bairros administrativos</strong></div>
    <div style="display:flex;justify-content:space-between;gap:12px"><span>Ultima atualizacao</span><strong style="color:var(--text)">Jun/2026</strong></div>
  `;

  showPage("bairro", null);
}

function buildEventsForBairro(bairro) {
  if (bairro.risco === "high") {
    return [
      { date: "Jan 2026", type: "Chuva intensa", level: "Severo" },
      { date: "Nov 2025", type: "Alagamento", level: "Severo" },
      { date: "Set 2025", type: "Onda de calor", level: "Registrado" }
    ];
  }
  if (bairro.risco === "med") {
    return [
      { date: "Jan 2026", type: "Chuva intensa", level: "Moderado" },
      { date: "Out 2025", type: "Ponto de alagamento", level: "Pontual" },
      { date: "Set 2025", type: "Calor urbano", level: "Monitorado" }
    ];
  }
  return [
    { date: "Jan 2026", type: "Chuva intensa", level: "Leve" },
    { date: "Nov 2025", type: "Monitoramento preventivo", level: "Sem alerta" },
    { date: "Ago 2025", type: "Calor urbano", level: "Baixo" }
  ];
}

function buildDashboard() {
  if (dashboardBuilt) {
    updateDashboardValues();
    return;
  }

  updateDashboardValues();
  dashboardBuilt = true;
}

function updateDashboardValues() {
  animateCount("count-bairros", bairros.length);
  animateCount("count-alto", bairros.filter((bairro) => bairro.risco === "high").length);
  animateCount("count-baixo", bairros.filter((bairro) => bairro.risco === "low").length);

  const average = bairros.reduce((sum, bairro) => sum + bairro.score, 0) / bairros.length;
  const avgScore = byId("avg-score");
  if (avgScore) avgScore.textContent = average.toFixed(1);

  const chart = byId("bar-chart");
  if (!chart) return;

  chart.innerHTML = "";
  [...bairros]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .forEach((bairro) => {
      const pct = Math.round((bairro.score / 10) * 100);
      const item = document.createElement("div");
      item.className = "bar-item";
      item.innerHTML = `
        <div class="bar-val">${bairro.score.toFixed(1)}</div>
        <div class="bar-fill" style="height:${pct}%;background:${getRiskColor(bairro.risco)};max-height:165px"></div>
        <div class="bar-label" title="${bairro.nome}">${bairro.nome.split(" ")[0]}</div>
      `;
      chart.appendChild(item);
    });
}

function animateCount(id, target) {
  const element = byId(id);
  if (!element) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    element.textContent = String(target);
    return;
  }

  let value = 0;
  const step = Math.max(target / 24, 1);
  const timer = window.setInterval(() => {
    value = Math.min(value + step, target);
    element.textContent = String(Math.round(value));
    if (value >= target) window.clearInterval(timer);
  }, 32);
}

function showPage(name, linkEl) {
  const nextPage = byId(`page-${name}`);
  if (!nextPage) return;

  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  nextPage.classList.add("active");

  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    link.classList.toggle("active", link === linkEl);
  });

  closeMenu();
  window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  if (name === "mapa") {
    window.setTimeout(() => {
      buildMap();
      filterBairros();
    }, 50);
  }

  if (name === "dashboard") {
    window.setTimeout(buildDashboard, 50);
  }
}

function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("arkhios-theme", nextTheme);
  updateThemeIcon(nextTheme);
}

function updateThemeIcon(theme) {
  const icon = byId("theme-icon");
  if (!icon) return;

  icon.innerHTML = theme === "dark"
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
}

function applyInitialTheme() {
  const saved = localStorage.getItem("arkhios-theme");
  if (saved) {
    setTheme(saved);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

function toggleMenu() {
  const menu = byId("mobile-menu");
  const hamburger = byId("hamburger");
  const willOpen = !menu?.classList.contains("open");
  menu?.classList.toggle("open", willOpen);
  hamburger?.classList.toggle("open", willOpen);
  hamburger?.setAttribute("aria-expanded", String(willOpen));
}

function closeMenu() {
  byId("mobile-menu")?.classList.remove("open");
  byId("hamburger")?.classList.remove("open");
  byId("hamburger")?.setAttribute("aria-expanded", "false");
}

function submitForm() {
  const name = byId("contact-name")?.value.trim() || "";
  const email = byId("contact-email")?.value.trim() || "";
  const message = byId("contact-message")?.value.trim() || "";
  const subject = byId("contact-subject")?.value.trim() || "";
  const feedback = byId("form-feedback");

  if (!name || !email || !message) {
    showFormFeedback("Preencha nome, email e mensagem para enviar.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormFeedback("Digite um email valido para retorno.", "error");
    return;
  }

  showFormFeedback(`Mensagem registrada${subject ? ` sobre ${subject}` : ""}. Retornaremos em breve.`, "success");
  ["contact-name", "contact-email", "contact-message", "contact-subject"].forEach((id) => {
    const field = byId(id);
    if (field) field.value = "";
  });

  feedback?.focus?.();
}

function showFormFeedback(message, type) {
  const feedback = byId("form-feedback");
  if (!feedback) return;

  feedback.className = `form-feedback show ${type}`;
  feedback.setAttribute("role", type === "error" ? "alert" : "status");
  feedback.innerHTML = `<span aria-hidden="true">${type === "error" ? "!" : "✓"}</span> ${message}`;
}

function toggleA11yMenu() {
  const menu = byId("a11y-menu");
  const button = document.querySelector(".a11y-toggle");
  const willShow = !menu?.classList.contains("show");
  menu?.classList.toggle("show", willShow);
  button?.setAttribute("aria-expanded", String(willShow));
}

function toggleFontSize() {
  const enabled = !document.documentElement.classList.contains("a11y-large-text");
  document.documentElement.classList.toggle("a11y-large-text", enabled);
  localStorage.setItem("arkhios-large-text", String(enabled));
  document.querySelector('[onclick="toggleFontSize()"]')?.setAttribute("aria-pressed", String(enabled));
}

let isReading = false;
let utterance = null;

function toggleSpeech() {
  const button = byId("btn-speech");
  if (!("speechSynthesis" in window)) {
    showFormFeedback?.("Leitura por voz nao esta disponivel neste navegador.", "error");
    return;
  }

  if (isReading) {
    window.speechSynthesis.cancel();
    setSpeechState(false);
    return;
  }

  const activeContainer = document.querySelector(".page.active") || document.body;
  const elements = activeContainer.querySelectorAll("h1, h2, h3, p, .hero-title, .hero-desc, .section-title, .section-desc, .card-title, .card-desc");
  const textToRead = [...elements]
    .filter((element) => element.offsetParent !== null)
    .map((element) => element.innerText.trim())
    .filter(Boolean)
    .join(". ");

  utterance = new SpeechSynthesisUtterance(textToRead || "Nenhum conteudo visivel detectado.");
  utterance.lang = "pt-BR";
  utterance.onend = () => setSpeechState(false);
  utterance.onerror = () => setSpeechState(false);

  window.speechSynthesis.speak(utterance);
  setSpeechState(true);

  function setSpeechState(active) {
    isReading = active;
    button?.setAttribute("aria-pressed", String(active));
    if (button) {
      button.style.background = active ? "var(--accent)" : "";
      button.style.color = active ? "#fff" : "";
    }
  }
}

function restoreAccessibilityPrefs() {
  const large = localStorage.getItem("arkhios-large-text") === "true";
  document.documentElement.classList.toggle("a11y-large-text", large);
  document.querySelector('[onclick="toggleFontSize()"]')?.setAttribute("aria-pressed", String(large));
}

function setupGlobalHandlers() {
  window.showPage = showPage;
  window.toggleTheme = toggleTheme;
  window.toggleMenu = toggleMenu;
  window.filterBairros = filterBairros;
  window.setFilter = setFilter;
  window.openBairro = openBairro;
  window.submitForm = submitForm;
  window.toggleA11yMenu = toggleA11yMenu;
  window.toggleFontSize = toggleFontSize;
  window.toggleSpeech = toggleSpeech;
}

function init() {
  setupGlobalHandlers();
  applyInitialTheme();
  restoreAccessibilityPrefs();
  buildSidebar(bairros);

  byId("hamburger")?.setAttribute("aria-expanded", "false");
  document.querySelector(".a11y-toggle")?.setAttribute("aria-expanded", "false");
  byId("btn-speech")?.setAttribute("aria-pressed", "false");

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      byId("loading")?.classList.add("hide");
      window.setTimeout(() => {
        const loading = byId("loading");
        if (loading) loading.style.display = "none";
      }, 400);
    }, 700);
  });

  window.addEventListener("scroll", () => {
    const nav = byId("navbar");
    if (!nav) return;
    nav.style.boxShadow = window.scrollY > 20 ? "var(--shadow-md)" : "none";
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      byId("a11y-menu")?.classList.remove("show");
      hideTooltip();
    }
  });
}

init();