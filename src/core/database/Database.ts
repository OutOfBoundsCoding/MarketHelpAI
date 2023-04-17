import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("items.db");

const SQL_STATEMENT = {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode TEXT,
    name TEXT,
    price REAL,
    quantity INTEGER
  )`,
  INSERT_ITEM: `INSERT INTO items (barcode, name, price, quantity) VALUES (?, ?, ?, ?)`,
  SELECT_ALL_ITEMS: `SELECT * FROM items`,
  SELECT_ITEM_BY_BARCODE: `SELECT * FROM items WHERE barcode = ?`,
  UPDATE_ITEM_BY_BARCODE: `UPDATE items SET name = ?, price = ?, quantity = ? WHERE barcode = ?`,
  DELETE_ITEM_BY_BARCODE: `DELETE FROM items WHERE barcode = ?`,
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

const addItem = async (
  barcode: string,
  name: string,
  price: number,
  quantity: number
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.INSERT_ITEM,
        [barcode, name, price, quantity],
        (_, result) => resolve(result.insertId),
        (_, error) => {
          reject(null);
          return false;
        }
      );
    });
  });
};

const getAllItems = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.SELECT_ALL_ITEMS,
        [],
        (_, result) => resolve(result.rows._array),
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

const updateItemByBarcode = async (
  barcode: string,
  name: string,
  price: number,
  quantity: number
) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        SQL_STATEMENT.UPDATE_ITEM_BY_BARCODE,
        [name, price, quantity, barcode],
        (_, result) => resolve(result.rowsAffected),
        (_, error) => {
          reject(null);
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
          reject(null);
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
  addItem,
  getAllItems,
  getItemByBarcode,
  updateItemByBarcode,
  deleteItemByBarcode,
};
