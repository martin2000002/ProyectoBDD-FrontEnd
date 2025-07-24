import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogService } from './core/services/catalog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('proyecto');

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.catalogService.registrarCatalogo('generos', [
      { nemonico: 'M', nombre: 'Masculino' },
      { nemonico: 'F', nombre: 'Femenino' }
    ]);

    this.catalogService.registrarCatalogo('actividades', [
      { nemonico: 'SED', nombre: 'Sedentario (poco o nada)', valor: 1.2, parametro1: '🛋️' },
      { nemonico: 'LIG', nombre: 'Ligera (1-3 días/semana)', valor: 1.375, parametro1: '🚶' },
      { nemonico: 'MOD', nombre: 'Moderada (3-5 días/semana)', valor: 1.55, parametro1: '🏃' },
      { nemonico: 'INT', nombre: 'Intensa (6-7 días/semana)', valor: 1.725, parametro1: '🏋️' },
      { nemonico: 'MUI', nombre: 'Muy intensa (2 veces/día)', valor: 1.9, parametro1: '🔥' }
    ]);

    this.catalogService.registrarCatalogo('distribuciones', [
      { nemonico: 'min', nombre: 'Mínima', valor: 'valor_minimo', parametro1: '🥗' },
      { nemonico: 'mod', nombre: 'Moderada', valor: 'valor_moderado', parametro1: '🍳' },
      { nemonico: 'max', nombre: 'Máxima', valor: 'valor_maximo', parametro1: '🥩' }
    ]);

  }
}
