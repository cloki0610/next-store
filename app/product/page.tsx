"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Stripe from "stripe";

import { addItemToCart } from "../(store)/cart";
import { RootState, useAppSelector, useAppDispatch } from "../(store)/store";

export default function ProductPage({
    searchParams,
}: {
    searchParams: { price_id: string };
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const price_id = searchParams.price_id;
    const product = useAppSelector((state: RootState) => state.cart.product);
    const { name, description, amount, productInfo } = product;
    let images = [""];
    if (productInfo && typeof productInfo !== "string") {
        const info = productInfo as Stripe.Product;
        images = info.images;
    }

    const handleAddToCart = () => {
        const newItem = {
            quantity: 1,
            price_id,
            name,
            amount,
        };
        dispatch(addItemToCart({ newItem }));
    };

    if (!product?.name) router.push("/");

    return (
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
                <div className="md:p-2 md:shadow">
                    <Image
                        src={images[0]}
                        alt={name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex md:flex-col md:items-start text-xl  items-center justify-between gap-2">
                        <h3>{name}</h3>
                        <p className="md:text-base">
                            {amount ? amount / 100 : 0} GBP
                        </p>
                    </div>
                    <p className="text-sm flex-1">{description}</p>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary text-white hover:bg-secondary hover:scale-110 rounded cursor-pointer ml-auto px-4 py-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
