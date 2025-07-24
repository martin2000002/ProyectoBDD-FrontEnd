// menu-state.service.ts
import { Injectable } from '@angular/core';
import { Resumen } from '../models/resumen.model';

@Injectable({
    providedIn: 'root',
})
export class ResumenService {
    private resetedState: Resumen = {
        total: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
        desayuno: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
        almuerzo: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
        merienda: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 },
        menu: {
            desayuno: { titulo: '', descripcion: '', preparacion: 0, coccion: 0, ingredientes: [], instrucciones: [], nutricion: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 } },
            almuerzo: { titulo: '', descripcion: '', preparacion: 0, coccion: 0, ingredientes: [], instrucciones: [], nutricion: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 } },
            merienda: { titulo: '', descripcion: '', preparacion: 0, coccion: 0, ingredientes: [], instrucciones: [], nutricion: { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 } },
            cumpleNecesidades: false
        }
    };
    private state = this.resetedState;

    setState(newState: Resumen): void {
        this.state = newState;
    }

    getState(): Resumen {
        return this.state;
    }

    resetState(): void {
        this.state = this.resetedState;
    }
}
