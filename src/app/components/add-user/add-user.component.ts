import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

/* Models */
import { User } from '../../models/user.model';

/* Services */
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	public showMessage: boolean = false;
	model: any = {};

  constructor(private userService : UserService,private router: Router) {}

  ngOnInit() {}

  onSubmit(form : NgForm){
  	this.userService.newUser(form.value)
  	.subscribe((data:any)=>{
  		if (data.success) {
	  		this.showMessage = true;
		  	setTimeout(()=>{
		      this.router.navigate(['/login'])
		 	}, 1000);
		}
  	});
  }

}
