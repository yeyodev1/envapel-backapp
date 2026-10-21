import type { SackKind } from "../models/product.model";

/**
 * Catálogo oficial de la web. Nació en la reunión del 6 oct 2026 y se
 * enriqueció el 21 oct 2026 con el detalle técnico que pidió Lenin
 * (especificaciones por construcción al estilo de su página de referencia).
 * El seed crea lo que falta; sync-products actualiza el contenido por slug.
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
      "Se construye con los extremos cerrados y una válvula en la esquina superior que recibe la boquilla de la ensacadora. Al terminar el llenado, el propio producto presiona la válvula y la sella: no necesita costura ni cosedora. Es la construcción preferida para polvos y granulados finos, y la que usan los proyectos de azúcar y cacao en polvo para exportación.",
    idealFor: [
      "Harinas y premezclas",
      "Azúcar y leche en polvo",
      "Cemento y morteros",
      "Polvos químicos",
      "Fertilizantes granulados",
    ],
    specs: [
      { label: "Construcción", value: "Tubo con fondos pegados y válvula" },
      { label: "Apertura", value: "Válvula para boquilla de llenado" },
      { label: "Hojas", value: "2 a 4 de papel extensible 100 % virgen" },
      { label: "Capa exterior", value: "Kraft blanco o natural, con impresión" },
      { label: "Capacidad", value: "De 10 a 50 kg según densidad" },
      { label: "Llenado", value: "Ensacadoras por válvula, manuales o automáticas" },
    ],
    options: [
      "Válvula interna o externa, a la medida de tu boquilla",
      "Válvula con manga termosellable",
      "Lámina de polietileno como barrera de humedad",
      "Microperforado para desaireo en llenado rápido",
      "Impresión flexográfica hasta 4 colores",
    ],
  },
  {
    slug: "saco-boca-abierta-cosido",
    name: "Saco boca abierta cosido",
    short: "Fondo cosido o pegado y cierre con cosedora en tu línea.",
    kind: "open",
    description:
      "Llega a tu planta con el fondo cerrado y la boca abierta: se llena por el extremo superior, por gravedad o con tolva, y se cierra con cosedora, con o sin cinta crepé. Es el formato más versátil para granos, semillas, balanceados y productos troceados, y el más sencillo de integrar en líneas manuales o semiautomáticas.",
    idealFor: [
      "Granos, cereales y semillas",
      "Fertilizantes",
      "Balanceados y sales minerales",
      "Carbón vegetal",
      "Productos troceados",
    ],
    specs: [
      { label: "Construcción", value: "Tubo con fondo cosido o pegado" },
      { label: "Apertura", value: "Boca abierta, llenado superior" },
      { label: "Hojas", value: "2 a 5 de papel extensible 100 % virgen" },
      { label: "Capa exterior", value: "Kraft blanco o natural, con impresión" },
      { label: "Capacidad", value: "De 5 a 50 kg según densidad" },
      { label: "Cierre", value: "Costura con o sin cinta crepé, en tu línea" },
    ],
    options: [
      "Fuelles laterales para mejor estiba y volumen",
      "Lámina de polietileno como barrera de humedad",
      "Papel extensible de alta resistencia para cargas exigentes",
      "Asas para presentaciones pequeñas",
      "Impresión flexográfica hasta 4 colores",
    ],
  },
  {
    slug: "saco-boca-abierta-pegado",
    name: "Saco boca abierta de fondo cuadrado",
    short: "Se para solo en percha. Ideal para marcas que venden al consumidor.",
    kind: "open",
    square: true,
    description:
      "Fondo pegado en escuadra que permite que el saco quede de pie en la percha y se apile limpio en el pallet. Pensado para presentaciones de retail donde la impresión de la marca vende tanto como el producto: arena para gatos, carbón para parrilla, alimento para mascotas y harinas al detal.",
    idealFor: [
      "Arena para gatos",
      "Carbón para parrilla",
      "Alimento para mascotas",
      "Harinas al detal",
    ],
    specs: [
      { label: "Construcción", value: "Fondo cuadrado pegado" },
      { label: "Apertura", value: "Boca abierta, llenado superior" },
      { label: "Hojas", value: "2 a 3 de papel extensible 100 % virgen" },
      { label: "Capa exterior", value: "Kraft natural o blanco para alta cobertura" },
      { label: "Capacidad", value: "Presentaciones de 2 a 25 kg" },
      { label: "Cierre", value: "Pegado, cosido o doblado" },
    ],
    options: [
      "Impresión de alta cobertura para percha",
      "Ventana o asa troquelada",
      "Barrera contra grasa o humedad",
      "Papel blanco o kraft natural",
    ],
  },
];
