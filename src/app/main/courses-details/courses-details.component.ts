import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { ApiService } from '../api.service';
import { Courses } from '../courses';
import { AuthService } from "../../auth/auth.service"

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit {
  courses: Courses = { _id: '', title: '', tags: null, published: null, youtube: '', creator: null };
  isLoadingResults = true;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;


  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private api: ApiService, private router: Router) { }


  ngOnInit(): void {
    this.getCoursesDetails(this.route.snapshot.params.id);
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });


  }

  getCoursesDetails(id: string) {
    this.api.getCoursesById(id)
      .subscribe((data: any) => {
        this.courses = data;
        console.log(this.courses);
        this.isLoadingResults = false;
      });
  }

  deleteCourses(id: any) {
    this.isLoadingResults = true;
    this.api.deleteCourses(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
