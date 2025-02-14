import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';

// Ya no es necesario declarar LoginPage aquí
// import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  // No se declara LoginPage aquí porque es standalone
})
export class LoginPageModule {}
