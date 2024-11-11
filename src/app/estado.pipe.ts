import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
  standalone: true
})
export class EstadoPipe implements PipeTransform {

  transform(value: number, estado: any[]): String {
    let t: any;
    for (t of estado) {
      if (t.idestado == value) {
        return t.estado
      }
    }
    return "No existe"
  }

}