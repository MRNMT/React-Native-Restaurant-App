import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalAmount: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            // Simple unique ID generation for cart items to distinguish same product with different options
            const cartItemId = `${newItem.id}-${Date.now()}`;
            state.items.push({ ...newItem, cartItemId });
            state.totalAmount += newItem.totalPrice * newItem.quantity;
        },
        removeFromCart: (state, action) => {
            const cartItemId = action.payload;
            const existingItem = state.items.find(item => item.cartItemId === cartItemId);
            if (existingItem) {
                state.totalAmount -= existingItem.totalPrice * existingItem.quantity;
                state.items = state.items.filter(item => item.cartItemId !== cartItemId);
            }
        },
        updateQuantity: (state, action) => {
            const { cartItemId, quantity } = action.payload;
            const item = state.items.find(i => i.cartItemId === cartItemId);
            if (item) {
                const diffList = quantity - item.quantity;
                item.quantity = quantity;
                state.totalAmount += item.totalPrice * diffList;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
