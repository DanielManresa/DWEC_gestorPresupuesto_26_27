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
//

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function filtrarGastos(filtro = {}) {
    return gastos.filter(gasto => {
        let cumpleCriterios = true;
        
        if (filtro.fechaDesde) {
            let fechaDesdeMs = Date.parse(filtro.fechaDesde);
            if (gasto.fecha < fechaDesdeMs) cumpleCriterios = false;
        }

        if (filtro.fechaHasta) {
            let fechaHastaMs = Date.parse(filtro.fechaHasta);
            if (gasto.fecha > fechaHastaMs) cumpleCriterios = false;
        }

        if (filtro.valorMinimo !== undefined) {
            if (gasto.valor < filtro.valorMinimo) cumpleCriterios = false;
        }

        if (filtro.valorMaximo !== undefined) {
            if (gasto.valor > filtro.valorMaximo) cumpleCriterios = false;
        }

        if (filtro.descripcionContiene) {
            let descNormalizada = gasto.descripcion.toLowerCase();
            let filtroDescNormalizada = filtro.descripcionContiene.toLowerCase();
            if (!descNormalizada.includes(filtroDescNormalizada)) cumpleCriterios = false;
        }

        if (filtro.etiquetasTiene && Array.isArray(filtro.etiquetasTiene) && filtro.etiquetasTiene.length > 0) {
            let etiquetasFiltroNormalizadas = filtro.etiquetasTiene.map(etq => etq.toLowerCase());
            let etiquetasGastoNormalizadas = gasto.etiquetas.map(etq => etq.toLowerCase());

            let tieneAlgunaEtiqueta = etiquetasGastoNormalizadas.some(etqGasto => 
                etiquetasFiltroNormalizadas.includes(etqGasto)
            );
            
            if (!tieneAlgunaEtiqueta) cumpleCriterios = false;
        }

        return cumpleCriterios;
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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = String(descripcion);
    
    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.etiquetas = [];
    
    // Configuración inicial de fecha
    if (fecha !== undefined) {
        let parsed = Date.parse(fecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        } else {
            this.fecha = Date.now();
        }
    } else {
        this.fecha = Date.now();
    }

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
        
        return lineas.join('\n') + '\n';
    };

    // Añadir etiquetas pasadas en el constructor
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
};