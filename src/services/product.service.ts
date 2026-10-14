import { isValidObjectId } from "mongoose";
import { isConnected } from "../config/mongo";
import { CustomError } from "../errors/customError.error";
import { Product, IProduct, SACK_KINDS, SackKind } from "../models/product.model";
import { slugify } from "../utils/slugify";
import { deleteImage, isCloudinaryConfigured, uploadBuffer } from "./cloudinary.service";

const FOLDER = "envapel/productos";

function requireDb() {
  if (!isConnected()) throw new CustomError("El servidor no tiene base de datos disponible", 503);
}

function cleanList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => String(v ?? "").trim()).filter(Boolean);
}

function cleanSpecs(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((s: any) => ({
      label: String(s?.label ?? "").trim(),
      value: String(s?.value ?? "").trim(),
    }))
    .filter((s) => s.label && s.value);
}

/**
 * Solo pasan los campos editables. El body viene del panel, pero igual se
 * filtra: nadie debería poder escribir image.publicId o timestamps a mano.
 */
function pickInput(body: any, partial: boolean): Partial<IProduct> {
  const data: Partial<IProduct> = {};
  const has = (key: string) => body?.[key] !== undefined;

  if (!partial || has("name")) {
    const name = String(body?.name ?? "").trim();
    if (name.length < 3) throw new CustomError("El nombre debe tener al menos 3 letras", 400);
    data.name = name;
  }
  if (has("slug")) {
    const slug = slugify(String(body.slug));
    if (slug) data.slug = slug;
  }
  if (has("short")) data.short = String(body.short).trim();
  if (has("description")) data.description = String(body.description).trim();
  if (has("kind")) {
    if (!SACK_KINDS.includes(body.kind)) throw new CustomError("Tipo de llenado no válido", 400);
    data.kind = body.kind as SackKind;
  }
  if (has("square")) data.square = Boolean(body.square);
  if (has("idealFor")) data.idealFor = cleanList(body.idealFor);
  if (has("options")) data.options = cleanList(body.options);
  if (has("specs")) data.specs = cleanSpecs(body.specs);
  if (has("order")) data.order = Number(body.order) || 0;
  if (has("isPublished")) data.isPublished = Boolean(body.isPublished);
  return data;
}

async function ensureUniqueSlug(slug: string, exceptId?: string) {
  const clash = await Product.findOne({ slug, ...(exceptId ? { _id: { $ne: exceptId } } : {}) });
  if (clash) throw new CustomError("Ya existe un producto con esa dirección (slug)", 409);
}

async function findByIdOrFail(id: string) {
  if (!isValidObjectId(id)) throw new CustomError("Producto no encontrado", 404);
  const product = await Product.findById(id);
  if (!product) throw new CustomError("Producto no encontrado", 404);
  return product;
}

export async function listPublished() {
  requireDb();
  return Product.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
}

export async function findPublishedBySlug(slug: string) {
  requireDb();
  const product = await Product.findOne({ slug, isPublished: true }).lean();
  if (!product) throw new CustomError("Producto no encontrado", 404);
  return product;
}

export async function listAll() {
  requireDb();
  return Product.find().sort({ order: 1, createdAt: 1 }).lean();
}

export async function create(body: any) {
  requireDb();
  const data = pickInput(body, false);
  data.slug = data.slug || slugify(data.name!);
  await ensureUniqueSlug(data.slug);
  if (data.order === undefined) data.order = await Product.countDocuments();
  return Product.create(data);
}

export async function update(id: string, body: any) {
  requireDb();
  const product = await findByIdOrFail(id);
  const data = pickInput(body, true);
  if (data.slug && data.slug !== product.slug) await ensureUniqueSlug(data.slug, id);
  product.set(data);
  return product.save();
}

export async function remove(id: string) {
  requireDb();
  const product = await findByIdOrFail(id);
  if (product.image?.publicId && isCloudinaryConfigured()) {
    // Si Cloudinary falla no se bloquea el borrado: queda una imagen huérfana, no un producto fantasma.
    await deleteImage(product.image.publicId).catch(() => undefined);
  }
  await product.deleteOne();
}

export async function setImage(id: string, file?: Express.Multer.File) {
  requireDb();
  if (!file) throw new CustomError("Adjunta una imagen", 400);
  if (!file.mimetype.startsWith("image/"))
    throw new CustomError("El archivo debe ser una imagen", 400);
  const product = await findByIdOrFail(id);
  const previous = product.image?.publicId;
  const uploaded = await uploadBuffer(file.buffer, FOLDER);
  product.image = uploaded;
  await product.save();
  if (previous) await deleteImage(previous).catch(() => undefined);
  return product;
}

export async function clearImage(id: string) {
  requireDb();
  const product = await findByIdOrFail(id);
  const previous = product.image?.publicId;
  product.image = { url: "", publicId: "" };
  await product.save();
  if (previous && isCloudinaryConfigured()) await deleteImage(previous).catch(() => undefined);
  return product;
}
