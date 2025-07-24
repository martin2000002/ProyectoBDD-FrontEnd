interface ObjetivoApi {
    id: number;
    nombre: string;
    icono: string;
}

interface RangoNutricional {
    tipo_macro: string;
    valor_minimo?: number;
    valor_moderado?: number;
    valor_maximo?: number;
}

interface DistribucionComidas {
    id: number;
    nombre_comida: string;
    porcentaje_calorias: number;
}

//#region: Posibles Productos

interface ProductoSeleccionado {
    id: number;
    nombre: string;
    cantidad_g: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    calorias: number;
}

interface PosiblesProductos {
    proteinas: ProductoSeleccionado[];
    carbohidratos: ProductoSeleccionado[];
    complementos: ProductoSeleccionado[];
    frutas: ProductoSeleccionado[];
    vegetales: ProductoSeleccionado[];
}

//#endregion

