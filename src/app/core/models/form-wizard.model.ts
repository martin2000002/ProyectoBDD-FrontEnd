export interface PersonalInfo {
  nombre: string;
  genero: string;
  edad: number;
  altura: number;
  peso: number;
}

export interface FormWizardData {
  personalInfo: PersonalInfo | null;
  actividad: string | null;
  objetivo: number | null;
  distribucion: string | null;
}
