// home.page.ts

import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newItemName: string = '';
  data: any[] = [];

  constructor(private dbService: DataService) { }

  insertData() {
    if (this.newItemName.trim() === '') {
      console.error('Item name is required.');
      return;
    }

    const query = 'INSERT INTO your_table (name) VALUES (?)';
    const params = [this.newItemName];

    this.dbService.executeQuery(query, params).then(() => {
      console.log('Data inserted successfully');
      this.newItemName = ''; // Clear the input field after insertion

      // Fetch and display the updated data
      this.fetchData();
    });
  }

  fetchData() {
    const query = 'SELECT * FROM your_table';

    this.dbService.executeQuery(query).then((result) => {
      this.data = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.data.push(result.rows.item(i));
      }
    });
  }
}
