"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

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

function CrearGasto(descripcion, valor) {
    this.descripcion = String(descripcion);
    
    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

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
    CrearGasto
};