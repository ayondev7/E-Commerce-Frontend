export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  productImages: string[];
  category: string;
  brand: string;
  model: string;
  storage: string;
  colour: string;
  ram: string;

  conditions: string[];
  features: string[];

  specifications: Specification[];

  price: number;
  salePrice?: number;
  quantity: number;
  sku: string;
  negotiable: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;

  sellerId: {
    _id: string;
    name: string;
    email: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface SimplifiedProduct {
  _id: string;
  image: string | null;
  title: string;
  sku: string;
  price: number;
  stock: number;
  model: string;
  colour: string;
  status: 'active' | 'low-stock' | 'out-of-stock';
}
