import { Component } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  private apiUrlBorrar = 'http://localhost:4200/result'; 
  resultado(){
  location.href=this.apiUrlBorrar;
}
}
