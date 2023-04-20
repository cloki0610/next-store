"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stripe from "stripe";
import { setProduct } from "../(store)/cart";
import { useAppDispatch } from "../(store)/store";

export default function ProductCard({ product }: { product: Stripe.Price }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id: price_id, unit_amount: amount, product: productInfo } = product;
    const { name, description, images } = productInfo as Stripe.Product;

    const onProductClick = () => {
        const newProduct = { name, description, price_id, amount, productInfo };
        dispatch(setProduct({ newProduct }));
        router.push(`/product?price_id=${price_id}`);
    };

    return (
        <div
            onClick={onProductClick}
            className="p-1 flex flex-col shadow bg-primary text-white hover:opacity-70 hover:shadow-lg hover:scale-110 gap-4 cursor-pointer rounded"
        >
            <Image
                src={images[0]}
                width={200}
                height={200}
                alt={name}
                className="w-full object-cover rounded max-h-[200px]"
            />
            <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between">
                    <h3>{name}</h3>
                    <p className="text-sm">{amount ? amount / 100 : 0} GBP</p>
                </div>
                <div className="text-sm">{description}</div>
            </div>
        </div>
    );
}
