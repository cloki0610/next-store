"use client";
import Link from "next/link";
import React from "react";

import { setOpenModal } from "../(store)/cart";
import { RootState, useAppSelector, useAppDispatch } from "../(store)/store";
import Modal from "./Modal";

export default function Header() {
    const dispatch = useAppDispatch();
    const openModal = useAppSelector(
        (state: RootState) => state.cart.openModal
    );
    const cartItems = useAppSelector((state: RootState) => state.cart.cart);

    return (
        <header className="sticky top-0 p-4 sm:p-6 bg-primary shadow-md z-50 text-2xl sm:text-3xl md:text-4xl flex item-center justify-between">
            {openModal && <Modal />}
            <Link
                href="/"
                className="after:content-[''] after:block after:mt-1 after:w-0 after:h-[5px] after:bg-secondary after:duration-300 hover:after:w-full"
            >
                <h1 className="text-secondary uppercase cursor-pointer">
                    <i className="fa-solid fa-gear fa-spin"></i>
                    <span className="pl-3 font-bold">Cycle</span>
                </h1>
            </Link>
            <div
                onClick={() => dispatch(setOpenModal())}
                className="relative cursor-pointer group grid place-items-center"
            >
                {cartItems.length > 0 && (
                    <div className="absolute aspect-square pointer-events-none h-5 sm:h-6 grid place-items-center top-0 bg-amber-300 text-white rounded-full right-0 -translate-y-1/2 translate-x-1/2">
                        <p className="text-xs sm:text-sm">{cartItems.length}</p>
                    </div>
                )}
                <i className="fa-solid fa-cart-shopping text-secondary cursor-pointer hover:opacity-70 hover:scale-110"></i>
            </div>
        </header>
    );
}
