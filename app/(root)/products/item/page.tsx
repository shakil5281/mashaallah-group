"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const ProductSchema = z.object({
    name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
    description: z.string().min(5, { message: "Description must be at least 5 characters." }),
    quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
    weight: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1 kg." }),
    mrp: z.coerce.number().min(1, { message: "MRP must be at least 1." }),
    traderPrice: z.coerce.number().min(1, { message: "Trader price must be at least 1." }),
    image: z.any().optional(), // Allow image file
    expireDate: z.date({ required_error: "A valid expiration date is required." }),
});

export default function ProductForm() {
    const [products, setProducts] = useState<any[]>([]);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            description: "",
            quantity: 1,
            weight: 0.1,
            mrp: 1,
            traderPrice: 1,
            image: "",
            expireDate: undefined,
        },
    });

    async function onSubmit(data: z.infer<typeof ProductSchema>) {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("quantity", data.quantity.toString());
            formData.append("weight", data.weight.toString());
            formData.append("mrp", data.mrp.toString());
            formData.append("traderPrice", data.traderPrice.toString());
            formData.append("expireDate", data.expireDate.toISOString());

            if (data.image instanceof FileList && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }

            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to submit product");

            const newProduct = await res.json();
            toast.success("Product added successfully!");

            setProducts((prev) => [...prev, newProduct]);
        } catch (err: any) {
            toast.error(err.message || "Something went wrong!");
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="max-w-3xl lg:grid flex flex-col  lg:grid-cols-2 lg:gap-6 gap-3 mx-auto p-4 bg-white shadow-lg rounded-lg"
            >
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Quantity */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="traderPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image Upload (Mobile Camera) */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, ref } }) => (
                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    capture="environment" // Enables mobile camera
                                    ref={ref}
                                    onChange={(e) => onChange(e.target.files)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Expiration Date */}
                <FormField
                    control={form.control}
                    name="expireDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full justify-center">
                            <FormLabel>Expiration Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline">
                                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="col-span-2">
                    <Button type="submit" className="w-full">Submit</Button>
                </div>
            </form>
        </Form>
    );
}
