import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

/** GET /api/products — catálogo público, solo publicados. */
export async function listPublished(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.listPublished());
  } catch (error) {
    next(error);
  }
}

/** GET /api/products/:slug */
export async function getBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.findPublishedBySlug(String(req.params.slug)));
  } catch (error) {
    next(error);
  }
}

/** GET /api/admin/products — incluye borradores. */
export async function listAll(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.listAll());
  } catch (error) {
    next(error);
  }
}

/** POST /api/admin/products */
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await productService.create(req.body));
  } catch (error) {
    next(error);
  }
}

/** PUT /api/admin/products/:id */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.update(String(req.params.id), req.body));
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/admin/products/:id */
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await productService.remove(String(req.params.id));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/** POST /api/admin/products/:id/image — multipart, campo "image". */
export async function setImage(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.setImage(String(req.params.id), req.file));
  } catch (error) {
    next(error);
  }
}

/** DELETE /api/admin/products/:id/image */
export async function clearImage(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await productService.clearImage(String(req.params.id)));
  } catch (error) {
    next(error);
  }
}
