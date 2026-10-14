import mongoose, { Schema } from "mongoose";

// Cómo se llena el saco: por válvula con ensacadora o por boca abierta.
export const SACK_KINDS = ["valve", "open"] as const;
export type SackKind = (typeof SACK_KINDS)[number];

export interface ISpec {
  label: string;
  value: string;
}

export interface IProduct {
  slug: string;
  name: string;
  short: string;
  kind: SackKind;
  // Fondo cuadrado: el saco se para solo en percha
  square: boolean;
  description: string;
  idealFor: string[];
  specs: ISpec[];
  options: string[];
  image: { url: string; publicId: string };
  order: number;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const specSchema = new Schema<ISpec>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const productSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    short: { type: String, default: "", trim: true },
    kind: { type: String, enum: SACK_KINDS, default: "open" },
    square: { type: Boolean, default: false },
    description: { type: String, default: "", trim: true },
    idealFor: { type: [String], default: [] },
    specs: { type: [specSchema], default: [] },
    options: { type: [String], default: [] },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
