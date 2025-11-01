export interface Promotion {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  validUntil?: string; // ISO
  restaurantId: number;
  restaurantName: string;
}
