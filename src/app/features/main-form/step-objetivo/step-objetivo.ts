import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardService } from '../../../core/services/form-wizard.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { FirebaseFunctionsService } from '../../../core/services/firebase-functions';

@Component({
  selector: 'app-step-objetivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-objetivo.html',
  styleUrl: './step-objetivo.scss'
})
export class StepObjetivo implements OnInit {
  @Output() completed = new EventEmitter<void>();

  private wizardService = inject(FormWizardService);

  objetivoSeleccionado: number | null = null;
  distribucionSeleccionada: string | null = null;

  private catalog = inject(CatalogService);

  loading = true;

  distribuciones = this.catalog.obtenerCatalogo('distribuciones');

  objetivos = this.catalog.obtenerCatalogo('objetivos');;

  constructor(private firebaseFunctionsService: FirebaseFunctionsService) { }

  ngOnInit(): void {
    this.objetivoSeleccionado = this.wizardService.data.objetivo;
    this.distribucionSeleccionada = this.wizardService.data.distribucion;
  
    if (!this.objetivos || this.objetivos.length === 0) {
      this.loading = true; // Mostrar loader solo si vas a cargar datos
      this.firebaseFunctionsService.callFunction<ObjetivoApi[]>('getObjetivos').subscribe({
        next: (objetivos) => {
          const catalogo = objetivos.map(obj => ({
            nemonico: obj.id,
            nombre: obj.nombre,
            parametro1: obj.icono,
          }));
          this.catalog.registrarCatalogo('objetivos', catalogo);
          this.objetivos = catalogo;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('Error al obtener objetivos:', err);
        }
      });
    } else {
      // Si ya hay datos, simplemente los asignas y ocultas loader
      this.objetivos = this.objetivos;
      this.loading = false;
    }
  }
  

  selectObjetivo(nemonico: number) {
    this.objetivoSeleccionado = nemonico;
    this.wizardService.data.objetivo = this.objetivoSeleccionado;
  }

  selectDistribucion(nemonico: string) {
    if (!this.objetivoSeleccionado) return;
    this.distribucionSeleccionada = nemonico;
    this.wizardService.data.distribucion = this.distribucionSeleccionada;
    this.completed.emit();
  }

}
