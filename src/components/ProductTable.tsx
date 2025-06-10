import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  image: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
}

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-secondary text-success-primary';
      case 'low_stock':
        return 'bg-warning-secondary text-warning-primary';
      case 'out_of_stock':
        return 'bg-error-secondary text-error-primary';
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-lg bg-background-primary">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="text-text-secondary font-medium px-4 py-2">Image</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">Name</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">SKU</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">Price</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">Stock</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">Status</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-b last:border-b-0">
              <TableCell className="px-4 py-4">
                <img src={product.image} alt={product.name} className="w-11 h-11 object-cover rounded" />
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4">{product.name}</TableCell>
              <TableCell className="text-text-primary px-4 py-4">{product.sku}</TableCell>
              <TableCell className="text-text-primary px-4 py-4">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-text-primary px-4 py-4">{product.stock}</TableCell>
              <TableCell className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyles(product.status)}`}>
                  {product.status.replace('_', ' ')}
                </span>
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 hover:bg-background-hover rounded-md text-text-secondary border border-border-primary">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 hover:bg-background-hover rounded-md text-error-primary border border-error-primary">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable; 