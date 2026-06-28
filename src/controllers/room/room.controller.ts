import { Request, Response } from "express";
import { createRoom } from "../../services/room/create-room.service";
import { deleteRoom } from "../../services/room/delete-room.service";
import { detailRoom } from "../../services/room/detail-room.service";
import { listRoom } from "../../services/room/list-room.service";
import { updateRoom } from "../../services/room/update-room.service";

export const create = async (req: Request, res: Response) => {
  const result = await createRoom()(
    req.user!.id,
    req.params.propertyId as string,
    req.body
  );
  return res.status(201).json(result);
};

export const deleteRoomCtrl = async (req: Request, res: Response) => {
  const result = await deleteRoom()(req.user!.id, req.params.id as string);
  return res.json(result);
};

export const detail = async (req: Request, res: Response) => {
  const result = await detailRoom()(req.user!.id, req.params.id as string);
  return res.json(result);
};

export const list = async (req: Request, res: Response) => {
  const result = await listRoom()(
    req.user!.id,
    req.params.propertyId as string,
    req.query
  );
  return res.json(result);
};

export const update = async (req: Request, res: Response) => {
  const result = await updateRoom()(
    req.user!.id,
    req.params.id as string,
    req.body
  );
  return res.json(result);
};