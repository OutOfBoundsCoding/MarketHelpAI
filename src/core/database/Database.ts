import * as SQLite from "expo-sqlite";
import { InventoryItem } from "../types";

const db = SQLite.openDatabase("items.db");

const SQL_STATEMENT = {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode TEXT UNIQUE,
    name TEXT,
    price REAL
  )`,
  INSERT_ITEM: `INSERT INTO items (barcode, name, price) VALUES (?, ?, ?)`,
  SELECT_ALL_ITEMS: `SELECT * FROM items`,
  SELECT_ITEM_BY_BARCODE: `SELECT * FROM items WHERE barcode = ?`,
  UPDATE_ITEM_BY_BARCODE: `UPDATE items SET name = ?, price = ? WHERE barcode = ?`,
  DELETE_ITEM_BY_BARCODE: `DELETE FROM items WHERE barcode = ?`,
  DELETE_DATABASE: `DROP TABLE items`,
};

const initializeDB = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.CREATE_TABLE,
        [],
        (_, result) => resolve(result),
        (_, error) => {
          reject(null);
          return false;
        }
      );
    });
  });
};

const removeTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.DELETE_DATABASE,
        [],
        (_, result) => resolve(result),
        (_, error) => {
          reject(null);
          return false;
        }
      );
    });
  });
};

const insertItem = async (item: InventoryItem) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.INSERT_ITEM,
        [item.barcodeData, item.name, item.price],
        (_, result) => resolve(result.insertId),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

const selectAllItems = async () => {
  return new Promise<InventoryItem[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.SELECT_ALL_ITEMS,
        [],
        (_, result) => {
          const items: InventoryItem[] = result.rows._array.map((row: any) => ({
            id: row.id,
            barcodeData: row.barcode,
            name: row.name,
            price: row.price,
          }));
          resolve(items);
        },
        (_, error) => {
          reject(null);
          return false;
        }
      );
    });
  });
};

const getItemByBarcode = async (barcode: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.SELECT_ITEM_BY_BARCODE,
        [barcode],
        (_, result) => resolve(result.rows._array[0]),
        (_, error) => {
          reject(null);
          return false;
        }
      );
    });
  });
};

const updateItemByBarcode = async (item: InventoryItem) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.UPDATE_ITEM_BY_BARCODE,
        [item.name, item.price, item.barcodeData],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

const deleteItemByBarcode = async (barcode: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.DELETE_ITEM_BY_BARCODE,
        [barcode],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export interface SqlStore {
  initializeDB: () => Promise<any>;
  addItem: (
    barcode: string,
    name: string,
    price: number,
    quantity: number
  ) => Promise<number>;
  getAllItems: () => Promise<any[]>;
  getItemByBarcode: (barcode: string) => Promise<any>;
  updateItemByBarcode: (
    barcode: string,
    name: string,
    price: number,
    quantity: number
  ) => Promise<number>;
  deleteItemByBarcode: (barcode: string) => Promise<number>;
}

export {
  initializeDB,
  removeTable,
  insertItem,
  selectAllItems,
  getItemByBarcode,
  updateItemByBarcode,
  deleteItemByBarcode,
};
