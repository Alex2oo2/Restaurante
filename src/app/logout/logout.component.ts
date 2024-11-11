import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [], // Puedes añadir imports necesarios si hay otros componentes o módulos que uses
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'] // Asegúrate de que la ruta sea correcta
})
export class LogoutComponent {
  constructor() {
    const usuario = localStorage.getItem("usuario");
    // Si no hay un usuario en el localStorage, redirige a la página principal
    if (!usuario) {
      location.href = " "; // Cambia esto a la ruta que desees (ejemplo: '/welcome')
    }
  }

  logout() {
    localStorage.clear(); // Elimina todos los elementos del localStorage
    location.href = " "; // Cambia esto a la ruta que desees (ejemplo: '/welcome')
  }
}
