export interface CreatePropertyDTO {
  categoryId: string;
  name: string;
  description: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
}