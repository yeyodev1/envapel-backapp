/**
 * Carga el catálogo inicial. Idempotente: busca por slug y solo crea lo que
 * falta, así nunca pisa lo que Envapel ya editó desde el panel.
 * Uso: pnpm seed:products
 */
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env";
import { Product } from "../models/product.model";
import { seedProducts } from "../data/catalog.seed";

async function main() {
  await mongoose.connect(env.DB_URI);

  let created = 0;
  for (const [order, item] of seedProducts.entries()) {
    const exists = await Product.exists({ slug: item.slug });
    if (exists) continue;
    await Product.create({ ...item, order, isPublished: true });
    created++;
  }

  console.log(`Productos creados: ${created}. Ya existían: ${seedProducts.length - created}.`);
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
