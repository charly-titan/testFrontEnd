import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

/* Servicios */
import { UserService } from './services/user.service';

/* Componentes */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddAccountComponent } from './components/add-account/add-account.component';

/* Rutas*/
import { APP_ROUTING } from './app.routes';



export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpClientModule, 
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
