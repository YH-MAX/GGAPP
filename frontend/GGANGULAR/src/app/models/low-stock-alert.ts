export interface LowStockAlert {
  productId: number;
  productName: string;
  stockLevel: number;
  lowStockThreshold: number;
}