import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule

@Component({
  selector: 'app-login',
  standalone: true,  // Definir como standalone
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule]  // Importa IonicModule aquí
})
export class LoginPage {}
