import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormWizardService } from '../../../core/services/form-wizard.service';
import { CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-step-personal-info',
  templateUrl: './step-personal-info.html',
  styleUrl: './step-personal-info.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class StepPersonalInfo implements OnInit {

  @Output() completed = new EventEmitter<void>();

  private wizardService = inject(FormWizardService);

  private catalog = inject(CatalogService);

  generos = this.catalog.obtenerCatalogo('generos');

  personalForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      altura: ['', [Validators.required, Validators.min(30), Validators.max(300)]],
      peso: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      genero: ['', [Validators.required]],
    });

        // Guardar automáticamente en el servicio cuando cambia el formulario
        this.personalForm.valueChanges.subscribe(value => {
          if (this.personalForm.valid) {
            this.wizardService.data.personalInfo = value;
          } else {
            this.wizardService.data.personalInfo = null; // O puedes guardar el valor parcial
          }
        });
    
        // Si ya existía info, la cargo al form
        if (this.wizardService.data.personalInfo) {
          this.personalForm.patchValue(this.wizardService.data.personalInfo);
        }
      
  }
  

  tryCompleteStep() {
    if (this.personalForm.valid) {
      this.completed.emit();
    } else {
      this.personalForm.markAllAsTouched();
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.personalForm.get(controlName);
    if (!control || !control.touched) return '';
    if (control.hasError('required')) return 'Este campo es obligatorio';
    if (control.hasError('minlength')) return `Mínimo ${control.errors!['minlength'].requiredLength} caracteres`;
    if (control.hasError('min')) return `Valor mínimo permitido: ${control.errors!['min'].min}`;
    if (control.hasError('max')) return `Valor máximo permitido: ${control.errors!['max'].max}`;
    return '';
  }
}
