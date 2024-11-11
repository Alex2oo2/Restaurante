import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientes',
  standalone: true
})
export class IngredientesPipe implements PipeTransform {

  transform(value: number, ingredientes: any[]): String {
    let t: any;
    for (t of ingredientes) {
      if (t.idingrediente == value) {
        return t.nombre
      }
    }
    return "No existe"
  }
}