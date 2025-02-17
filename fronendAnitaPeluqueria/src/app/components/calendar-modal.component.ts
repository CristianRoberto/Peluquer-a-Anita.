import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Seleccionar Fecha</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrarModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-datetime
        presentation="date-time"
        prefer-wheel
        (ionChange)="seleccionarFecha($event)">
      </ion-datetime>

      <ion-button expand="full" (click)="confirmarFecha()">Aceptar</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarModalComponent {
  fechaSeleccionada: string = '';

  constructor(private modalCtrl: ModalController) {}

  seleccionarFecha(event: any) {
    this.fechaSeleccionada = event.detail.value;
  }

  confirmarFecha() {
    this.modalCtrl.dismiss({ fecha: this.fechaSeleccionada });
  }

  cerrarModal() {
    this.modalCtrl.dismiss(null);
  }
}
