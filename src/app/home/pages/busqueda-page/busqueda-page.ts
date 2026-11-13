import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IResultadoBusqueda } from '../../api/models/i-resultado-busqueda';

@Component({
  selector: 'app-busqueda-page',
  imports: [RouterModule],
  templateUrl: './busqueda-page.html'
})
export class BusquedaPage {
  @Input() texto = '';
  @Input() resultados: IResultadoBusqueda[] = [];
}
