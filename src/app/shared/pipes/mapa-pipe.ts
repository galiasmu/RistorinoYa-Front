import { Pipe, PipeTransform } from '@angular/core';

// Enlace a Google Maps con la dirección de la sucursal (Req 15)
@Pipe({
  name: 'mapa'
})
export class MapaPipe implements PipeTransform {
  transform(direccion: { calle: string, nroCalle: number, barrio: string }): string {
    const texto = `${direccion.calle} ${direccion.nroCalle}, ${direccion.barrio}, Córdoba`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(texto)}`;
  }
}
