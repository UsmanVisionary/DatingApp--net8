import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-test-errors',
    imports: [],
    templateUrl: './test-errors.component.html',
    styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  validationErrors : string[] = [];

  get400error(){

       this.http.get(this.baseUrl + 'buggy/bad-request'). subscribe ({
       next: response => console.log(response),
       error : error => console.log(error)
    })   
  }
    get401error(){

      this.http.get(this.baseUrl + 'buggy/auth'). subscribe ({
      next: response => console.log(response),
      error : error => console.log(error)
   })   
  }
   get404error(){

    this.http.get(this.baseUrl + 'buggy/not-found'). subscribe ({
    next: response => console.log(response),
    error : error => console.log(error)
 })  
} 

 get500error(){

  this.http.get(this.baseUrl + 'buggy/server-error'). subscribe ({
  next: response => console.log(response),
  error : error => console.log(error)
})  
 }

 get400ValidationError(){

  this.http.get(this.baseUrl + 'account/register', {}). subscribe ({
  next: response => console.log(response),
  error : error => {
    console.log(error);
    this.validationErrors = error;
  }
}) 

 }

}
