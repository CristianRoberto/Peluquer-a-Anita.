import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ClientesPageRoutingModule } from './clientes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




// No es necesario declarar el componente si es standalone
import { ClientesPage } from './clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // <-- Agregar esto
    ReactiveFormsModule, // <-- Agregar esto si usas formularios reactivos
    ClientesPageRoutingModule
  ],
  // No declarar ClientesPage aquí si es standalone
})
export class ClientesPageModule {}
