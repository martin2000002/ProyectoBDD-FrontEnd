import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardService } from '../../../core/services/form-wizard.service';
import { CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-step-actividad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-actividad.html',
  styleUrl: './step-actividad.scss'
})
export class StepActividad implements OnInit {
  @Output() completed = new EventEmitter<void>();

  private wizardService = inject(FormWizardService);

  actividadSeleccionada: string | null = null;

  private catalog = inject(CatalogService);

  actividades = this.catalog.obtenerCatalogo('actividades');

  ngOnInit(): void {
    this.actividadSeleccionada = this.wizardService.data.actividad;
  }

  selectActividad(nemonico: string) {
    this.actividadSeleccionada = nemonico;
    this.wizardService.data.actividad = nemonico;
    this.completed.emit();
  }
}
