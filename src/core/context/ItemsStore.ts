import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartListItem } from "../types";

type ItemState = {
  items: CartListItem[];
  addItem: (item: CartListItem) => void;
  removeItem: (item: CartListItem) => void;
  updateItem: (item: CartListItem) => void;
  increaseItemQuantity: (itemId: string) => void;
  decreaseItemQuantity: (itemId: string) => void;
  getTotalCost: () => number;
};

const useItemStore = create<ItemState>(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: Item) => {
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
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        })),
      updateItem: (item) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === item.id ? item : i)),
        })),
      increaseItemQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),
      decreaseItemQuantity: (itemId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          ),
        })),
      getTotalCost: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    { name: "item-store" }
  )
);

export default useItemStore;
