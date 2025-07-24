import { ModalModel } from "../modal.model";

export interface Nutricion {
    calorias: number;            // calorías
    proteinas: number;            // gramos
    carbohidratos: number;        // gramos
    grasas: number;                // gramos
}

export interface ComidaCard {
    key: 'desayuno' | 'almuerzo' | 'merienda';
    label: 'Desayuno' | 'Almuerzo' | 'Merienda';
    data: ModalModel;
  }