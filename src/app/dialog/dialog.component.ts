import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NestedDialogComponent } from '../nested-dialog/nested-dialog.component';
interface Items {
  "id": string,
  "radioOptions": string,
  "date": string,
  "message": string,
  "file": boolean,
  "selectedOption":string,
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  items: Items[] = [];
  ngOnInit(): void {
    this.items = JSON.parse(window.localStorage.getItem('todo')!);
    // console.log(this.items);
  }
  nestedDialog() {
    const dialogRef = this.dialog.open(NestedDialogComponent, {
      width: '30%',
      height: '42%',
      panelClass: 'nestedClass',
      data:{
        "id": '',
        "radioOptions": "#f6d9d5",
        "date": "",
        "message": "",
        "file": false,
        "selectedOption":"1",
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.items = JSON.parse(window.localStorage.getItem('todo')!);
      // console.log(this.items);
    });
  }
  perItem(id:any){
    // console.log(id);
    const itemData = this.items.find(a => a.id === id);
    // console.log(itemData);
    const dialogRef = this.dialog.open(NestedDialogComponent, {
      width: '40%',
      height: '42%',
      panelClass: 'nestedClass',
      data: itemData,
    });
    dialogRef.afterClosed().subscribe(data => {
      this.items = JSON.parse(window.localStorage.getItem('todo')!);
      // console.log(this.items);
    });
  }
}
