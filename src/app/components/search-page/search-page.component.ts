import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

    searchForm!: FormGroup;
    username!: string;

    constructor (private route : Router ) {}

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            username : new FormControl(
              null,
              [Validators.required]
            )
        })
    }

    sendUser(){
      //console.log(this.searchForm.value);
      this.username = this.searchForm.value.username;
      this.route.navigate([`user/${this.username}`]);
    }
}
