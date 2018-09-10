import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

/* Servivios */
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	model : any = {};

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
  	this.userService.logueo(form.value)
    .subscribe(
      result => {
        localStorage.setItem('access_token', result['token']);
      },
      error => {
        if(error.error.error){
          alert(error.error.error)
        }else{
          alert(error.error.success)
        } 
      },
      () => {
        this.router.navigate(['/add-account'])
      }
    );
  }

}
