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
        return 'bg-danger-secondary text-danger-primary';
      default:
        return '';
    }
  };

  return (
    <div className="border rounded-sm bg-background-primary">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Image</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Name</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">SKU</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Price</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Stock</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Status</TableHead>
            <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-b last:border-b-0">
              <TableCell className="px-4 py-4">
                <img src={product.image} alt={product.name} className="w-11 h-11 object-cover rounded-sm" />
              </TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">{product.name}</TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">{product.sku}</TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-text-primary px-4 py-4 text-base">{product.stock}</TableCell>
              <TableCell className="px-4 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(product.status)}`}>
                  {product.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-4 py-2 hover:bg-background-hover rounded-sm text-text-primary border border-border-primary text-base">
                    <Edit className="w-4 h-4" />
                    <span className="font-medium">Edit</span>
                  </button>
                  <button className="flex items-center gap-1 px-4 py-2 hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] text-base">
                    <Trash2 className="w-4 h-4" />
                    <span className="font-medium">Delete</span>
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