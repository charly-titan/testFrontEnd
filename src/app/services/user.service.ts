import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tokenGetter } from '../app.module'

/* Models */
import { User} from '../models/user.model';
import { LoginUser } from '../models/login-user.model';
import { SaveAccount } from '../models/save-account.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  	constructor(private http:HttpClient) {}

    urlApi : string = `https://mighty-refuge-81707.herokuapp.com/api/`;
    token : string = tokenGetter();

    headersToken(){
      const headers = new HttpHeaders({
        'x-access-token': this.token
      });
      return headers;
    }

    postQuery(query:string,data:any={},token:boolean){
      const url = `${ this.urlApi }${ query }`;
      const headers = this.headersToken();
      if(token){
        return this.http.post(url,data,{ headers });
      }else{
        return this.http.post(url,data);
      } 
      
    }

    getQuery(query: string) {
      const url = `${ this.urlApi }${ query }`;
      const headers = this.headersToken();
      return this.http.get(url, { headers });
    }

    newUser(user : User){
    	const data : User = {
  			firstname : user.firstname,
  			lastname : user.lastname,
  			email : user.email,
  			password : user.password
    	}
    	return this.postQuery('auth/user/create',data,false);
  	}

    logueo(loginUser : LoginUser){
      const data : LoginUser = {
        email : loginUser.email,
        password : loginUser.password
      }
      return this.postQuery('auth/user/authenticate',data,false);
    }

    saveAccount(saveAccount : SaveAccount){
      const data : SaveAccount = {
        userId : saveAccount.userId,
        type : saveAccount.type,
        name : saveAccount.name
      }
      return this.postQuery('accounts',data,true);
    }

    getAccountList(){
      return this.getQuery(`accounts`)
                .pipe( map( data => data));
    }

    getCardsList(){
      return this.getQuery(`catalogs/cards`)
                .pipe( map( data => data['response'].type_cards));
    }
}
