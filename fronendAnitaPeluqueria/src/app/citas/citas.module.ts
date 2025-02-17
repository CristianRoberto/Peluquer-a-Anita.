import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasPageRoutingModule } from './citas-routing.module';

import { CitasPage } from './citas.page';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa el módulo de FullCalendar




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasPageRoutingModule,
    FullCalendarModule,
    CitasPage
  ],
})
export class CitasPageModule {}
