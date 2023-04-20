import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Stripe from "stripe";

interface cartProduct {
    name: string;
    description: string | null;
    price_id: string;
    amount: number | null;
    productInfo: string | Stripe.Product | Stripe.DeletedProduct;
}

interface cartItem {
    quantity: number;
    price_id: string;
    name: string;
    amount: number | null;
}

interface cartState {
    cart: cartItem[];
    product: cartProduct;
    openModal: boolean;
}

const initialState: cartState = {
    cart: [],
    product: {} as cartProduct,
    openModal: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setOpenModal: (state) => {
            state.openModal = !state.openModal;
        },
        setProduct: (
            state,
            action: PayloadAction<{ newProduct: cartProduct }>
        ) => {
            state.product = action.payload.newProduct;
        },
        addItemToCart: (
            state,
            action: PayloadAction<{ newItem: cartItem }>
        ) => {
            const itemIndex = state.cart.findIndex((item) => {
                return item.price_id === action.payload.newItem.price_id;
            });
            if (itemIndex >= 0) {
                state.cart[itemIndex].quantity += 1;
            } else {
                state.cart.push(action.payload.newItem);
            }
        },
        removeItemFromCart: (
            state,
            action: PayloadAction<{ itemIndex: number }>
        ) => {
            state.cart = state.cart.filter((_, itemIndex) => {
                return itemIndex !== action.payload.itemIndex;
            });
        },
        emptyCart: (state) => {
            state.cart = [];
        },
    },
});

export const {
    setOpenModal,
    setProduct,
    addItemToCart,
    removeItemFromCart,
    emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
