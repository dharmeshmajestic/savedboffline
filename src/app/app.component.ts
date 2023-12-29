// app.component.ts

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private dbService: DataService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      this.dbService.initDatabase();


    })
  }



  /* this.platform.ready().then(() => {
    this.storage = new SQLite();
    this.storage.openDatabase({ name: "data.db", location: 'default', createFromLocation: 1 }).then((success) => {
      this.storage.executeSql("SELECT * FROM your_table", {}).then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++) {
          this.itemList.push({
            id: rows.item(i).id
          });
        }
      }, (error) => {
        console.info("Unable to execute sql " + JSON.stringify(error));
      })
    }, (err) => {
      console.info("Error opening database: " + err);
    });
  });
  } */
}
