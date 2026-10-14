import express, { Application } from "express";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import productRoutes from "./product.routes";
import adminProductRoutes from "./adminProduct.routes";

function routerApi(app: Application) {
  const router = express.Router();
  app.use("/api", router);

  router.use("/health", healthRoutes);
  router.use("/auth", authRoutes);
  router.use("/products", productRoutes);
  router.use("/admin/products", adminProductRoutes);
}

export default routerApi;
