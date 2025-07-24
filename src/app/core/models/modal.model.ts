import { Nutricion } from "./shared/nutricion.model";

export interface ModalModel {
    titulo: string;                 // Nombre de la receta
    descripcion: string;            // Breve descripción
    preparacion: number;            // Tiempo de preparación (minutos)
    coccion: number;                // Tiempo de cocción (minutos)
    ingredientes: string[];        // Lista de ingredinetes
    instrucciones: string[];        // Lista de instrucciones paso a paso
    nutricion: Nutricion;
}
