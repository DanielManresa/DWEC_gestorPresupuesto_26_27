'use strict';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha.toLocaleDateString('es-ES');
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let etiqueta = gasto.etiquetas[i];

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta;

        divEtiquetas.appendChild(spanEtiqueta);        
    }

    elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    if(!elemento) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1Titulo = document.createElement("h1");
    h1Titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Titulo);

    for(let clave in agrup){
        let valor = agrup[clave];    

        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;
        divDato.appendChild(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor; 
        divDato.appendChild(spanValor);

        divAgrupacion.appendChild(divDato);
    }

    elemento.appendChild(divAgrupacion);
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}