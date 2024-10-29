import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  id = ""
  loginObj : any = {
    "Email":"",
    "Password":""
  };

  registerObj : any = {
    "Username":"",
    "Email":"",
    "Password":""
  }

  constructor(
    private http : HttpClient,
    private router : Router,    
    private snackBar: MatSnackBar,
  ){}

  login(){
    this.http.post<any>(`https://localhost:7040/api/Contact/Authentication`,this.loginObj)
    .subscribe(data => {
      if(data.message === "Login Success"){
        // alert('Login Sucess');
        this.snackBar.open('Login Sucess.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.router.navigateByUrl('/dashboard');
      }else{
        // alert('User Not Found');
        this.snackBar.open('Please Enter Valid Credentials or User Not Found.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  registerLogin(){
    const jsonData = { text: this.registerObj };
    return this.http.post('https://localhost:7040/api/Contact',jsonData).
    subscribe((res:any) => {
      if(res){
        // alert('Please Login to Accont.');
        this.snackBar.open('Please Login to Accont.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
      else{
        // alert("Failed to Register");
        this.snackBar.open('Failed to Register.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    })
  }

}
