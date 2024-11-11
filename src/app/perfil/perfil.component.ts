import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable } from 'rxjs'; // Importa Observable
import { HttpHeaders, HttpClientModule } from '@angular/common/http'; // Importa HttpHeaders y HttpClientModule

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [LogoutComponent, FormsModule, HttpClientModule], // Agrega HttpClientModule aquí
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'] 
})
export class MiPerfilComponent {
  usuario: any;

  constructor(private http: HttpClient) { // Inyecta HttpClient
    let t: any = localStorage.getItem("usuario");
    this.usuario = JSON.parse(t);

    if (!this.usuario || !this.usuario.email) {
      console.error('Usuario no encontrado o no tiene email', this.usuario);
    }
  }

  cambiarcontrasenia() {
    if (this.usuario.password && this.usuario.idusuario) {
      this.servicioGuardar().subscribe(
        response => {
          alert('Contraseña actualizada con éxito');
        }
      );
    } 
  }

  servicioGuardar(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      'http://localhost:8080/usuario/guardar',
      {
        idusuario: this.usuario.idusuario,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        nit: this.usuario.nit,
        correo: this.usuario.correo,
        password: this.usuario.password,
        fechaRegistro: this.usuario.fechaRegistro
      },
      httpOptions
    );
  }
}
