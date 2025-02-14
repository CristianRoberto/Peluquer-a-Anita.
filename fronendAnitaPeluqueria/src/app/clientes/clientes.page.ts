import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule

@Component({
  selector: 'app-clientes',
  standalone: true,  // Definir como standalone
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  imports: [IonicModule]  // Importa IonicModule aquí
})
export class ClientesPage {}
