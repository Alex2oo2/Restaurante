import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platillo',
  standalone: true
})
export class PlatilloPipe implements PipeTransform {

  transform(value: number, platillos: any[]): String {
    let t: any;
    for (t of platillos) {
      if (t.idplatillo == value) {
        return t.descripcion
      }
    }
    return "No existe"
  }
}
