import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Courses } from './courses'


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api/courses';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${apiUrl}`)
      .pipe(
        tap(Courses => console.log('fetched Courses')),
        catchError(this.handleError('getCourses', []))
      );
  }

  getCoursesById(id: string): Observable<Courses> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Courses>(url).pipe(
      tap(_ => console.log(`fetched Courses id=${id}`)),
      catchError(this.handleError<Courses>(`getCoursesById id=${id}`))
    );
  }

  addCourses(Courses: Courses): Observable<Courses> {
    return this.http.post<Courses>(apiUrl, Courses, httpOptions).pipe(
      tap((c: Courses) => console.log(`added courses w/ id=${c._id}`)),
      catchError(this.handleError<Courses>('addCourses'))
    );
  }

  updateCourses(id: string, Courses: Courses): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Courses, httpOptions).pipe(
      tap(_ => console.log(`updated Courses id=${id}`)),
      catchError(this.handleError<any>('updateCourses'))
    );
  }

  deleteCourses(id: string): Observable<Courses> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Courses>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Courses id=${id}`)),
      catchError(this.handleError<Courses>('deleteCourse'))
    );
  }


}
