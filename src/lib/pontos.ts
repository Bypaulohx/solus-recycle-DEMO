export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  horario: string;
  telefone?: string;
  materiais: string[];
  pesoMinimo: number;
  descricao: string;
};

export const PONTOS: Ponto[] = [
  {
    id: "ascas",
    nome: "Associação de Catadores de Material Reciclável - ASCAS",
    endereco: "Av. LO 3, 764",
    cidade: "Palmas - TO",
    horario: "Seg. a sex. das 7h30 às 17h",
    telefone: "(63) 98467-8637",
    materiais: ["Metal", "Vidro"],
    pesoMinimo: 10,
    descricao:
      "Associação que coleta e dá destino correto a materiais recicláveis na região central de Palmas.",
  },
  {
    id: "prefeitura",
    nome: "Ponto de Coleta - Prefeitura Municipal",
    endereco: "Quadra 502 Sul",
    cidade: "Palmas - TO",
    horario: "Seg. a sex. das 8h às 17h",
    telefone: "(63) 3212-7000",
    materiais: ["Papel", "Plástico", "Metal", "Vidro"],
    pesoMinimo: 5,
    descricao: "Ponto oficial da prefeitura para entrega voluntária de recicláveis.",
  },
  {
    id: "reciminhas",
    nome: "Reciminhas Comércio de Metais",
    endereco: "Av. JK, 689",
    cidade: "Palmas - TO",
    horario: "Seg. a sáb. das 8h às 18h",
    telefone: "(63) 99876-5544",
    materiais: ["Metal"],
    pesoMinimo: 15,
    descricao: "Comércio especializado em compra de metais ferrosos e não ferrosos.",
  },
  {
    id: "ecoponto-sul",
    nome: "Ecoponto Plano Diretor Sul",
    endereco: "Av. Teotônio Segurado, 1102",
    cidade: "Palmas - TO",
    horario: "Todos os dias das 7h às 19h",
    materiais: ["Papel", "Plástico", "Vidro", "Eletrônicos"],
    pesoMinimo: 2,
    descricao: "Ponto de entrega voluntária com aceitação de pequenos volumes diariamente.",
  },
];

export function getPonto(id: string) {
  return PONTOS.find((p) => p.id === id);
}
