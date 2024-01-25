import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

    searchForm!: FormGroup;
    username!: string;
    localData: any = []

    userDetail: any;

    constructor (private route : Router, private githubService: GithubService ) {}

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            username : new FormControl(
              null,
              [Validators.required]
            )
        })
        this.localData = localStorage.getItem('users')

        if (this.localData) {
          this.localData = JSON.parse(this.localData)
        }else {
          this.localData = [];
        }
  

    }

    sendUser(){
      //console.log(this.searchForm.value);
      this.username = this.searchForm.value.username;
      let checkLocalStorage: any = localStorage.getItem('users');

      if (checkLocalStorage) {
        checkLocalStorage = JSON.parse(checkLocalStorage)
      }else {
        checkLocalStorage = [];
      }

      

      let res = checkLocalStorage.find((item: any) => item.login === this.username.toLowerCase())

      if (res) {
        this.userDetail = res;
        this.username = '';
            this.searchForm.reset();
        return
      }

      this.githubService.getUser(this.username).subscribe({
        complete: () => {
        },
        error: () => {
          //we navigate back to the search page
          alert("you have entered a wrong username.");
          this.route.navigate(['search']);
        },
        next: (data : any = []) => {
            this.userDetail = data;
            this.username = '';
            this.searchForm.reset();
            this.localData.push(data);
            localStorage.setItem('users', JSON.stringify(this.localData))
            console.log(this.userDetail);
        }
      })
      
    }
}
