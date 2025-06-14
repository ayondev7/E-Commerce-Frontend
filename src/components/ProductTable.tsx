"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteProductModal from './DeleteProductModal';

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditClick = (productId: string) => {
    router.push(`/edit-product/1`);
  };

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
    <>
      <div className="border border-border-primary rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-primary">
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
              <TableRow key={product.id} className="border-b last:border-b-0 border-border-primary">
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
                  <div className="flex gap-2.5">
                    <button 
                      onClick={() => handleEditClick(product.id)}
                      className="flex items-center justify-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                    >
                      <Edit className="w-5 h-5" />
                      <span className="font-medium">Edit</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(product)}
                      className="flex border border-danger-border justify-center items-center min-h-10 min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-button-primary text-base cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span className="font-medium">Delete</span>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedProduct && (
        <DeleteProductModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
          productName={selectedProduct.name}
        />
      )}
    </>
  );
};

export default ProductTable;
