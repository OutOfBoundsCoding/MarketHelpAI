import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartListItem } from "../types";

type ItemState = {
  items: CartListItem[];
  addItem: (item: CartListItem) => void;
  removeItem: (barcode: string) => void;
  updateItem: (item: CartListItem) => void;
  increaseItemQuantity: (barcode: string) => void;
  decreaseItemQuantity: (barcode: string) => void;
  getTotalCost: () => number;
  clearCart: () => void;
};

const useCartStore = create<ItemState>((set, get) => ({
  items: [],
  addItem: (item: CartListItem) => {
    const items = [...get().items];
    const existingItemIndex = items.findIndex(
      (i) => i.barcodeData === item.barcodeData
    );
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }
    set({ items });
  },
  removeItem: (barcode: string) =>
    set((state) => ({
      items: state.items.filter((i) => i.barcodeData !== barcode),
    })),
  updateItem: (item) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.barcodeData === item.barcodeData ? item : i
      ),
    })),
  increaseItemQuantity: (barcode: string) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.barcodeData === barcode ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),
  decreaseItemQuantity: (barcode: string) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.barcodeData === barcode ? { ...i, quantity: i.quantity - 1 } : i
      ),
    })),
  getTotalCost: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),
  clearCart: () => {
    set({ items: [] });
  },
}));

export default useCartStore;
