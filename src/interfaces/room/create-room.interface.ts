export interface CreateRoomDTO {
  name: string;
  description?: string;
  basePrice: number;
  capacity: number;
  totalRoom: number;
}