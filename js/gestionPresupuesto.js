"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

let gastos = [];
let idGasto = 0;

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let index = gastos.findIndex(g => g.id === id);
    if (index !== -1) {
        gastos.splice(index, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

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
        
        let lineas = [
            `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`,
            `Fecha: ${fechaLocal}`,
            `Etiquetas:`
        ];
        
        for (let etiqueta of this.etiquetas) {
            lineas.push(`- ${etiqueta}`);
        }
        
        // Unimos con \n y LE AÑADIMOS UN \n EXTRA AL FINAL EXACTO que pide el test
        return lineas.join('\n') + '\n';
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