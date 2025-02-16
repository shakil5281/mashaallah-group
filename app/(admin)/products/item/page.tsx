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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea";

const ProductSchema = z.object({
    name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
    description: z.string().min(5, { message: "Description must be at least 5 characters." }),
    quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
    weight: z.coerce.number().min(0.1, { message: "Weight must be at least 0.1 kg." }),
    weightUnit: z.enum(["LITER", "ML", "KG", "GM"]),
    mrp: z.coerce.number().min(1, { message: "MRP must be at least 1." }),
    traderPrice: z.coerce.number().min(1, { message: "Trader price must be at least 1." }),
    image: z.any().optional(), // Allow image file
    expireDate: z.date({ required_error: "A valid expiration date is required." }),
});

export default function ProductForm() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            quantity: undefined,
            weight: undefined,
            weightUnit: 'KG',
            mrp: undefined,
            traderPrice: undefined,
            image: "",
            expireDate: undefined,
            description: "",
        },
    });

    async function onSubmit(data: z.infer<typeof ProductSchema>) {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("quantity", data.quantity.toString());
            formData.append("weight", data.weight.toString());
            formData.append("weightUnit", data.weightUnit);
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
        } finally {
            setLoading(false)
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

                {/* Quantity */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Quantity</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product quantity" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                            <FormLabel>Product Weight</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product weight" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="weightUnit"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product weightUnit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a weight unit" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        ["LITER", "ML", "KG", "GM"].map((item, index) => (
                                            <SelectItem key={index} value={item}>{item}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product MRP</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your prodct MRP" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                            <FormLabel>Product Trade Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your product trader price" type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                        <FormItem className="">
                            <FormLabel className="">Expiration Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl className="w-full flex">
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
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter product description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="col-span-2">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!form.formState.isValid || loading}
                    >
                        {loading ? "Loading..." : "Submit"}</Button>
                </div>
            </form>
        </Form>
    );
}
