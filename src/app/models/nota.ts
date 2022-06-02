import { Unit } from "./unit";

export interface Nota {
    presupuesto: boolean;
    nombre: string;
    orden: number;
    fecha: string;
    domicilio: string;
    unidad: string;
    modelo: string;
    km: string;
    placas: string;
    serie: string;
    observ: string;
    tel: string;
    antici: number;
    iva: boolean;
    tarjeta: boolean;
    efectivo: boolean;
    transferencia: boolean;
    firma1: string;
    firma1n: string;
    units: Unit[];
}
