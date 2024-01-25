import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

    username!: string;
    userDetail: any;

    constructor(private active : ActivatedRoute , private githubService: GithubService, private route : Router) {}

    ngOnInit(): void {
        this.active.params.subscribe(params => {
          this.username = params['id'];
          console.log("params = ", this.username);
        })

        this.githubService.getUser(this.username).subscribe({
          complete: () => {
            console.log("successfully done!")
          },
          error: () => {
            //we navigate back to the search page
            alert("you have entered a wrong username.");
            this.route.navigate(['search']);
          },
          next: (data : any = []) => {
              this.userDetail = data;
              console.log(this.userDetail);
          }
        })
    }
}
