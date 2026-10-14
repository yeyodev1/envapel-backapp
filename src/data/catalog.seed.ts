import type { SackKind } from "../models/product.model";

/**
 * Catálogo con el que nació la web (reunión del 6 oct 2026). El seed lo carga
 * una sola vez; después Envapel lo edita desde el panel.
 */
export interface SeedProduct {
  slug: string;
  name: string;
  short: string;
  kind: SackKind;
  square?: boolean;
  description: string;
  idealFor: string[];
  specs: { label: string; value: string }[];
  options: string[];
}

export const seedProducts: SeedProduct[] = [
  {
    slug: "saco-valvulado",
    name: "Saco valvulado",
    short: "Llenado rápido por válvula, cierre automático por presión del producto.",
    kind: "valve",
    description:
      "Se llena por una válvula en la esquina superior con ensacadoras de alta velocidad. Al terminar, el propio producto presiona la válvula y la sella: no necesita costura ni cosedora. Es la construcción preferida para polvos y granulados finos.",
    idealFor: ["Harinas", "Cemento y morteros", "Polvos químicos", "Fertilizantes granulados"],
    specs: [
      { label: "Construcción", value: "Tubo con fondos pegados y válvula" },
      { label: "Hojas", value: "2 a 4 hojas de papel kraft" },
      { label: "Capacidad", value: "Hasta 50 kg" },
      { label: "Llenado", value: "Ensacadora por válvula" },
    ],
    options: [
      "Válvula interna o externa",
      "Válvula con manga termosellable",
      "Lámina de polietileno",
      "Microperforado para desaireo",
    ],
  },
  {
    slug: "saco-boca-abierta-cosido",
    name: "Saco boca abierta cosido",
    short: "Fondo cosido o pegado y cierre con cosedora en tu línea.",
    kind: "open",
    description:
      "Llega a tu planta con el fondo cerrado y la boca abierta. Se llena por gravedad o con tolva y se cierra con cosedora, con o sin cinta crepé. Versátil y económico para productos granulados, troceados y de mayor tamaño.",
    idealFor: ["Fertilizantes", "Carbón vegetal", "Balanceados", "Productos troceados"],
    specs: [
      { label: "Construcción", value: "Tubo con fondo cosido o pegado" },
      { label: "Hojas", value: "2 a 5 hojas de papel kraft" },
      { label: "Capacidad", value: "Hasta 50 kg" },
      { label: "Cierre", value: "Costura con o sin cinta crepé" },
    ],
    options: [
      "Fuelles laterales",
      "Lámina de polietileno",
      "Papel extensible de alta resistencia",
      "Asas para presentaciones pequeñas",
    ],
  },
  {
    slug: "saco-boca-abierta-pegado",
    name: "Saco boca abierta de fondo cuadrado",
    short: "Se para solo en percha. Ideal para marcas que venden al consumidor.",
    kind: "open",
    square: true,
    description:
      "Fondo pegado en escuadra que permite que el saco quede de pie en la percha y se apile limpio. Pensado para presentaciones de retail donde la impresión de la marca vende tanto como el producto.",
    idealFor: [
      "Arena para gatos",
      "Carbón para parrilla",
      "Alimento para mascotas",
      "Harinas al detal",
    ],
    specs: [
      { label: "Construcción", value: "Fondo cuadrado pegado" },
      { label: "Hojas", value: "2 a 3 hojas de papel kraft" },
      { label: "Capacidad", value: "Presentaciones de 2 a 25 kg" },
      { label: "Cierre", value: "Pegado, cosido o doblado" },
    ],
    options: [
      "Impresión de alta cobertura",
      "Ventana o asa troquelada",
      "Barrera contra grasa",
      "Papel blanco o kraft natural",
    ],
  },
];
