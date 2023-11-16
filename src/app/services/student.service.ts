import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:7292/api/Student';

  addStudent(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  editStudent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  getStudentList(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}