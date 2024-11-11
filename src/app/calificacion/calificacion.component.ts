import { Component} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent{
  calificacion = {
    nombre: '',
    nota: null,
    noExamen: null,
    fechaCalificacion: null 
  };

  calificaciones: any[] = [];
  errorMessage: string | null = null;
  private apiUrlBuscar = 'http://localhost:8080/calificacion/buscar';
  private apiUrlGuardar = 'http://localhost:8080/calificacion/guardar';
  private apiUrlBorrar = 'http://localhost:8080/calificacion/borrar'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCalificaciones();
  }

  loadCalificaciones(): void {
    this.http.get<any[]>(this.apiUrlBuscar).subscribe(
      (data) => {
        this.calificaciones = data.map(cal => ({
          ...cal,
          fechaCalificacion: new Date(cal.fechaCalificacion).toLocaleDateString() 
        }));
      },
      (error) => this.handleError(error)
    );
  }

  guardarCalificacion(): void {
    const nuevaCalificacion = {
      ...this.calificacion,
      fechaCalificacion: new Date().toISOString().split('T')[0] 
    };

    this.http.post<any>(this.apiUrlGuardar, nuevaCalificacion).subscribe(
      (data) => {
        this.calificaciones.push(data);
        this.calificacion = { nombre: '', nota: null, noExamen: null, fechaCalificacion: null }; 
      },
      (error) => this.handleError(error)
    );
  }

  borrarCalificacion(id: number): void {
    this.http.delete(`${this.apiUrlBorrar}/${id}`).subscribe(
      () => {
        this.calificaciones = this.calificaciones.filter(cal => cal.idcalificacion !== id);
      },
      (error) => this.handleError(error)
    );
  }

  handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = 'Hubo un problema al cargar las calificaciones. Por favor, inténtalo de nuevo.';
  }
}
