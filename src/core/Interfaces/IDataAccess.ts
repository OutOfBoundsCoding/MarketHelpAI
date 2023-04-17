import { Item } from "../types/Item";

export interface IDataAccess {
  createTable(): void;
  addItem(barcodeData: string, name: string, price: number): void;
  updateItem(
    id: number,
    barcodeData: string,
    name: string,
    price: number
  ): void;
  deleteItem(id: number): void;
  getItems(callback: (items: Item[]) => void): void;
}
