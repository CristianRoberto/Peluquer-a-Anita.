import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ClienteservicioService } from '../services/clienteservicio.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  standalone: true,  // Definir como standalone
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  imports: [
    IonicModule,
    FormsModule, // <-- Agregar esto
    ReactiveFormsModule, // <-- Agregar esto si usas formularios reactivos
    CommonModule
  ]
})
export class ClientesPage implements OnInit {
  clienteForm!: FormGroup;  // Asegúrate de que esta variable esté correctamente definida
  clientesData: any[] = []; // Variable para almacenar los datos
  auxproducts: any[] = [];
  elementos: any = {
    tipob: "",
    bus: ''
  };
  constructor(private fb: FormBuilder,
    public toast: ToastController,
    private servicio: ClienteservicioService,
    public loadingController: LoadingController,
  ) {
  }

  // Variable para controlar el estado de la actualización
  isRefreshing: boolean = false;

  ngOnInit() {
    // Inicializar FormGroup
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // Aquí puedes hacer una llamada al servicio si es necesario
    this.servicio.getClientes().subscribe(
      (data: any) => {
        this.clientesData = data; // Almacena los datos
        console.log(this.clientesData); // Muestra los datos en consola para asegurarte de que llegaron
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );


    this.search();
  }

  handleRefresh(event: any): void {
    if (!event || !event.detail) {
      return;
    }

    if (this.isRefreshing) {
      return;
    }
    this.isRefreshing = true; // Marca la actualización como en curso
    this.search().then(() => {
      // Realiza cualquier otra acción necesaria
      // Reinicia la variable isRefreshing para futuras actualizaciones
      this.isRefreshing = false;
      event.detail.complete(); // Marca la actualización como completada
    }).catch(() => {
      // En caso de error, también se debe restablecer isRefreshing
      this.isRefreshing = false;
      event.detail.complete();
    });
  }

  async search(): Promise<void> {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    this.servicio.getClientes().subscribe({
      next: async (re: any) => {
        this.clientesData = [];
        this.auxproducts = [];
        this.clientesData = re;
        this.auxproducts = this.clientesData;
        await loading.dismiss();
      },
      error: async (e) => {
        await loading.dismiss();
        this.presentToast("Error de conexión");
      }
    });
  }


  onInput2() {
    console.log("Resetando búsqueda...");
    this.elementos.bus = '';
    this.clientesData = this.auxproducts;
    console.log("clientesData después del reset:", this.clientesData);
  }

  onInput(even: any) {
    let val = even.target.value;
    console.log("Valor ingresado:", val);
    console.log("Criterio de búsqueda seleccionado:", this.elementos.tipob);

    if (this.elementos.tipob) {
      if (val && val !== '') {
        console.log("Filtrando datos...");
        this.clientesData = this.auxproducts.filter((item: any): boolean | any => {
          console.log("Elemento evaluado:", item);

          if (this.elementos.tipob === 'id') {
            console.log(`Comparando ID: ${item.id} con ${val}`);
            return item.id.toString().toLowerCase().includes(val.toLowerCase());
          } else if (this.elementos.tipob === 'nombre') {
            console.log(`Comparando Nombre: ${item.nombre} con ${val}`);
            return item.nombre.toLowerCase().includes(val.toLowerCase());
          } else if (this.elementos.tipob === 'telefono') {
            console.log(`Comparando Teléfono: ${item.telefono} con ${val}`);
            return item.telefono.toLowerCase().includes(val.toLowerCase());
          }
          console.log(`Comparando Precio: ${item.precio} con ${val}`);
          return item.precio.toString().toLowerCase().includes(val.toLowerCase());
        });

        console.log("Resultados filtrados:", this.clientesData);
      } else {
        console.log("Valor vacío, restaurando lista original...");
        this.clientesData = this.auxproducts;
        console.log("clientesData restaurada:", this.clientesData);
      }
    } else {
      console.warn("Ningún criterio de búsqueda seleccionado.");
      this.presentToast('Seleccione un criterio de búsqueda');
    }
  }

  // Método para guardar el formulario cliente
  guardar(producForm: FormGroup) {
    // Verificar si todos los campos necesarios están completos
    if (!producForm.value.nombre || !producForm.value.telefono || !producForm.value.email) {
      this.presentToast('Por favor, complete todos los campos.');
      return;
    }
    // Validar la longitud del teléfono
    const telefono = producForm.value.telefono;
    if (telefono.length !== 10) {
      this.presentToast('El teléfono debe tener 10 dígitos.');
      return;
    }
    // Validar el formato del correo electrónico
    const email = producForm.value.email;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      this.presentToast('El correo electrónico no tiene el formato correcto.');
      return;
    }

    // Si todo es válido, proceder a enviar los datos
    this.enviarDatos(producForm);
    console.log('Formulario enviado datos:', producForm);
  }
  // Función para enviar los datos al backend
  private enviarDatos(producForm: FormGroup) {
    this.servicio.createCliente(producForm.value).subscribe({
      next: async (re: any) => {
        this.presentToast('Usuario creado con éxito');

        // Agregar el nuevo cliente a la lista sin recargar
        this.clientesData.push(re);

        // Limpiar el formulario después de agregar el cliente
        this.clienteForm.reset();
      },
      error: (_e) => {
        this.presentToast('Error de conexión');
      }
    });
  }

  // Método para mostrar un mensaje Toast
  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  // Método para manejar el envío del formulario si es válido
  onSubmit() {
    if (this.clienteForm.valid) {
      console.log('Formulario enviado', this.clienteForm.value);
      this.guardar(this.clienteForm);
    } else {
      console.log('Formulario inválido');
    }
  }


  //eliminar cliente id
  async eliminarCliente(id: number) {
    const loading = await this.loadingController.create({ message: 'Eliminando cliente...' });
    await loading.present();

    this.servicio.deleteCliente(id).subscribe({
      next: async () => {
        this.clientesData = this.clientesData.filter(cliente => cliente.id !== id);
        await loading.dismiss();
        this.presentToast('Cliente eliminado correctamente');
      },
      error: async (error) => {
        console.error('Error al eliminar cliente:', error);
        await loading.dismiss();
        this.presentToast('Error al eliminar cliente');
      }
    });

  }
}