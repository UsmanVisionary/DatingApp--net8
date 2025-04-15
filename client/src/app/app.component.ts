
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports :[],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit {

  http = inject(HttpClient);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    // You can use HTTP or HTTPS based on your backend setup
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: response => {
        this.users = response;
        console.log("Users fetched:", this.users);
      },
      error: error => {
        console.error("Backend request failed:", error);
        alert("Something went wrong: " + JSON.stringify(error));
      },
      complete: () => console.log('Request has Completed')
    });
  }
}

