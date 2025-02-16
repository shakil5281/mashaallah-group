import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file = data.get("image") as File;
        let imageUrl = "";

        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadRes: any = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(
                    { resource_type: "image" },
                    (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    }
                ).end(buffer);
            });

            imageUrl = uploadRes?.secure_url;
        }

        const product = await prisma.product.create({
            data: {
                name: data.get("name") as string,
                description: data.get("description") as string,
                quantity: Number(data.get("quantity")),
                weight: Number(data.get("weight")),
                weightUnit: data.get("weightUnit") as any, // Ensure frontend sends a valid enum value
                mrp: Number(data.get("mrp")),
                traderPrice: Number(data.get("traderPrice")),
                image: imageUrl,
                expireDate: new Date(data.get("expireDate") as string),
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}




export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }, // Fetch latest products first
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
