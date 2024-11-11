import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuario',
  standalone: true
})
export class UsuarioPipe implements PipeTransform {

  transform(value: number, usuario: any[]): String {
    let t: any;
    for (t of usuario) {
      if (t.idusuario == value) {
        return t.nombre
      }
    }
    return "No existe"
  }

}