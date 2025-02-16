import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: "1",
    name: "Apple",
    description: "Fresh Red Apples",
    quantity: 50,
    weight: 1.5,
    mrp: 200.0,
    traderPrice: 180.0,
    image: "apple.jpg",
    expireDate: "2025-03-10",
  },
  {
    id: "2",
    name: "Banana",
    description: "Organic Bananas",
    quantity: 100,
    weight: 1.2,
    mrp: 150.0,
    traderPrice: 130.0,
    image: "banana.jpg",
    expireDate: "2025-03-15",
  },
  {
    id: "3",
    name: "Milk",
    description: "Dairy Fresh Milk",
    quantity: 30,
    weight: 2.0,
    mrp: 120.0,
    traderPrice: 100.0,
    image: "milk.jpg",
    expireDate: "2025-02-28",
  },
];

export default function ProductTable() {
  return (
    <Table>
      <TableCaption>A list of available products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead>MRP ($)</TableHead>
          <TableHead>Trader Price ($)</TableHead>
          <TableHead>Expire Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.weight}</TableCell>
            <TableCell>{product.mrp}</TableCell>
            <TableCell>{product.traderPrice}</TableCell>
            <TableCell>{product.expireDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Products</TableCell>
          <TableCell className="text-right">{products.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}