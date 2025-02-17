import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';  
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español

import { CitaservicioService } from '../services/citaservicio.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true, 
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ], 
})
export class CitasPage implements OnInit {
  calendarOptions: any;
  citaData: any[] = [];

  constructor(private servicio: CitaservicioService) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      },
      locale: esLocale, // 🌎 Aquí se establece el idioma español
      events: [],
      eventContent: function(arg: { event: { extendedProps: { cliente_nombre: any; servicio_nombre: any; }; }; }) {
        // Personaliza el contenido del evento para que el cliente y servicio estén en dos líneas
        return {
          html: `
            <div class="fc-event-custom">
              <b>Cliente:</b> ${arg.event.extendedProps.cliente_nombre}<br>
              <b>Servicio:</b> ${arg.event.extendedProps.servicio_nombre || 'Sin título'}
            </div>`
        };
      }
    };
  }

  ngOnInit(): void {
    this.servicio.getcitas().subscribe(
      (data: any) => {
        this.citaData = data;
        console.log(this.citaData); // Verifica los datos en consola

        // Mapear los datos recibidos y añadirlos a calendarOptions
        this.calendarOptions.events = this.citaData.map((cita) => ({
          date: cita.fecha, // Asegúrate de que la fecha esté en formato YYYY-MM-DD
          extendedProps: { 
            cliente_nombre: cita.cliente_nombre, 
            servicio_nombre: cita.servicio_nombre || 'Sin título' 
          }
        }));
      },
      (error) => {
        console.error('Error al obtener las citas', error);
      }
    );
  }
}



