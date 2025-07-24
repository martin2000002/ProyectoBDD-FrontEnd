import { Injectable } from '@angular/core';
import { FormWizardData } from '../models/form-wizard.model';

@Injectable({
  providedIn: 'root'
})
export class FormWizardService {
  private lastData: FormWizardData = {
    personalInfo: null,
    actividad: null,
    objetivo: null,
    distribucion: null
  };

  data: FormWizardData = {
    personalInfo: null,
    actividad: null,
    objetivo: null,
    distribucion: null
  };

  reset() {
    this.data = {
      personalInfo: null,
      actividad: null,
      objetivo: null,
      distribucion: null
    };
  }

  saveState() {
    this.lastData = JSON.parse(JSON.stringify(this.data));
  }

  hasChanged(): boolean {
    return JSON.stringify(this.lastData) !== JSON.stringify(this.data);
  }
}
