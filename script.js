// ===== DATA =====

// Função debounce para evitar sobrecarga em eventos como resize
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const bairros = [];

const legacyBairros = [
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

const officialBairroBase = [
  { numero: 0, id: "aeroporto", nome: "Aeroporto", score: 2.8, risco: "low", pop: "708", coords: { x: 397, y: 607 } },
  { numero: 1, id: "agua-azul", nome: "Água Azul", score: 3.4, risco: "low", pop: "2.200", coords: { x: 700, y: 368 } },
  { numero: 2, id: "agua-chata", nome: "Água Chata", score: 3.5, risco: "low", pop: "22.978", coords: { x: 731, y: 633 } },
  { numero: 3, id: "aracilia", nome: "Aracília", score: 3.9, risco: "low", pop: "2.239", coords: { x: 816, y: 599 } },
  { numero: 4, id: "bananal", nome: "Bananal", score: 5.7, risco: "med", pop: "41.168", coords: { x: 529, y: 438 } },
  { numero: 5, id: "bela-vista", nome: "Bela Vista", score: 4.8, risco: "med", pop: "19.248", coords: { x: 257, y: 660 } },
  { numero: 6, id: "bom-clima", nome: "Bom Clima", score: 3.8, risco: "low", pop: "10.255", coords: { x: 286, y: 711 } },
  { numero: 7, id: "bonsucesso", nome: "Bonsucesso", score: 7.7, risco: "high", pop: "101.011", coords: { x: 681, y: 563 } },
  { numero: 8, id: "cabucu", nome: "Cabuçu", score: 7.0, risco: "high", pop: "78.035", coords: { x: 222, y: 484 } },
  { numero: 9, id: "cabucu-de-cima", nome: "Cabuçu de Cima", score: 3.6, risco: "low", pop: "N/D", coords: { x: 279, y: 405 } },
  { numero: 10, id: "capelinha", nome: "Capelinha", score: 3.1, risco: "low", pop: "43", coords: { x: 608, y: 342 } },
  { numero: 11, id: "cecap", nome: "CECAP", score: 5.4, risco: "med", pop: "10.002", coords: { x: 550, y: 630 } },
  { numero: 12, id: "centro", nome: "Centro", score: 7.1, risco: "high", pop: "24.655", coords: { x: 190, y: 760 } },
  { numero: 13, id: "cocaia", nome: "Cocaia", score: 7.0, risco: "high", pop: "25.426", coords: { x: 265, y: 630 } },
  { numero: 14, id: "cumbica", nome: "Cumbica", score: 7.9, risco: "high", pop: "88.150", coords: { x: 483, y: 697 } },
  { numero: 15, id: "fortaleza", nome: "Fortaleza", score: 6.4, risco: "med", pop: "14.981", coords: { x: 145, y: 602 } },
  { numero: 16, id: "fatima", nome: "Fátima", score: 5.8, risco: "med", pop: "14.680", coords: { x: 250, y: 700 } },
  { numero: 17, id: "gopouva", nome: "Gopoúva", score: 7.0, risco: "high", pop: "26.399", coords: { x: 280, y: 765 } },
  { numero: 18, id: "invernada", nome: "Invernada", score: 5.0, risco: "med", pop: "14.505", coords: { x: 232, y: 690 } },
  { numero: 19, id: "itapegica", nome: "Itapegica", score: 5.2, risco: "med", pop: "19.328", coords: { x: 105, y: 792 } },
  { numero: 20, id: "jardim-vila-galvao", nome: "Jardim Vila Galvão", score: 4.6, risco: "med", pop: "15.804", coords: { x: 101, y: 742 } },
  { numero: 21, id: "lavras", nome: "Lavras", score: 3.0, risco: "low", pop: "17.759", coords: { x: 568, y: 549 } },
  { numero: 22, id: "macedo", nome: "Macedo", score: 7.2, risco: "high", pop: "23.219", coords: { x: 250, y: 780 } },
  { numero: 23, id: "maia", nome: "Maia", score: 4.4, risco: "med", pop: "5.284", coords: { x: 206, y: 761 } },
  { numero: 24, id: "mato-das-cobras", nome: "Mato das Cobras", score: 5.6, risco: "med", pop: "12.355", coords: { x: 658, y: 446 } },
  { numero: 25, id: "monte-carmelo", nome: "Monte Carmelo", score: 3.9, risco: "low", pop: "5.911", coords: { x: 315, y: 742 } },
  { numero: 26, id: "morro-grande", nome: "Morro Grande", score: 2.9, risco: "low", pop: "335", coords: { x: 770, y: 245 } },
  { numero: 27, id: "morros", nome: "Morros", score: 5.9, risco: "med", pop: "40.888", coords: { x: 382, y: 492 } },
  { numero: 28, id: "paraventi", nome: "Paraventi", score: 4.5, risco: "med", pop: "11.071", coords: { x: 282, y: 800 } },
  { numero: 29, id: "picanco", nome: "Picanço", score: 5.3, risco: "med", pop: "53.313", coords: { x: 249, y: 731 } },
  { numero: 30, id: "pimentas", nome: "Pimentas", score: 8.7, risco: "high", pop: "168.232", coords: { x: 650, y: 716 } },
  { numero: 31, id: "ponte-grande", nome: "Ponte Grande", score: 3.8, risco: "low", pop: "25.562", coords: { x: 217, y: 797 } },
  { numero: 32, id: "porto-da-igreja", nome: "Porto da Igreja", score: 3.2, risco: "low", pop: "45", coords: { x: 137, y: 845 } },
  { numero: 33, id: "presidente-dutra", nome: "Presidente Dutra", score: 6.2, risco: "med", pop: "44.017", coords: { x: 576, y: 591 } },
  { numero: 34, id: "sadokim", nome: "Sadokim", score: 5.1, risco: "med", pop: "9.487", coords: { x: 781, y: 544 } },
  { numero: 35, id: "sao-joao", nome: "São João", score: 7.3, risco: "high", pop: "70.752", coords: { x: 540, y: 509 } },
  { numero: 36, id: "sao-roque", nome: "São Roque", score: 3.7, risco: "low", pop: "2.182", coords: { x: 169, y: 798 } },
  { numero: 37, id: "taboao", nome: "Taboão", score: 7.2, risco: "high", pop: "75.737", coords: { x: 317, y: 552 } },
  { numero: 38, id: "tanque-grande", nome: "Tanque Grande", score: 3.3, risco: "low", pop: "149", coords: { x: 463, y: 403 } },
  { numero: 39, id: "torres-tibagy", nome: "Torres Tibagy", score: 3.7, risco: "low", pop: "18.874", coords: { x: 170, y: 724 } },
  { numero: 40, id: "tranquilidade", nome: "Tranquilidade", score: 3.6, risco: "low", pop: "5.223", coords: { x: 151, y: 779 } },
  { numero: 41, id: "varzea-do-palacio", nome: "Várzea do Palácio", score: 4.9, risco: "med", pop: "4.137", coords: { x: 450, y: 570 } },
  { numero: 42, id: "vila-any", nome: "Vila Any", score: 3.4, risco: "low", pop: "29.158", coords: { x: 722, y: 782 } },
  { numero: 43, id: "vila-augusta", nome: "Vila Augusta", score: 3.9, risco: "low", pop: "35.319", coords: { x: 300, y: 670 } },
  { numero: 44, id: "vila-barros", nome: "Vila Barros", score: 5.6, risco: "med", pop: "18.247", coords: { x: 289, y: 666 } },
  { numero: 45, id: "vila-galvao", nome: "Vila Galvão", score: 7.4, risco: "high", pop: "32.853", coords: { x: 90, y: 687 } },
  { numero: 46, id: "vila-rio", nome: "Vila Rio", score: 7.0, risco: "high", pop: "49.605", coords: { x: 146, y: 667 } }
];

function buildOfficialIndicators(score) {
  const clamp = (value) => Math.max(0, Math.min(10, Number(value.toFixed(1))));
  return {
    alagamento: clamp(score + 0.3),
    calor: clamp(score - 0.1),
    territorio: clamp(score + 0.1),
    ocorrencias: clamp(score - 0.4)
  };
}

bairros.splice(0, bairros.length, ...officialBairroBase.map((bairro) => ({
  ...bairro,
  area: bairro.area || "N/D",
  desc: `Bairro administrativo ${bairro.numero} no mapa oficial de Guarulhos, monitorado pelo ARKHIOS IVC com foco em risco climático urbano, drenagem, calor e vulnerabilidade territorial.`,
  indicators: buildOfficialIndicators(bairro.score)
})));

const riskConfig = {
  low: { label: "Baixo risco", short: "Baixo", css: "low", colorVar: "var(--success)" },
  med: { label: "Médio risco", short: "Médio", css: "med", colorVar: "var(--warning)" },
  high: { label: "Alto risco", short: "Alto", css: "high", colorVar: "var(--danger)" }
};

const districtZones = [];

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
      <span class="bairro-map-number" aria-hidden="true">${bairro.numero}</span>
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
    const markerSize = bairro.risco === "high" ? 8.5 : bairro.risco === "med" ? 7.5 : 6.5;
    const groupEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    groupEl.setAttribute("class", "bairro-svg-group");
    groupEl.setAttribute("data-id", bairro.id);
    groupEl.setAttribute("data-map-number", String(bairro.numero));
    groupEl.setAttribute("role", "button");
    groupEl.setAttribute("tabindex", "0");
    groupEl.setAttribute("aria-label", `${bairro.numero} ${bairro.nome}, ${getRiskLabel(bairro.risco)}, score ${bairro.score.toFixed(1)}`);
    groupEl.style.color = getRiskColor(bairro.risco);

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `${bairro.numero} - ${bairro.nome}: ${getRiskLabel(bairro.risco)} (${bairro.score.toFixed(1)})`;

    const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hit.setAttribute("class", "bairro-hit-area");
    hit.setAttribute("cx", bairro.coords.x);
    hit.setAttribute("cy", bairro.coords.y);
    hit.setAttribute("r", 18);

    const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    halo.setAttribute("class", "bairro-marker-halo");
    halo.setAttribute("cx", bairro.coords.x);
    halo.setAttribute("cy", bairro.coords.y);
    halo.setAttribute("r", markerSize + 10);

    const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    marker.setAttribute("class", "bairro-marker");
    marker.setAttribute("cx", bairro.coords.x);
    marker.setAttribute("cy", bairro.coords.y);
    marker.setAttribute("r", markerSize);

    const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    core.setAttribute("class", "bairro-marker-core");
    core.setAttribute("cx", bairro.coords.x);
    core.setAttribute("cy", bairro.coords.y);
    core.setAttribute("r", 2.7);

    const score = document.createElementNS("http://www.w3.org/2000/svg", "text");
    score.setAttribute("class", "bairro-marker-score");
    score.setAttribute("x", bairro.coords.x);
    score.setAttribute("y", bairro.coords.y + 1);
    score.textContent = bairro.numero;

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "bairro-marker-label");
    label.setAttribute("x", bairro.coords.x);
    label.setAttribute("y", bairro.coords.y - 14);
    label.textContent = `${bairro.numero} ${bairro.nome.length > 13 ? bairro.nome.split(" ")[0] : bairro.nome}`;

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
