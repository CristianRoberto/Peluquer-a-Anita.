import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  esAdministrador: boolean = false;
  navigate!: { title: string; url: string; icon: string; }[];
  ROLES = {
    USUARIO: 'usuario',
    ADMINISTRADOR: 'administrador'
  };

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    private platform: Platform,


  ) {
    this.initializeApp();
  }


  ngOnInit() {
    this.sideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  sideMenu() {
    this.navigate = [
      {
        title: "Inicio",
        url: "/tabs/tabs/tab1",
        icon: "home-outline"
      },
      {
        title: "Mi Perfil",
        url: "/perfilusuario",
        icon: "person-outline"
      },
      {
        title: "Clientes",
        url: "/clientes",
        icon: "people-outline"
      },
      {
        title: "Citas",
        url: "/citas",
        icon: "calendar-outline"
      },
      {
        title: "Atenciones",
        url: "/atenciones",
        icon: "cut-outline"
      },
      {
        title: "Agregar Cliente",
        url: "/agregar-cliente",
        icon: "person-add-outline"
      },
      {
        title: "Agendar Cita",
        url: "/agendar-cita",
        icon: "calendar-number-outline"
      },
      {
        title: "Agendar desde Móvil",
        url: "/agendar-movil",
        icon: "phone-portrait-outline"
      },
      {
        title: "Registrar Atención",
        url: "/registrar-atencion",
        icon: "clipboard-outline"
      },
      {
        title: "Historial de Atenciones",
        url: "/historial",
        icon: "time-outline"
      },
      {
        title: "Cerrar Sesión",
        url: "/login",
        icon: "log-out-outline"
      }
    ];
  }
  

  // sideMenu() {
  //   this.navigate = [];

  //   if (this.esAdministrador) {
  //     this.navigate.push({
  //       title: "Perfil Administrador",
  //       url: "/perfiladmin",
  //       icon: "logo-reddit"
  //     });
  //   } else {
  //     this.navigate.push({
  //       title: "Inicio Usuario",
  //       url: "/tabs/tabs/tab1",
  //       icon: "home-outline"
  //     }, {
  //       title: "Mi Perfil",
  //       url: "/perfilusuario",
  //       icon: "man-outline"
  //     });
  //   }
  // }

  
  async salir() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: 'Salir',
      message: '¿Deberitas te quieres salir?',
      buttons: [
        {
          text: 'No mejor no',
          cssClass: 'custom-button adopt-button',
          handler: () => {
          }
        }, {
          text: 'Sii',
          cssClass: 'custom-button salir-button',
          handler: () => {
            localStorage.clear();
            this.navCtrl.navigateRoot('inicio');
          }
        }
      ]
    });

    await alert.present();
  }
}
