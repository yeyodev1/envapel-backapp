/**
 * Sincroniza el contenido del catálogo oficial con la base: actualiza por slug
 * los textos y especificaciones, y crea lo que falte. No toca la imagen, el
 * orden ni el estado de publicación, que son del panel de Envapel.
 * Uso: pnpm sync:products
 */
import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config/env";
import { Product } from "../models/product.model";
import { seedProducts } from "../data/catalog.seed";

async function main() {
  await mongoose.connect(env.DB_URI);

  let created = 0;
  let updated = 0;
  for (const [order, item] of seedProducts.entries()) {
    const { slug, ...content } = item;
    const result = await Product.updateOne(
      { slug },
      {
        $set: content,
        $setOnInsert: { slug, order, isPublished: true },
      },
      { upsert: true },
    );
    if (result.upsertedCount) created++;
    else if (result.modifiedCount) updated++;
  }

  console.log(
    `Productos actualizados: ${updated}. Creados: ${created}. Sin cambios: ${seedProducts.length - updated - created}.`,
  );
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
