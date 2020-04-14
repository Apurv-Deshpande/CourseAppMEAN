import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  coursesForm: FormGroup;
  title = '';
  tags = '';
  youtube = '';
  published: Date = null;
  isLoadingResults = false;

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.coursesForm = this.formBuilder.group({
      title: [null, Validators.required],
      tags: [null, Validators.required],
      youtube: [null, Validators.required],
      published: [null, Validators.required]


    });



  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCourses(this.coursesForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/courses']);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


}
