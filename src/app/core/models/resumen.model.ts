import { Menu } from "./firebase-functions/gemini/generarMenu";
import { Nutricion } from "./shared/nutricion.model";


export interface Resumen {
    total: Nutricion;
    desayuno: Nutricion;
    almuerzo: Nutricion;
    merienda: Nutricion;
    menu: Menu;
}