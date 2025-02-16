import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";

// Cloudinary Configuration
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Update Product
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const productId = params.id;
//     const data = await req.formData();

//     const file = data.get("image") as File;
//     let imageUrl = data.get("existingImage") as string; // Keep old image if no new one is provided

//     if (file) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       // Upload new image to Cloudinary
//       const uploadRes: any = await new Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload_stream(
//           { resource_type: "image" },
//           (err, result) => {
//             if (err) reject(err);
//             resolve(result);
//           }
//         ).end(buffer);
//       });

//       imageUrl = uploadRes?.secure_url;
//     }

//     const updatedProduct = await prisma.product.update({
//       where: { id: productId },
//       data: {
//         name: data.get("name") as string,
//         description: data.get("description") as string,
//         quantity: Number(data.get("quantity")),
//         weight: Number(data.get("weight")),
//         weightUnit: data.get("weightUnit") as any, // Ensure this is a valid enum value
//         mrp: Number(data.get("mrp")),
//         traderPrice: Number(data.get("traderPrice")),
//         image: imageUrl,
//         expireDate: new Date(data.get("expireDate") as string),
//       },
//     });

//     return NextResponse.json(updatedProduct);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
//   }
// }




// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const productId = params.id;

//     // Find the product to get its image URL
//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     // Extract Cloudinary Public ID from Image URL
//     if (product.image) {
//       const imagePublicId = product.image.split("/").pop()?.split(".")[0]; // Extract public ID
//       await cloudinary.v2.uploader.destroy(imagePublicId as string); // Delete image from Cloudinary
//     }

//     // Delete product from the database
//     await prisma.product.delete({
//       where: { id: productId },
//     });

//     return NextResponse.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
//   }
// }



// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     // Find product by ID
//     const product = await prisma.product.findUnique({
//       where: { id },
//     });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
//   }
// }
