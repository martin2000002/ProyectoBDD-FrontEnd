import { Component, OnInit, inject } from '@angular/core';
import { FormWizardService } from '../../../core/services/form-wizard.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { ModalModel } from '../../../core/models/modal.model';
import { FirebaseFunctionsService } from '../../../core/services/firebase-functions';
import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from '../../../core/services/catalog.service';
import { ComidaCard, Nutricion } from '../../../core/models/shared/nutricion.model';
import { ResumenService } from '../../../core/services/resumen.service';
import { Resumen } from '../../../core/models/resumen.model';
import { Menu } from '../../../core/models/firebase-functions/gemini/generarMenu';

@Component({
  selector: 'app-step-resumen',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './step-resumen.html',
  styleUrl: './step-resumen.scss'
})
export class StepResumen implements OnInit {


  posiblesProductos!: PosiblesProductos;
  
  comidas: ComidaCard[] = [];

  private catalog = inject(CatalogService);

  wizardService = inject(FormWizardService);

  resumenService = inject(ResumenService);

  data: Resumen = this.resumenService.getState();

  constructor(private modalService: ModalService, private firebaseFunctionsService: FirebaseFunctionsService) { }

  loading!: boolean;

  ngOnInit(): void {
    if (this.wizardService.hasChanged()) {
      this.loading = true;
      this.calcularMacrosTotales();
    } else {
      this.establecerComidas();
      this.loading = false;
    }
    this.wizardService.saveState();
  }

  calcularMacrosTotales() {
    const distribucion = this.catalog.obtenerValor('distribuciones', this.wizardService.data.distribucion!) as string;

    this.firebaseFunctionsService.callFunction<RangoNutricional[]>('getRangosNutricionales', {
      params: {
        objetivo_id: this.wizardService.data.objetivo,
        columna: distribucion
      }
    }).subscribe({
      next: rangos => {
        console.log('Rangos recibidos:', rangos);
        const { genero, edad, altura, peso } = this.wizardService.data.personalInfo!;

        const bmrStandard = 10 * peso + 6.25 * altura - 5 * edad;
        const bmr = genero === this.catalog.obtenerItem('generos', 'M')?.nemonico! ? bmrStandard + 5 : bmrStandard - 161;

        const actividadValor = this.catalog.obtenerValor('actividades', this.wizardService.data.actividad!) as number;

        const caloriasExactasCal = bmr * actividadValor * this.obtenerValor(rangos, 'calorias', distribucion);

        const proteinasExactasG = this.wizardService.data.personalInfo?.peso! * this.obtenerValor(rangos, 'proteinas', distribucion);

        const grasasExactasCal = caloriasExactasCal * this.obtenerValor(rangos, 'grasas', distribucion);

        const carbohidratosExactosCal = caloriasExactasCal - proteinasExactasG * 4 - grasasExactasCal;

        this.data.total.calorias = Math.round(caloriasExactasCal);
        this.data.total.proteinas = Math.round(proteinasExactasG);
        this.data.total.grasas = Math.round(grasasExactasCal / 9);
        this.data.total.carbohidratos = Math.round(carbohidratosExactosCal / 4);

        this.calcularMacrosComidas();
      },
      error: err => {
        console.error('Error al obtener rangos:', err);
      }
    });
  }

  obtenerValor(rangos: RangoNutricional[], tipoMacro: string, columna: string): number {
    const obj = rangos.find(r => r.tipo_macro === tipoMacro);
    return obj ? obj[columna as keyof RangoNutricional] as number : 0;
  }

  calcularMacrosComidas() {
    this.firebaseFunctionsService.callFunction<DistribucionComidas[]>('getDistribucionComidas').subscribe({
      next: (data: DistribucionComidas[]) => {
        console.log('Distribución:', data);
  
        const distribucionMap = data.reduce((acc, curr) => {
          acc[curr.nombre_comida.toLowerCase()] = curr.porcentaje_calorias;
          return acc;
        }, {} as Record<string, number>);
          this.data.desayuno = {
            calorias: this.data.total.calorias * (distribucionMap['desayuno'] || 0),
            proteinas: this.data.total.proteinas * (distribucionMap['desayuno'] || 0),
            carbohidratos: this.data.total.carbohidratos * (distribucionMap['desayuno'] || 0),
            grasas: this.data.total.grasas * (distribucionMap['desayuno'] || 0)
          };
          this.data.almuerzo = {
            calorias: this.data.total.calorias * (distribucionMap['almuerzo'] || 0),
            proteinas: this.data.total.proteinas * (distribucionMap['almuerzo'] || 0),
            carbohidratos: this.data.total.carbohidratos * (distribucionMap['almuerzo'] || 0),
            grasas: this.data.total.grasas * (distribucionMap['almuerzo'] || 0)
          };
          this.data.merienda = {
            calorias: this.data.total.calorias * (distribucionMap['merienda'] || 0),
            proteinas: this.data.total.proteinas * (distribucionMap['merienda'] || 0),
            carbohidratos: this.data.total.carbohidratos * (distribucionMap['merienda'] || 0),
            grasas: this.data.total.grasas * (distribucionMap['merienda'] || 0)
          }
      
        this.calcularPosiblesProductos();
      },
      error: (err: any) => {
        console.error('Error al llamar a getDistribucionComidas', err);
      }
    });
  }

  calcularPosiblesProductos() {
    const { desayuno, almuerzo, merienda } = this.data;

    this.firebaseFunctionsService.callFunction<any>('getPosiblesProductos', {
      method: 'POST',
      body: {
        desayuno, almuerzo, merienda
      }
    }).subscribe({
      next: (data: any) => {
        console.log('Respuesta:', data);
        this.posiblesProductos = data;
        this.generarMenu();
      },
      error: (err) => {
        console.error('Error al llamar a getPosiblesProductos', err);
      }
    });
  }

  generarMenu() {
    const { desayuno, almuerzo, merienda } = this.data;

    this.firebaseFunctionsService.callFunction<Menu>('generarMenu', {
      method: 'POST',
      body: {
        posiblesProductos: this.posiblesProductos,
        requerimientos: { desayuno, almuerzo, merienda }
      }
    }).subscribe({
      next: (data: Menu) => {
        console.log('Respuesta del menú:', data);
        this.data.menu = data;

        this.establecerComidas();

        this.resumenService.setState(this.data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al generar el menú:', err);
      }
    });

  }

  establecerComidas() {
    this.comidas = [
      { key: 'desayuno', label: 'Desayuno', data: this.data.menu?.desayuno },
      { key: 'almuerzo', label: 'Almuerzo', data: this.data.menu?.almuerzo },
      { key: 'merienda', label: 'Merienda', data: this.data.menu?.merienda }
    ];
  }

  getRequerimiento(comidaKey: 'desayuno' | 'almuerzo' | 'merienda', macro: keyof Nutricion): number {
    return this.data?.[comidaKey]?.[macro] ?? 0;
  }
  
  getRingColor(tipo: string): string {
    switch (tipo) {
      case 'proteina': return 'stroke-red-500';
      case 'carbohidrato': return 'stroke-yellow-500';
      case 'grasa': return 'stroke-green-500';
      default: return 'stroke-gray-500';
    }
  }

  onClickCard(key: 'desayuno' | 'almuerzo' | 'merienda') {
    if (!this.data.menu) return;
  
    const receta = this.data.menu[key];
    if (receta) {
      this.modalService.open(receta);
    }
  }
}
