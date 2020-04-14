import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
})
export class EditCoursesComponent implements OnInit {
  coursesForm: FormGroup;
  _id = '';
  title = '';
  tags = '';
  youtube = '';
  published: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCoursesById(this.route.snapshot.params.id);
    this.coursesForm = this.formBuilder.group({
      title: [null, Validators.required],
      tags: [null, Validators.required],
      youtube: [null, Validators.required],
      published: [null, Validators.required]
    });
  }

  getCoursesById(id: any) {
    this.api.getCoursesById(id).subscribe((data: any) => {
      this._id = data._id;
      this.coursesForm.setValue({
        title: data.title,
        tags: data.tags,
        youtube: data.youtube,
        published: data.published,

      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCourses(this._id, this.coursesForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/courses-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

  coursesDetails() {
    this.router.navigate(['/courses-details', this._id]);
  }

}
