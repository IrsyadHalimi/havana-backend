import { Request, Response } from "express";
import { createCategory } from "../../services/property-category/create-category.service";
import { deleteCategory } from "../../services/property-category/delete-category.service";
import { detailCategory } from "../../services/property-category/detail-category.service";
import { listCategory } from "../../services/property-category/list-category.service";
import { updateCategory } from "../../services/property-category/update-category.service";

export const create = async (req: Request, res: Response) => {
  const result = await createCategory()(req.user!.id, req.body.name);
  return res.status(201).json(result);
};

export const deleteCategoryCtrl = async (req: Request, res: Response) => {
  const result = await deleteCategory()(req.user!.id, req.params.id as string);
  return res.json(result);
};

export const detail = async (req: Request, res: Response) => {
  const result = await detailCategory()(req.user!.id, req.params.id as string);
  return res.json(result);
};

export const list = async (req: Request, res: Response) => {
  const result = await listCategory()(req.user!.id, req.query);
  return res.json(result);
};

export const update = async (req: Request, res: Response) => {
  const result = await updateCategory()(
    req.user!.id,
    req.params.id as string,
    req.body.name
  );
  return res.json(result);
};