import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { StudentService } from './services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilitiesService } from './utilities/utilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Ramsay-Test-A';

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'age', 'career', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService,
    private utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStudentForm() {
    const dialogRef = this.dialog.open(AddEditStudentComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStudentList() {
    this.studentService.getStudentList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe({
      next: (res) => {
        this.utilitiesService.openSnackBar('Student Deleted')
        this.getStudentList();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editStudent(data: any) {
    const dialogRef = this.dialog.open(AddEditStudentComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      }
    });
  }
}