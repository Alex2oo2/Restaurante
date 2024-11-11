import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingrediente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  ingrediente = {
    nombre: '',
    cantidad: ''
  };

  ingredientes: any[] = [];
  errorMessage: string | null = null;

  private apiUrlBuscar = 'http://localhost:8080/ingrediente/buscar';
  private apiUrlGuardar = 'http://localhost:8080/ingrediente/guardar';
  private apiUrlBorrar = 'http://localhost:8080/ingrediente/borrar';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadIngredientes();
  }

  loadIngredientes(): void {
    this.http.get<any[]>(this.apiUrlBuscar).subscribe(
      (data) => {
        this.ingredientes = data;
      },
      (error) => this.handleError(error)
    );
  }

  guardarIngrediente(): void {
    const nuevoIngrediente = { ...this.ingrediente };

    this.http.post<any>(this.apiUrlGuardar, nuevoIngrediente).subscribe(
      (data) => {
        this.ingredientes.push(data);
        this.ingrediente = { nombre: '', cantidad: '' };
      },
      (error) => this.handleError(error)
    );
  }

  borrarIngrediente(id: number): void {
    this.http.delete(`${this.apiUrlBorrar}/${id}`).subscribe(
      () => {
        this.ingredientes = this.ingredientes.filter(ing => ing.idingrediente !== id);
      },
      (error) => this.handleError(error)
    );
  }

  handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = 'Hubo un problema al cargar los ingredientes. Por favor, inténtalo de nuevo.';
  }
}
