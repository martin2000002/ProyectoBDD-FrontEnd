import { Injectable } from '@angular/core';
import { CatalogItem } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogos = new Map<string, CatalogItem[]>();
  
  // Registrar catálogo
  registrarCatalogo(nombreCatalogo: string, items: CatalogItem[]): void {
    this.catalogos.set(nombreCatalogo, items);
  }

  // Obtener catálogo completo
  obtenerCatalogo(nombreCatalogo: string): CatalogItem[] {
    return this.catalogos.get(nombreCatalogo) ?? [];
  }

  // Obtener item por nemonico
  obtenerItem(nombreCatalogo: string, nemonico: string): CatalogItem | undefined {
    return this.catalogos.get(nombreCatalogo)?.find(i => i.nemonico === nemonico);
  }

  // Obtener valor por nemonico
  obtenerValor(nombreCatalogo: string, nemonico: string): string | number | undefined {
    return this.obtenerItem(nombreCatalogo, nemonico)?.valor;
  }
}
