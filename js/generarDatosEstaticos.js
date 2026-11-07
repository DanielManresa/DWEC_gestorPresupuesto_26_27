'use strict';

import * as gestionP from "./gestionPresupuesto.js";
import * as gestionPW from "./gestionPresupuestoWeb.js";

gestionP.actualizarPresupuesto(1500);

gestionPW.mostrarDatoEnId("presupuesto", gestionP.mostrarPresupuesto());

let gasto1 = new gestionP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionP.anyadirGasto(gasto1);
gestionP.anyadirGasto(gasto2);
gestionP.anyadirGasto(gasto3);
gestionP.anyadirGasto(gasto4);
gestionP.anyadirGasto(gasto5);
gestionP.anyadirGasto(gasto6);

gestionPW.mostrarDatoEnId("gastos-totales", gestionP.calcularTotalGastos());
gestionPW.mostrarDatoEnId("balance-total", gestionP.calcularBalance());

let listaGastos = gestionP.listarGastos();

for (let i = 0; i < listaGastos.length; i++) {
    let gasto = listaGastos[i];
    gestionPW.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let filtrados1 = gestionP.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let gasto of filtrados1) {
    gestionPW.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let filtrados2 = gestionP.filtrarGastos({ valorMinimo: 50 });
for (let gasto of filtrados2) {
    gestionPW.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let filtrados3 = gestionP.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let gasto of filtrados3) {
    gestionPW.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let filtrados4 = gestionP.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] });
for (let gasto of filtrados4) {
    gestionPW.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

gestionPW.mostrarGastosAgrupadosWeb("agrupacion-dia", gestionP.agruparGastos("dia"), "día");
gestionPW.mostrarGastosAgrupadosWeb("agrupacion-mes", gestionP.agruparGastos("mes"), "mes");
gestionPW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gestionP.agruparGastos("anyo"), "año");