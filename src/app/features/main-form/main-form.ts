import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepPersonalInfo } from "./step-personal-info/step-personal-info";
import { StepActividad } from "./step-actividad/step-actividad";
import { StepObjetivo } from "./step-objetivo/step-objetivo";
import { StepResumen } from "./step-resumen/step-resumen";
import { ModalComponent } from "../../shared/modal";

@Component({
  selector: 'app-main-form',
  imports: [CommonModule, StepPersonalInfo, StepActividad, StepObjetivo, StepResumen, ModalComponent],
  templateUrl: './main-form.html',
  styleUrl: './main-form.scss'
})
export class MainForm {
  currentStep = 0;
  completedSteps: number[] = [0]; // Por defecto el paso 0 está habilitado

  onStepCompleted() {
    if (!this.completedSteps.includes(this.currentStep + 1) && this.currentStep < 3) {
      this.completedSteps.push(this.currentStep + 1);
    }
    this.currentStep++;
  }

  goToStep(step: number) {
    if (this.completedSteps.includes(step) || step === this.currentStep) {
      this.currentStep = step;
    }
  }
}
