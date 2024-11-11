import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoNoticia',
  standalone: true  // Marca el pipe como standalone
})
export class TipoNoticiaPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Promocion':
        return 'Tipo: Promoción (1)';
      case 'Administracion':
        return 'Tipo: Administración (2)';
      default:
        return 'Tipo: Desconocido';
    }
  }
}
