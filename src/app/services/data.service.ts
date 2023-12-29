/* // data.service.ts

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private database!: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  initDatabase(): Promise<void> {
    return this.sqlite
      .create({
        name: 'your_database.db',
        location: 'default',
        createFromLocation: 1,

      })
      .then((db: SQLiteObject) => {
        this.database = db;
        return this.createTable();
      })
      .then(() => {
        console.log('Database and table are initialized successfully');
      })
      .catch((error) => console.error('Error opening database', error));
  }

  private createTable(): Promise<void> {
    const query = 'CREATE TABLE IF NOT EXISTS your_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
    return this.database.executeSql(query, [])
      .then(() => console.log('Table created successfully'))
      .catch((error) => console.error('Error creating table', error));
  }

  executeQuery(query: string, params: any[] = []): Promise<any> {
    return this.database.executeSql(query, params)
      .then((result) => result)
      .catch((error) => console.error('Error executing query', error));
  }
}
 */


// data.service.ts

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private database!: SQLiteObject;

  constructor(private sqlite: SQLite, private file: File) { }
  /* 
    initDatabase(): Promise<void> {
      return this.copyDatabase()
        .then(() => this.openDatabase())
        .then(() => this.createTable())
        .then(() => console.log('Database and table are initialized successfully'))
        .catch((error) => console.error('Error initializing database', error));
    }
   */
  /*   private copyDatabase(): Promise<void> {
      const srcDatabasePath = 'src/assets/your_database.db';
      const destDatabasePath = this.file.dataDirectory + 'your_database.db';
  
      return this.file.copyFile(srcDatabasePath, 'your_database.db', this.file.dataDirectory, 'your_database.db')
        .then(() => console.log('Database copied to writable location'))
        .catch((error: any) => {
          // Handle the error appropriately
          console.error('Error copying database', error);
          throw error;
        });
    } */

  /* 
    private copyDatabase(): Promise<void> {
      const srcDatabasePath = 'src/assets/your_database.db';
      const destDatabasePath = this.file.dataDirectory + 'your_database.db';
  
      return new Promise<void>((resolve, reject) => {
        this.file.copyFile(srcDatabasePath, 'your_database.db', this.file.dataDirectory, 'your_database.db')
          .then(() => {
            console.log('Database copied to writable location');
            resolve();  // Resolve the Promise on success
          })
          .catch((error: any) => {
            // Handle the error appropriately
            console.error('Error copying database', error);
            reject(error);  // Reject the Promise on error
          });
      });
    }
  
  
    private openDatabase(): Promise<any> {
      return this.sqlite.create({
        name: 'your_database.db',
        location: 'default',
      })
        .then((db: SQLiteObject) => this.database = db)
        .catch((error) => {
          // Handle the error appropriately
          console.error('Error opening database', error);
          throw error;
        });
    }
  
    private createTable(): Promise<void> {
      const query = 'CREATE TABLE IF NOT EXISTS your_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
      return this.database.executeSql(query, [])
        .then(() => console.log('Table created successfully'))
        .catch((error) => {
          // Handle the error appropriately
          console.error('Error creating table', error);
          throw error;
        });
    }
  
    executeQuery(query: string, params: any[] = []): Promise<any> {
      return this.database.executeSql(query, params)
        .then((result) => result)
        .catch((error) => {
          // Handle the error appropriately
          console.error('Error executing query', error);
          throw error;
        });
    } */




  initDatabase(): Promise<void> {
    return this.copyDatabase()
      .then(() => this.openDatabase())
      .then(() => this.createTable())
      .then(() => {
        console.log('Database and table are initialized successfully');
      })
      .catch((error) => {
        console.error('Error initializing database', error);
        throw error; // Ensure the error is propagated in case it's not caught elsewhere
      });
  }

  private copyDatabase(): Promise<void> {
    const srcDatabasePath = 'src/assets/your_database.db';
    const destDatabasePath = this.file.dataDirectory + 'your_database.db';

    console.log('destDatabasePath', destDatabasePath)
    console.log('file.dataDirectory', this.file.dataDirectory)

    return new Promise<void>((resolve, reject) => {
      this.file.copyFile(srcDatabasePath, 'your_database.db', this.file.dataDirectory, 'your_database.db')
        .then(() => {
          console.log('Database copied to writable location');
          resolve();
        })
        .catch((error: any) => {
          console.error('Error copying database', error);
          reject(error);
        });
    });
  }

  private openDatabase(): Promise<void> {
    return this.sqlite.create({
      name: 'your_database.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        this.database = db;
      })
      .catch((error) => {
        console.error('Error opening database', error);
        throw error;
      });
  }

  private createTable(): Promise<void> {
    const query = 'CREATE TABLE IF NOT EXISTS your_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)';
    return this.database.executeSql(query, [])
      .then(() => console.log('Table created successfully'))
      .catch((error) => {
        console.error('Error creating table', error);
        throw error;
      });
  }
  async executeQuery(query: string, params: any[] = []): Promise<any> {
    return this.database.executeSql(query, params)
      .then((result) => result)
      .catch((error) => {
        // Handle the error appropriately
        console.error('Error executing query', error);
        throw error;
      });

  }
}