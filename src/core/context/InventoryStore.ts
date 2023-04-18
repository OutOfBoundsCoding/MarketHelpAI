import { create } from "zustand";
import { InventoryItem } from "../types";
import {
  deleteItemByBarcode,
  insertItem,
  selectAllItems,
  updateItemByBarcode,
} from "../database/Database";

type ItemState = {
  inventory: InventoryItem[];
  findItemByBarcode: (barcodeToFind: string) => InventoryItem;
  getAllItems: () => InventoryItem[];
  initializeItems: (items: InventoryItem[]) => void;
  storeItem: (items: InventoryItem) => void;
  updateItem: (items: InventoryItem) => void;
  deleteItem: (barcodeToDelete: string) => void;
};

const useInventoryStore = create<ItemState>((set, get) => ({
  inventory: [],
  findItemByBarcode: (barcodeToFind: string): InventoryItem => {
    return get().inventory.find((item) => item.barcodeData === barcodeToFind);
  },
  getAllItems: (): InventoryItem[] => {
    return get().inventory;
  },
  initializeItems: (items: InventoryItem[]) => {
    set({ inventory: items });
  },
  storeItem: async (item: InventoryItem) => {
    await insertItem(item);
    var updatedItemList = await selectAllItems();
    set({ inventory: updatedItemList });
  },
  updateItem: async (item: InventoryItem) => {
    await updateItemByBarcode(item);
    var updatedItemList = await selectAllItems();
    set({ inventory: updatedItemList });
  },
  deleteItem: async (barcodeToDelete: string) => {
    await deleteItemByBarcode(barcodeToDelete);
    var updatedItemList = await selectAllItems();
    set({ inventory: updatedItemList });
  },
}));

export default useInventoryStore;
