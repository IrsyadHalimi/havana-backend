import { Request, Response } from "express";
import { createProperty } from "../../services/property/create-property.service";
import { listProperty } from "../../services/property/list-property.service";
import { updateProperty } from "../../services/property/update-property.service";
import { detailProperty } from "../../services/property/detail-property.service";
import { deleteProperty } from "../../services/property/delete-property.service";

export const create = async (req: Request, res: Response) => {
  const result = await createProperty()(req.user!.id, req.body);
  return res.status(201).json(result);
};

export const list = async (req: Request, res: Response) => {
  const result = await listProperty()(req.user!.id, req.query);
  return res.json(result);
};

export const update = async (req: Request, res: Response) => {
  const result = await updateProperty()(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  return res.json(result);
};

export const detail = async (req: Request, res: Response) => {
  const result = await detailProperty()(req.user!.id, req.params.id as string);
  return res.json(result);
};

export const deleteCtrl = async (req: Request, res: Response) => {
  const result = await deleteProperty()(req.user!.id, req.params.id as string);
  return res.json(result);
};