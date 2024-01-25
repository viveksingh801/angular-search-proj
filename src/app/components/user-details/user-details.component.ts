import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

    history: any = []
    constructor(private active : ActivatedRoute , private route : Router) {}

    ngOnInit(): void {
      this.history = localStorage.getItem('users')

      if (this.history) {
        this.history = JSON.parse(this.history)
      }else {
        this.history = [];
      }
    }

    clearHistory() {
      this.history = [];
      localStorage.removeItem("users")
    }
}
