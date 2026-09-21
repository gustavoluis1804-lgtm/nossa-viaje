import type { AppState, CheckItem, TripItem } from "@/lib/types";

export const IMG = {
  planetario:
    "https://images.pexels.com/photos/20465952/pexels-photo-20465952.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  pavilhao:
    "https://images.pexels.com/photos/37889994/pexels-photo-37889994.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  liberdade:
    "https://images.pexels.com/photos/30539380/pexels-photo-30539380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  aclimacao:
    "https://images.pexels.com/photos/39495283/pexels-photo-39495283.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  skylineDusk:
    "https://images.pexels.com/photos/17007760/pexels-photo-17007760.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  skylineSunset:
    "https://images.pexels.com/photos/14917406/pexels-photo-14917406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

/** A surpresa. Nunca renderizada antes do desbloqueio. */
export const SECRET_INFO = {
  name: "Sampa Sky",
  address: "Edifício Mirante do Vale · Praça Pedro Lessa, 110 — Centro, São Paulo",
  mapQuery: "Sampa Sky, São Paulo",
  image: IMG.skylineDusk,
  description:
    "Um mirante de vidro a 150 metros do chão, no alto de um dos prédios mais altos da cidade. A vista que eu queria guardar para o fim do nosso dia.",
  tips: [
    "Chegar com a luz do fim de tarde",
    "Fotos no deck de vidro",
    "Ver a cidade acender lá embaixo",
  ],
};

export const ITINERARY: TripItem[] = [
  // ——— DIA 20 DE OUTUBRO ———
  {
    id: "d1-saida",
    group: "20",
    dayOffset: 0,
    start: "22:00",
    end: "23:40",
    title: "Saída de Sorocaba para São Paulo",
    description: "Pegar a estrada com calma. O começo da nossa primeira viagem.",
    category: "transport",
  },
  {
    id: "d1-chegada",
    group: "20",
    dayOffset: 0,
    endOffset: 1,
    start: "23:40",
    end: "00:30",
    title: "Chegada e hospedagem",
    description: "Check-in na hospedagem e descanso para o grande dia.",
    category: "lodging",
  },
  // ——— DIA 21 DE OUTUBRO ———
  {
    id: "d2-acordar",
    group: "21",
    dayOffset: 1,
    start: "06:00",
    title: "Acordar",
    description: "Começar o dia devagar, sem pressa.",
    category: "prepare",
  },
  {
    id: "d2-arrumar",
    group: "21",
    dayOffset: 1,
    start: "06:00",
    end: "06:40",
    title: "Banho e se arrumar",
    category: "prepare",
  },
  {
    id: "d2-cafe",
    group: "21",
    dayOffset: 1,
    start: "06:40",
    end: "07:10",
    title: "Café da manhã",
    description: "Reforçar antes de sair. Café passado e algo gostoso para começar bem.",
    category: "meal",
  },
  {
    id: "d2-transp-ibirapuera",
    group: "21",
    dayOffset: 1,
    start: "07:10",
    end: "08:00",
    title: "Deslocamento até o Parque Ibirapuera",
    description: "Saída com folga para chegar tranquilo.",
    category: "transport",
  },
  {
    id: "d2-planetario",
    group: "21",
    dayOffset: 1,
    start: "08:00",
    end: "10:00",
    title: "Planetário do Ibirapuera",
    description:
      "Começar o dia olhando as estrelas juntos, em um dos lugares mais bonitos do parque.",
    category: "place",
    moment: true,
    address: "Parque Ibirapuera · Av. Pedro Álvares Cabral, s/n — São Paulo",
    mapQuery: "Planetário do Ibirapuera",
    image: IMG.planetario,
    tips: ["Chegar alguns minutos antes", "Conferir a sessão do dia na entrada"],
  },
  {
    id: "d2-pavilhao",
    group: "21",
    dayOffset: 1,
    start: "10:00",
    end: "11:30",
    title: "Pavilhão Japonês",
    description:
      "Um passeio tranquilo para conversar, tirar algumas fotos e aproveitar os jardins.",
    category: "place",
    moment: true,
    address: "Parque Ibirapuera — São Paulo",
    mapQuery: "Pavilhão Japonês, Parque Ibirapuera",
    image: IMG.pavilhao,
    tips: ["Caminhar devagar pelos jardins", "Fotos perto do lago", "Aproveitar a calma do lugar"],
  },
  {
    id: "d2-transp-liberdade",
    group: "21",
    dayOffset: 1,
    start: "11:30",
    end: "12:00",
    title: "Deslocamento até a Liberdade",
    category: "transport",
  },
  {
    id: "d2-liberdade",
    group: "21",
    dayOffset: 1,
    start: "12:00",
    end: "15:00",
    title: "Liberdade",
    description: "Almoço, lojinhas, doces e aquele vai-e-vem gostoso do bairro mais oriental da cidade.",
    category: "place",
    moment: true,
    address: "Bairro da Liberdade — São Paulo",
    mapQuery: "Liberdade, São Paulo",
    image: IMG.liberdade,
    tips: [
      "Almoçar sem pressa",
      "Visitar as lojinhas da Rua Galvão Bueno",
      "Experimentar doces (mochi!)",
      "Fotos nas lanternas",
      "Escolher lembrancinhas",
    ],
  },
  {
    id: "d2-transp-aclimacao",
    group: "21",
    dayOffset: 1,
    start: "15:00",
    end: "15:20",
    title: "Deslocamento",
    category: "transport",
  },
  {
    id: "d2-aclimacao",
    group: "21",
    dayOffset: 1,
    start: "15:20",
    end: "17:00",
    title: "Parque da Aclimação",
    description:
      "A parte mais calma do dia. Descansar, conversar, andar pelo parque e ficar perto do lago para recuperar as energias.",
    category: "place",
    moment: true,
    address: "Rua Muniz de Sousa, 1119 — Aclimação, São Paulo",
    mapQuery: "Parque da Aclimação",
    image: IMG.aclimacao,
    tips: ["Sentar perto do lago", "Caminhar sem destino", "Recuperar energia para o resto do dia"],
  },
  {
    id: "d2-transp-secreto",
    group: "21",
    dayOffset: 1,
    start: "17:00",
    end: "17:40",
    title: "Deslocamento para o próximo lugar",
    description: "A caminho da última parada.",
    category: "transport",
  },
  {
    id: "d2-secreto",
    group: "21",
    dayOffset: 1,
    start: "17:40",
    end: "19:00",
    title: "Destino secreto",
    category: "secret",
    moment: true,
    secret: true,
  },
  {
    id: "d2-transp-restaurante",
    group: "21",
    dayOffset: 1,
    start: "19:00",
    end: "19:30",
    title: "Ir para o restaurante",
    category: "transport",
  },
  {
    id: "d2-jantar",
    group: "21",
    dayOffset: 1,
    start: "19:30",
    end: "21:00",
    title: "Jantar juntos",
    description: "Terminar o dia com calma, boa comida e boa companhia.",
    category: "meal",
    moment: true,
  },
  {
    id: "d2-volta",
    group: "21",
    dayOffset: 1,
    start: "21:00",
    end: "21:40",
    title: "Voltar para a hospedagem",
    category: "transport",
  },
  {
    id: "d2-livre",
    group: "21",
    dayOffset: 1,
    start: "21:40",
    end: "23:15",
    title: "Tempo livre na hospedagem",
    description: "Descansar, conversar e aproveitar o final do dia juntos.",
    category: "rest",
  },
  {
    id: "d2-organizar",
    group: "21",
    dayOffset: 1,
    start: "23:15",
    end: "23:30",
    title: "Organizar as coisas",
    category: "prepare",
  },
  {
    id: "d2-checkout",
    group: "21",
    dayOffset: 1,
    start: "23:30",
    title: "Saída da hospedagem",
    category: "lodging",
  },
  {
    id: "d2-retorno",
    group: "21",
    dayOffset: 2,
    start: "00:00",
    title: "Saída de São Paulo para Sorocaba",
    description: "Volta para casa com o coração cheio.",
    category: "transport",
  },
];

/** mescla dados padrão + configurações + edições do admin + estado da surpresa */
export function resolveItems(state: AppState): TripItem[] {
  const s = state.settings;
  return ITINERARY.map((base) => {
    const item: TripItem = { ...base, tips: base.tips ? [...base.tips] : undefined };

    // injeta hospedagem / restaurante configurados
    if (item.id === "d1-chegada" && s.lodging) {
      item.title = `Hospedagem · ${s.lodging}`;
      item.address = s.lodgingAddress || item.address;
      if (s.lodgingAddress) item.mapQuery = s.lodgingAddress;
      item.description = "Check-in na hospedagem e descanso para o grande dia.";
    }
    if (item.id === "d2-transp-restaurante" && s.restaurant) {
      item.title = `Ir para ${s.restaurant}`;
    }
    if (item.id === "d2-jantar" && s.restaurant) {
      item.description = `${s.restaurant}. Terminar o dia com calma, boa comida e boa companhia.`;
      if (s.restaurantAddress) {
        item.address = s.restaurantAddress;
        item.mapQuery = s.restaurantAddress;
      }
    }
    if (item.id === "d2-volta" && s.lodging) {
      item.title = `Voltar para ${s.lodging}`;
    }

    // destino secreto
    if (item.secret) {
      if (state.unlocked) {
        item.title = SECRET_INFO.name;
        item.description = SECRET_INFO.description;
        item.address = SECRET_INFO.address;
        item.mapQuery = SECRET_INFO.mapQuery;
        item.image = SECRET_INFO.image;
        item.tips = [...SECRET_INFO.tips];
      } else {
        item.title = "Destino secreto";
        item.description = "Um último lugar está esperando por você.";
        item.address = undefined;
        item.mapQuery = undefined;
        item.image = undefined;
        item.tips = undefined;
        item.locked = true;
      }
    }

    // edições do admin por cima de tudo
    const ov = state.overrides[item.id];
    if (ov) {
      if (item.locked) {
        // bloqueado: nunca aplicar campos que entregam a surpresa
        if (ov.start) item.start = ov.start;
        if (ov.end) item.end = ov.end;
      } else {
        Object.assign(item, ov);
      }
    }
    return item;
  });
}

export function momentsOf(items: TripItem[]): TripItem[] {
  return items.filter((i) => i.moment);
}

export const DEFAULT_CHECKLIST: CheckItem[] = [
  { id: "c-docs", label: "Documentos (RG / CNH)", done: false },
  { id: "c-celular", label: "Celular", done: false },
  { id: "c-carregador", label: "Carregador", done: false },
  { id: "c-powerbank", label: "Power bank", done: false },
  { id: "c-dinheiro", label: "Dinheiro", done: false },
  { id: "c-cartao", label: "Cartão", done: false },
  { id: "c-agua", label: "Garrafa de água", done: false },
  { id: "c-roupa", label: "Roupas para os dois dias", done: false },
  { id: "c-pessoais", label: "Itens pessoais", done: false },
  { id: "c-chuva", label: "Guarda-chuva", done: false },
  { id: "c-reserva", label: "Reserva da hospedagem", done: false },
  { id: "c-ingressos", label: "Ingressos", done: false },
  { id: "c-transporte", label: "Confirmação de transporte", done: false },
];

export const EXPENSE_CATEGORIES = [
  "transporte",
  "hospedagem",
  "café da manhã",
  "almoço",
  "jantar",
  "lanches",
  "ingressos",
  "compras",
  "lembranças",
  "emergência",
  "outros",
];

export const DEFAULT_PASSWORD_HASH = "YW5pbmhh"; // "aninha" em base64 — nunca exibida
export const DEFAULT_REVEAL_PHRASE = "Guardei uma vista especial para o final do nosso dia.";

export function hashPassword(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input.trim().toLowerCase())));
  } catch {
    return "";
  }
}

export function checkPassword(input: string, hash: string): boolean {
  return hashPassword(input) === hash;
}
