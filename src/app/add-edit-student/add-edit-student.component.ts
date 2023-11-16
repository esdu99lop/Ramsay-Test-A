import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';
import { UtilitiesService } from '../utilities/utilities.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss']
})
export class AddEditStudentComponent implements OnInit {

  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<AddEditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilitiesService: UtilitiesService) {
    this.studentForm = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      age: 0,
      career: ''
    });
  }

  studentFormSubmit() {
    if (this.studentForm.valid) {
      if (this.data) {
        this.studentService.editStudent(this.data.id, this.studentForm.value).subscribe({
          next: (val: any) => {
            this.utilitiesService.openSnackBar('Student Updated');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
      else {
        this.studentService.addStudent(this.studentForm.value).subscribe({
          next: (val: any) => {
            this.utilitiesService.openSnackBar('Student Added');
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            console.error(error);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }
}