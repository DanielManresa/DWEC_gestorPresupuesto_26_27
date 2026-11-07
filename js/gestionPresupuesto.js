"use strict";

// Variable global
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
    let indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos() {
    let total = gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
    return parseFloat(total.toFixed(2));
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function actualizarPresupuesto(nuevoValor) {
    if (typeof nuevoValor !== 'number' || isNaN(nuevoValor) || nuevoValor < 0) {
        console.error("El valor introducido debe ser un número no negativo.");
        return -1;
    }
    
    presupuesto = parseFloat(nuevoValor.toFixed(2));
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function filtrarGastos(filtro = {}) {
    return gastos.filter(gasto => {
        let tiempoGasto = gasto.fecha.getTime();

        if (filtro.fechaDesde !== undefined) {
            let tiempoDesde = new Date(filtro.fechaDesde).getTime();
            if (!isNaN(tiempoDesde) && tiempoGasto < tiempoDesde) return false;
        }

        if (filtro.fechaHasta !== undefined) {
            let tiempoHasta = new Date(filtro.fechaHasta).getTime();
            if (!isNaN(tiempoHasta) && tiempoGasto > tiempoHasta) return false;
        }

        if (filtro.valorMinimo !== undefined && gasto.valor < filtro.valorMinimo) return false;
        
        if (filtro.valorMaximo !== undefined && gasto.valor > filtro.valorMaximo) return false;

        if (filtro.descripcionContiene !== undefined) {
            let descGasto = gasto.descripcion.toLowerCase();
            let descFiltro = filtro.descripcionContiene.toLowerCase();
            if (!descGasto.includes(descFiltro)) return false;
        }

        if (filtro.etiquetasTiene !== undefined && filtro.etiquetasTiene.length > 0) {
            let tieneAlguna = filtro.etiquetasTiene.some(etFiltro => 
                gasto.etiquetas.some(etGasto => etGasto.toLowerCase() === etFiltro.toLowerCase())
            );
            if (!tieneAlguna) return false;
        }

        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let parametrosFiltro = {};
    
    if (etiquetas && etiquetas.length > 0) {
        parametrosFiltro.etiquetasTiene = etiquetas;
    }
    if (fechaDesde) {
        parametrosFiltro.fechaDesde = fechaDesde;
    }
    
    if (!fechaHasta) {
        parametrosFiltro.fechaHasta = new Date().toISOString(); 
    } else {
        parametrosFiltro.fechaHasta = fechaHasta;
    }

    let gastosFiltrados = filtrarGastos(parametrosFiltro);

    return gastosFiltrados.reduce((acc, gastoActual) => {
        let clavePeriodo = gastoActual.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clavePeriodo]) {
            acc[clavePeriodo] = 0;
        }

        acc[clavePeriodo] += gastoActual.valor;

        return acc;
    }, {});
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    this.valor = (typeof valor === 'number' && valor >= 0 && !isNaN(valor)) ? valor : 0;

    let fechaParseada = new Date(fecha);
    this.fecha = (fecha !== undefined && !isNaN(fechaParseada.getTime())) ? fechaParseada : new Date();

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        let etiquetasAplanadas = nuevasEtiquetas.flat(); 
        
        for (let etiqueta of etiquetasAplanadas) {
            if (typeof etiqueta === 'string' && !this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        let aBorrar = etiquetasABorrar.flat();
        this.etiquetas = this.etiquetas.filter(etiqueta => !aBorrar.includes(etiqueta));
    };

    this.actualizarFecha = function(nuevaFecha) {
        let fechaParseada = new Date(nuevaFecha);
        if (nuevaFecha !== undefined && !isNaN(fechaParseada.getTime())) {
            this.fecha = fechaParseada;
        }
    };

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function() {
        let fechaTexto = this.fecha.toLocaleString('es-ES');
        
        let textoEtiquetas = "";
        for (let etiqueta of this.etiquetas) {
            textoEtiquetas += `- ${etiqueta}\n`;
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaTexto}\nEtiquetas:\n${textoEtiquetas}`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor !== 'number' || isNaN(nuevoValor) || nuevoValor < 0) {
            console.error("Has introducido un número negativo o no has introducido un número");
        } else {
            this.valor = nuevoValor;
        }
    };

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let anyo = this.fecha.getFullYear();
        let mes = (this.fecha.getMonth() + 1).toString().padStart(2, '0');
        let dia = this.fecha.getDate().toString().padStart(2, '0');

        switch(periodo) {
            case "anyo": return `${anyo}`;
            case "mes": return `${anyo}-${mes}`;
            case "dia": return `${anyo}-${mes}-${dia}`;
            default: return undefined;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
};