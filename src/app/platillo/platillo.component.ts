import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IngredientesPipe } from '../ingredientes.pipe';

@Component({
  selector: 'app-platillo',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, IngredientesPipe],
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.css']
})
export class PlatilloComponent {
  platillos: any = [];
  ingredientes: any = [];
  platillo: any = {
    ingredientes: []
  };

  constructor(private http: HttpClient) {
    this.buscarPlatillo();
    this.buscarIngrediente();
  }

  buscarPlatillo() {
    this.serviciosBuscarPlatillo().subscribe(
      (p: any) => this.platillos = p
    );
  }

  serviciosBuscarPlatillo(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/platillo/buscar");
  }

  crearPlatillo() {
    let formularioValido: any = document.getElementById("platilloForm");
    if (formularioValido.reportValidity()) {
      this.servicioGuardar().subscribe(
        (u: any) => this.finalizarGuardar(u)
      );
    }
  }

  servicioGuardar() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      "http://localhost:8080/platillo/guardar",
      this.platillo,
      httpOptions
    );
  }

  finalizarGuardar(u: any) {
    this.platillo = {
      ingredientes: []
    };
    this.buscarPlatillo();
    alert("Platillo guardado!!");
  }

  agregarIngrediente() {
    this.platillo.ingredientes.push({});
  }

  buscarIngrediente() {
    this.serviciosBuscarIngrediente().subscribe(
      (u: any) => this.ingredientes = u
    );
  }

  serviciosBuscarIngrediente(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/ingrediente/buscar");
  }

  borrarPlatillo(id: number) {
    this.servicioBorrarPlatillo(id).subscribe(() => {
      this.buscarPlatillo();
      alert("Platillo eliminado con éxito.");
    });
  }

  servicioBorrarPlatillo(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/platillo/borrar/${id}`);
  }

  editarPlatillo(platillo: any) {
    this.platillo = { ...platillo }; 
  }

  actualizarPlatillo() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put(`http://localhost:8080/platillo/actualizar/${this.platillo.idplatillo}`, this.platillo, httpOptions)
      .subscribe(() => {
        this.buscarPlatillo();
        alert("Platillo actualizado con éxito.");
        this.platillo = { ingredientes: [] }; 
      });
  }
}
