import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8080/usuario/buscar'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.usuarios = data;
      },
      (error) => this.handleError(error)
    );
  }

  handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = 'Hubo un problema al cargar los usuarios. Por favor, inténtalo de nuevo.';
  }
}
