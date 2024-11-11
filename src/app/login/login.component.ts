import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  usuario: any = {};

  constructor(private http: HttpClient) {
    let usuario = localStorage.getItem("usuario");
    if (usuario) {
      location.href = "me"; 
    }
  }

  login() {
    let formularioValido: any = document.getElementById("loginForm");
    if (formularioValido.reportValidity()) {
      this.servicioLogin().subscribe(
        (u: any) => this.validarLogin(u)
      );
    }
  }

  validarLogin(u: any) {
    if (u) {
      location.href = "me"; 
      let t = JSON.stringify(u);
      localStorage.setItem("usuario", t);
    } else {
      alert("Usuario o contraseña inválido.");
    }
  }

  servicioLogin() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      "http://localhost:8080/usuario/login",
      this.usuario,
      httpOptions
    );
  }
}
