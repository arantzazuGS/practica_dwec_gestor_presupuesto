import * as gesPres from "./gestionPresupuesto.js";

let btAct = document.getElementById("actualizarpresupuesto");
let btAny = document.getElementById("anyadirgasto");

// Eventos
btAct.addEventListener("click",actualizarPresupuestoWeb);
btAny.addEventListener("click",nuevoGastoWeb);

function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);
    div.textContent = valor;

}

function EditarHandle() {
    this.handleEvent = function (e) {
        let descr = prompt("Por favor, introduzca una nueva descripcion", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(descr);

        let valor = prompt("Por favor, introduzca un nuevo valor", this.gasto.valor);
        this.gasto.actualizarValor(parseFloat(valor));

        let fecha = prompt("Por favor, introduzca una nueva fecha en formato YYYY-MM-DD", this.gasto.fecha);
        this.gasto.actualizarFecha(fecha);
        //Borrar etiquetas TODO
        let etiquetas = prompt("Por favor, introduzca las nuevas etiquetas separadas por ','", this.gasto.etiquetas);
        let arrEtiq = etiquetas.split(',');
        this.gasto.anyadirEtiquetas(...arrEtiq);

        repintar();
    }

}

function BorrarHandle() {
    this.handleEvent= function(e) {
        let idGasto= this.gasto.id;
        gesPres.borrarGasto(idGasto);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent= function(e) {
        let etiq= this.gasto.etiqueta;
        this.gasto.borrarEtiquetas(etiq);
        repintar();
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';
    contenedor.append(divGasto);

    let divGasDescr = document.createElement('div');
    divGasDescr.className = 'gasto-descripcion';
    divGasto.append(divGasDescr);
    divGasDescr.textContent = `${gasto.descripcion}`;

    let divGasFecha = document.createElement('div');
    divGasFecha.className = 'gasto-fecha';
    divGasto.append(divGasFecha);
    divGasFecha.textContent = `${gasto.fecha}`;

    let divGasValor = document.createElement('div');
    divGasValor.className = 'gasto-valor';
    divGasto.append(divGasValor);
    divGasValor.textContent = `${gasto.valor}`;

    let divGasEtiq = document.createElement('div');
    divGasEtiq.className = 'gasto-etiquetas';
    divGasto.append(divGasEtiq);



    for (let etiqueta of gasto.etiquetas) {

        let spanGasEtiq = document.createElement('span');
        spanGasEtiq.className = 'gasto-etiquetas-etiqueta';
        divGasEtiq.append(spanGasEtiq);
        spanGasEtiq.textContent = `${etiqueta} `;

        //borrar etiquetas:
        let evBorrarEtiquetas= new BorrarEtiquetasHandle();
        evBorrarEtiquetas.gasto=gasto;
        evBorrarEtiquetas.gasto.etiqueta = etiqueta;

        spanGasEtiq.addEventListener("click", evBorrarEtiquetas);
    }

    //botones editar y borrar
    let btEdit = document.createElement("button");
    btEdit.type = "button";
    btEdit.className = "gasto-editar";
    btEdit.textContent = "Editar"
    divGasto.append(btEdit);

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    btEdit.addEventListener("click", evEditar);

    let btDelete= document.createElement("button");
    btDelete.type = "button";
    btDelete.className= "gasto-borrar";
    btDelete.textContent="Borrar";
    divGasto.append(btDelete);

    let evBorrar= new BorrarHandle();
    evBorrar.gasto= gasto;

    btDelete.addEventListener("click",evBorrar);




}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let divContenedor = document.getElementById(idElemento);

    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';


    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1);

    for (const [key, value] of Object.entries(agrup)) {
        let divAgrupDato = document.createElement('div');
        divAgrupDato.className = 'agrupacion-dato';
        divAgrup.append(divAgrupDato);

        let spanAgrupDatClave = document.createElement('span');
        spanAgrupDatClave.className = 'agrupacion-dato-clave';
        spanAgrupDatClave.textContent = `${key}`;
        divAgrupDato.append(spanAgrupDatClave);

        let spanAgrupDatValor = document.createElement('span');
        spanAgrupDatValor.className = 'agrupacion-dato-valor';
        spanAgrupDatValor.textContent = `${value}`;
        divAgrupDato.append(spanAgrupDatValor);
    }
    divContenedor.append(divAgrup);
}

function repintar() {

    let presup = gesPres.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presup);

    let totalGasto = gesPres.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGasto);

    let balance = gesPres.calcularBalance();
    mostrarDatoEnId("balance-total", balance);

    let divGasCompleto = document.getElementById("listado-gastos-completo");
    divGasCompleto.innerHTML = "";

    let listaGastos = gesPres.listarGastos();
    for (let g of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function actualizarPresupuestoWeb() {
    let presu = prompt("Por favor, introduzca un presupuesto");
    presu= parseInt(presu);
    gesPres.actualizarPresupuesto(presu);
    repintar();
}



function nuevoGastoWeb() {
    let descr = prompt("Por favor, introduzca una descripcion");
    let valor = prompt("Por favor, introduzca un valor");
    valor= parseFloat(valor);
    let fecha = prompt("Por favor, introduzca una fecha en formato YYYY-MM-DD");
    let etiquetas = prompt("Por favor, introduzca las etiquetas separadas por ','");
    let arrEtiq = etiquetas.split(',');
    let gastoNew = new gesPres.CrearGasto(descr, valor, fecha, arrEtiq);
    gesPres.anyadirGasto(gastoNew);

    repintar();
}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,



}