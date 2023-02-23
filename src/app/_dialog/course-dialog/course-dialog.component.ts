import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Foods } from 'src/app/_models/foods';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent {

  form! : FormGroup;
  description: string = '';
  public displayedColumns : string[] = ['name', 'price', 'description', 'category'];
  public dataSource! : Foods[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {

    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
        description: [this.description, []],
        
    });
}

  close(){
    this.dialogRef.close(this.form.value);
  }

  cancel(){
    this.dialogRef.close();
  }

  // createForm(){
  //   this.form = this.fb.group({
  //     description: ['', Validators.required],
  //   })
  // }

}
