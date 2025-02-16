"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  quantity: number;
  weight: number;
  weightUnit: string;
  mrp: number;
  traderPrice: number;
  image: string;
  expireDate: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Error loading products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center p-4">Loading products...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <Table>
      <TableCaption>A list of all available products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>MRP</TableHead>
          <TableHead>Trader Price</TableHead>
          <TableHead>Expire Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow className="cursor-pointer" onClick={()=>router.push(`/products/${product.id}`)} key={product.id}>
            <TableCell>
              <CldImage src={product.image} alt={product.name} width={50} height={50} className="rounded-md" />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              {product.weight} {product.weightUnit}
            </TableCell>
            <TableCell>${product.mrp.toFixed(2)}</TableCell>
            <TableCell>${product.traderPrice.toFixed(2)}</TableCell>
            <TableCell>{new Date(product.expireDate).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Products</TableCell>
          <TableCell colSpan={3} className="text-right">{products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
