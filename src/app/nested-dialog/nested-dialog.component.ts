import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
interface Items {
  "id": string,
  "radioOptions": string,
  "date": string,
  "message": string,
  "file": boolean,
  "selectedOption": string,
}
@Component({
  selector: 'app-nested-dialog',
  templateUrl: './nested-dialog.component.html',
  styleUrls: ['./nested-dialog.component.css']
})
export class NestedDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Items, private fb: FormBuilder, public dialogRef: MatDialogRef<NestedDialogComponent>) { }
  notedate = false;
  attachments = false;
  selected = "#f6d9d5";
  selectedOptions = '';
  localId = '';
  status=false;
  fileSelected = false;
  textInput = '';
  nestedDialog = document.querySelectorAll(".mat-dialog-container")[1] as HTMLElement;
  nestedClass = document.querySelector(".nestedClass") as HTMLElement;
  radioOptions = [
    { label: 'Note Only', value: '1', checked: true }, { label: 'Note + Date', value: '2', checked: false }, { label: 'Note + Date + Attachment', value: '3', checked: false }
  ]
  ngOnInit(): void {
    this.form = this.fb.group({
      format2: new FormControl()
    });
    // console.log(this.data);
    this.nestedDialog.style.backgroundColor = "#f6d9d5";
    this.selected = this.data.radioOptions;
    this.localId = this.data.id;
    this.radioOptions.map(x => {
      if (x.value == this.data.selectedOption) {
        x.checked = true;
      }
      else {
        x.checked = false;
      }
    })
    this.status=this.data.id!=''?false:true;
    this.fileSelected = this.data.file;
    this.textInput = this.data.message;
    this.radiochange({ value: this.data.selectedOption })
    if (this.data.date != '') {
      this.form.get('format2')?.setValue(new Date(this.data.date));
    }
  }
  radiochange(e: any) {
    switch (e.value) {
      case "1":
        this.nestedDialog.style.backgroundColor = "#f6d9d5";
        this.notedate = false;
        this.selected = "#f6d9d5";
        this.attachments = false;
        this.selectedOptions = e.value;
        this.fileSelected = false;
        this.nestedClass.style.height = "42%";
        break;
      case "2":
        this.nestedDialog.style.backgroundColor = "#e6f8d2";
        this.notedate = true;
        this.attachments = false;
        this.fileSelected = false;
        this.selected = "#e6f8d2";
        this.selectedOptions = e.value;
        this.nestedClass.style.height = "50%";
        break;
      default:
        this.nestedDialog.style.backgroundColor = "#e8f2fe";
        this.notedate = true;
        // this.fileSelected = false;
        this.selectedOptions = e.value;
        this.selected = "#e8f2fe";
        this.attachments = true;
        this.nestedClass.style.height = "50%";
    }
  }
  onFileSelected() {
    alert("File selected");
    this.fileSelected = true;
  }
  addData() {
    if(this.selectedOptions!='1' && this.form.value.format2 == null){
      return;
    }
    if(this.selectedOptions!='1' && this.selectedOptions!='2' && this.fileSelected==false){
      return;
    }
    // console.log("addData")
    // console.log(this.selected);
    // console.log(this.fileSelected);
    // console.log(this.textInput);
    // console.log(this.form.value.format2);
    var date = ''
    if (this.form.value.format2 != null) {
      const myArray = this.form.value.format2.toString().split(" ");
      // console.log(myArray);
      date = `${myArray[2]} ${myArray[1]} ${myArray[3]}`;
    }
    const id = new Date().getTime()
    // console.log(date);
    const data = {
      "id": id,
      "radioOptions": this.selected,
      "date": date ? date : "",
      "selectedOption": this.selectedOptions,
      "message": this.textInput,
      "file": this.fileSelected,
    };
    var oldItems = JSON.parse(window.localStorage.getItem("todo")!);
    if (oldItems != null) {
      oldItems.push(data);
      window.localStorage.setItem("todo", JSON.stringify(oldItems));
    } else {
      let newArray = [];
      newArray.push(data);
      window.localStorage.setItem("todo", JSON.stringify(newArray));
    }
    this.dialogRef.close();
  }
  updateData() {    
  if(this.selectedOptions!='1' && this.form.value.format2 == null){
    return;
  }
  if(this.selectedOptions!='1' && this.selectedOptions!='2' && this.fileSelected==false){
    return;
  }
    var date = ''
    if (this.form.value.format2 != null && this.selectedOptions!='1') {
      const myArray = this.form.value.format2.toString().split(" ");
      // console.log(myArray);
      date = `${myArray[2]} ${myArray[1]} ${myArray[3]}`;
    }
    // console.log(this.localId);
    var oldItems = JSON.parse(window.localStorage.getItem("todo")!);
    const index = oldItems.findIndex((el: { id: string; }) => el.id === this.localId)
    // console.log(index);
    oldItems[index] = {
      "id": this.localId,
      "radioOptions": this.selected,
      "date": date,
      "message": this.textInput,
      "file": this.fileSelected,
      "selectedOption": this.selectedOptions,
    }
    // console.log(oldItems);
    window.localStorage.setItem("todo", JSON.stringify(oldItems));
    this.dialogRef.close();
  }
  deleteData() {
    // console.log("deleteData")
    var oldItems = JSON.parse(window.localStorage.getItem("todo")!);
    // console.log(oldItems);
    var lists = oldItems.filter((x: { id: string; }) => {
      return x.id != this.localId;
    })
    // console.log(lists);
    window.localStorage.setItem("todo", JSON.stringify(lists));
    this.dialogRef.close();
  }
}
