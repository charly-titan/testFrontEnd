import { Component, OnInit } from '@angular/core';
import { AppModule,tokenGetter } from '../../app.module';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

/* Servivios */
import { UserService } from '../../services/user.service';

/* Models */
import { AccountUser } from '../../models/account-user.model';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  listAccounts: any[] = [];
  listCards: any[] = [];
  cardSelected: any = {};
  token : string = localStorage.getItem('access_token');

  constructor(private userService:UserService, private router:ActivatedRoute,private route:Router,private jwtHelper: JwtHelperService) { 

  	this.router.params.subscribe( params => {
      this.getCardsList();
      this.getAccountList();
    });

  }

  ngOnInit() {}

  onSubmit(form: NgForm){
    const dataUser = this.jwtHelper.decodeToken(this.token);
  	form.value['card'].userId = dataUser.id;
    this.postSaveAccount(form.value['card']);
  }

  getAccountList(){
    this.userService.getAccountList()
    .subscribe((data:any) => {
        this.listAccounts = data.response;
    });
  }

  getCardsList(){
    this.userService.getCardsList()
    .subscribe((data:any) => {
        this.listCards = data;
    });
  }

  postSaveAccount(formData){
    this.userService.saveAccount(formData)
    .subscribe((data:any)=>{
      if(data.success){
        alert(data.success)
        localStorage.clear();
        this.route.navigate(['/login'])
      }
    })
  }



}
