import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClientesPageRoutingModule } from './clientes-routing.module';

// No es necesario declarar el componente si es standalone
import { ClientesPage } from './clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule
  ],
  // No declarar ClientesPage aquí si es standalone
})
export class ClientesPageModule {}
