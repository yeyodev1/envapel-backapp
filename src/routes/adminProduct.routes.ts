import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import * as productController from "../controllers/product.controller";

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get("/", productController.listAll);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);
router.post("/:id/image", uploadMiddleware.single("image"), productController.setImage);
router.delete("/:id/image", productController.clearImage);

export default router;
