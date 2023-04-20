"use client";
import { useRouter } from "next/navigation";
import ReactDom from "react-dom";

import { setOpenModal, removeItemFromCart, emptyCart } from "../(store)/cart";
import { RootState, useAppSelector, useAppDispatch } from "../(store)/store";

export default function Modal() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state: RootState) => state.cart.cart);
    const router = useRouter();

    async function checkout() {
        const lineItems = cartItems.map((cartItem) => {
            return {
                price: cartItem.price_id,
                quantity: 1,
            };
        });
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lineItems }),
        });
        const data = await res.json();
        router.push(data.session.url);
    }

    return ReactDom.createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <div
                onClick={() => dispatch(setOpenModal())}
                className="bg-transparent absolute  inset-0"
            >
                {" "}
            </div>
            <div className="flex flex-col bg-white absolute right-0 top-0 h-screen shadow-lg w-screen sm:w-96 max-w-screen gap-4">
                <div className="flex items-center p-6 justify-between text-xl relative bg-primary">
                    <h1 className="text-white font-semibold select-none">
                        Cart
                    </h1>
                    <i
                        onClick={() => dispatch(setOpenModal())}
                        className="fa-solid cursor-pointer hover:opacity-60 fa-xmark text-secondary"
                    ></i>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-secondary w-2/3"></div>
                </div>
                <div className="p-4 overflow-scroll flex-1 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <p className="select-none">
                            There is nothing in your cart.
                        </p>
                    ) : (
                        <>
                            {cartItems.map((cartItem, itemIndex) => {
                                return (
                                    <div
                                        key={itemIndex}
                                        className="flex border-l border-solid border-primary px-2 flex-col gap-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2>{cartItem.name}</h2>
                                            <p>
                                                $
                                                {cartItem.amount
                                                    ? cartItem.amount / 100
                                                    : 0}
                                            </p>
                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            Quantity: {`${cartItem.quantity}`}{" "}
                                            <span
                                                className="text-red-500 ml-6 cursor-pointer"
                                                onClick={() =>
                                                    dispatch(
                                                        removeItemFromCart({
                                                            itemIndex,
                                                        })
                                                    )
                                                }
                                            >
                                                Remove
                                            </span>
                                        </p>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
                <div
                    onClick={checkout}
                    className="border border-solid border-primary text-primary text-xl mx-4 p-3 uppercase grid place-items-center hover:opacity-60 cursor-pointer rounded"
                >
                    Checkout
                </div>
                <div
                    onClick={() => dispatch(emptyCart())}
                    className="border border-solid border-red-500 text-red-500 text-xl mx-4 mb-4 p-3 uppercase grid place-items-center hover:opacity-60 cursor-pointer rounded"
                >
                    Clear Cart
                </div>
            </div>
        </div>,
        document.getElementById("portal")!
    );
}
