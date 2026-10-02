"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function listarGastos() {}
function anyadirGasto() {}
function borrarGasto() {}
function calcularTotalGastos() {}
function calcularBalance() {}

function actualizarPresupuesto(nuevoValor) {
    if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
        presupuesto = nuevoValor;
        return presupuesto;
    } else {
        console.error("El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = String(descripcion);
    
    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    // Nuevas propiedades
    this.etiquetas = [];
    
    // Configuración inicial de fecha
    if (fecha !== undefined) {
        let parsed = Date.parse(fecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed; // timestamp
        } else {
            this.fecha = Date.now(); // timestamp actual si no es válida
        }
    } else {
        this.fecha = Date.now(); // timestamp actual si no se pasa parámetro
    }

    // Métodos nuevos
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(eti => !etiquetasABorrar.includes(eti));
    };

    this.actualizarFecha = function(nuevaFecha) {
        let parsed = Date.parse(nuevaFecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        }
    };

    this.mostrarGastoCompleto = function() {
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocal}\nEtiquetas:`;
        for (let etiqueta of this.etiquetas) {
            texto += `\n${etiqueta}`;
        }
        return texto;
    };

    // Añadir etiquetas pasadas en el constructor
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    // Métodos antiguos
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}

export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
};