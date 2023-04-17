import { create } from "zustand";
import { InventoryItem } from "../types";
import { insertItem } from "../database/Database";

type ItemState = {
  inventory: InventoryItem[];
  findItemByBarcode: (barcodeToFind: string) => InventoryItem;
  getAllItems: () => InventoryItem[];
  storeItems: (items: InventoryItem[]) => void;
  storeItem: (items: InventoryItem) => void;
};

const useInventoryStore = create<ItemState>((set, get) => ({
  inventory: [],
  findItemByBarcode: (barcodeToFind: string): InventoryItem => {
    return get().inventory.find((item) => item.barcodeData === barcodeToFind);
  },
  getAllItems: (): InventoryItem[] => {
    return get().inventory;
  },
  storeItems: (items: InventoryItem[]) => {
    set({ inventory: items });
  },
  storeItem: (item: InventoryItem) => {
    insertItem(item).catch((e) => console.log(e));
  },
}));

export default useInventoryStore;
