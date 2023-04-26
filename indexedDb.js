class InnerDbConnection {
    constructor(database) {
        this.database = database;
    }

    openStore(store, mode) {
        const tx = this.database.transaction(store, mode);
        return tx.objectStore(store);
    }

    async put(store, obj, key) {
        const os = this.openStore(store, "readwrite");

        return await new Promise((resolve, reject) => {
            const response = os.put(obj, key);
            response.onsuccess = () => {
                resolve(response.result);
                console.log(response.result)
            };
            response.onerror = () => {
                reject(response.error);
            };
        });
    }

    get(store, key) {
        const os = this.openStore(store, "readonly");

        return new Promise((resolve, reject) => {
            const response = os.get(key);
            response.onsuccess = () => {
                resolve(response.result);
            };
            response.onerror = () => {
                reject(response.error);
            };
        });
    }

    getAll(store) {
        const os = this.openStore(store, "readonly");

        return new Promise((resolve, reject) => {
            const response = os.getAll();
            response.onsuccess = () => {
                resolve(response.result);
            };
            response.onerror = () => {
                reject(response.error);
            };
        });
    }

    getAllKeys(store) {
        const os = this.openStore(store, "readonly");

        return new Promise((resolve, reject) => {
            const response = os.getAllKeys();
            response.onsuccess = () => {
                resolve(response.result);
            };
            response.onerror = () => {
                reject(response.error);
            };
        });
    }

    async delete(store, key) {
        const os = this.openStore(store, "readwrite");

        return await new Promise((resolve, reject) => {
            const response = os.delete(key);
            response.onsuccess = () => {
                resolve();
            };
            response.onerror = () => {
                reject(response.error);
            };
        });
    }

    close() {
        this.database.close();
    }
}

class IndexedDbWrapper {
    constructor(databaseName, databaseVersion, objectStores) {
        this.databaseName = databaseName;
        this.databaseVersion = databaseVersion;
        this.objectStores = objectStores;
    }

    async connect() {
        console.log(this.databaseName, this.databaseVersion, this.objectStores)
        const conn = window.indexedDB.open(this.databaseName, this.databaseVersion);

        conn.onupgradeneeded = event => {
            const db = (event.target).result;
            this.objectStores.forEach(store => {
                db.createObjectStore(store);
            });
        };

        return await new Promise((resolve, reject) => {
            conn.onsuccess = event => {
                resolve(new InnerDbConnection((event.target).result));
            };
            conn.onerror = event => {
                reject((event.target).error);
            };
        });
    }
}

let inpixioDb = undefined;

export function initializeDb(databaseName, databaseVersion, objectStores) {
    console.log("initializeDb")

    if (!inpixioDb)
        inpixioDb = new IndexedDbWrapper(databaseName, databaseVersion, objectStores);
    console.log(databaseName, objectStores)
}

export async function getFromDb(store, key) {
    if (!inpixioDb)
        throw new Error("Database not initialized");

    let conn;
    try {
        conn = await inpixioDb.connect();
        const value = await conn.get(store, key);
        return value;
    } catch (e) {
        throw e;
    } finally {
        if (conn)
            conn.close();
    }
}

export async function getAllValuesFromDb(store) {
    if (!inpixioDb)
        throw new Error("Database not initialized");

    let conn;
    try {
        conn = await inpixioDb.connect();
        const value = await conn.getAll(store);
        return JSON.stringify(value);
    } catch (e) {
        throw e;
    } finally {
        if (conn)
            conn.close();
    }
}

export async function getAllKeysFromDb(store) {
    if (!inpixioDb)
        throw new Error("Database not initialized");

    let conn;
    try {
        conn = await inpixioDb.connect();
        const keys = await conn.getAllKeys(store);
        return JSON.stringify(keys);
    } catch (e) {
        throw e;
    } finally {
        if (conn)
            conn.close();
    }
}

export async function putToDb(store, key, value) {
    if (!inpixioDb)
        throw new Error("Database not initialized");
    let conn;
    try {
        conn = await inpixioDb.connect();
        await conn.put(store, value, key);
    } catch (e) {
        throw e;
    } finally {
        if (conn)
            conn.close();
    }
}

export async function deleteFromDb(store, key) {
    if (!inpixioDb)
        throw new Error("Database not initialized");

    let conn;
    try {
        conn = await inpixioDb.connect();
        await conn.delete(store, key);
    }
    catch (e) {
        throw e;
    } finally {
        if (conn)
            conn.close();
    }
}