import * as gesPres from "./gestionPresupuesto.js";

let btAct = document.getElementById("actualizarpresupuesto");
let btAny = document.getElementById("anyadirgasto");
let btAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");

// Eventos
btAct.addEventListener("click", actualizarPresupuestoWeb);
btAny.addEventListener("click", nuevoGastoWeb);


let manejadorCrearForm = new NuevoGastoWebFormulario();
btAnyadirGastoFormulario.addEventListener("click", manejadorCrearForm);




function mostrarDatoEnId(idElemento, valor) {
    let div = document.getElementById(idElemento);
    div.textContent = valor;

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
    divGasFecha.textContent = `${new Date(gasto.fecha).toISOString()}`;

    let divGasValor = document.createElement('div');
    divGasValor.className = 'gasto-valor';
    divGasto.append(divGasValor);
    divGasValor.textContent = `${gasto.valor}`;

    let divGasEtiq = document.createElement('div');
    divGasEtiq.className = 'gasto-etiquetas';
    divGasto.append(divGasEtiq);



    for (let eti of gasto.etiquetas) {

        let spanGasEtiq = document.createElement('span');
        spanGasEtiq.className = 'gasto-etiquetas-etiqueta';
        spanGasEtiq.textContent = `${eti} `;
        divGasEtiq.append(spanGasEtiq);

        //borrar etiquetas:
        let evBorrarEtiquetas = new BorrarEtiquetasHandle();
        evBorrarEtiquetas.gasto = gasto;
        evBorrarEtiquetas.etiqueta = eti;

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

    let btDelete = document.createElement("button");
    btDelete.type = "button";
    btDelete.className = "gasto-borrar";
    btDelete.textContent = "Borrar";
    divGasto.append(btDelete);

    let evBorrar = new BorrarHandle();
    evBorrar.gasto = gasto;
    btDelete.addEventListener("click", evBorrar);

    //boton editar a traves de formulario: 
    let btEditForm = document.createElement("button");
    btEditForm.type = "button";
    btEditForm.className = "gasto-editar-formulario";
    btEditForm.textContent = "Editar(Formulario)";
    divGasto.append(btEditForm);

    let evEditForm = new EditarHandleFormulario();
    evEditForm.gasto = gasto;
    btEditForm.addEventListener("click", evEditForm);







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

    document.getElementById("presupuesto").innerHTML = "";
    let presup = gesPres.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presup);

    document.getElementById("gastos-totales").innerHTML = "";
    let totalGasto = gesPres.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", totalGasto);

    document.getElementById("balance-total").innerHTML = "";
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
    presu = parseInt(presu);
    gesPres.actualizarPresupuesto(presu);
    repintar();
}



function nuevoGastoWeb() {
    let descr = prompt("Por favor, introduzca una descripcion");
    let valor = prompt("Por favor, introduzca un valor");
    valor = parseFloat(valor);
    let fecha = prompt("Por favor, introduzca una fecha en formato YYYY-MM-DD");
    let etiquetas = prompt("Por favor, introduzca las etiquetas separadas por ','");
    let arrEtiq = etiquetas.split(',');
    let gastoNew = new gesPres.CrearGasto(descr, valor, fecha, arrEtiq);
    gesPres.anyadirGasto(gastoNew);

    repintar();
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
    this.handleEvent = function (e) {
        let idGasto = this.gasto.id;
        gesPres.borrarGasto(idGasto);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (e) {

        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//FORMULARIOS

function NuevoGastoWebFormulario() {
    this.handleEvent = function (e) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        e.target.disabled = "disabled";

        let manEnv = new EnviarNuevoGastoHandleForm();
        manEnv.formulario = formulario;
        manEnv.btAnyadirGastoFormulario = e.target;
        formulario.addEventListener("submit", manEnv);

        let manCanc = new CancelarNuevoGastoHandleForm();
        manCanc.formulario = formulario;
        manCanc.btAnyadirGastoFormulario = e.target;
        let btCanc = formulario.querySelector("button.cancelar");
        btCanc.addEventListener("click", manCanc);


        let contened = document.getElementById("controlesprincipales");
        contened.append(formulario);
    }
}

function EnviarNuevoGastoHandleForm() {
    this.handleEvent = function (e) {
        e.preventDefault();
        let descr = document.getElementById("descripcion").value;
        let valor = document.getElementById("valor").value;
        valor = parseFloat(valor);
        let fecha = document.getElementById("fecha").value;
        let etiquetas = document.getElementById("etiquetas").value;
        etiquetas = etiquetas.split(",");

        let gastoN = new gesPres.CrearGasto(descr, valor, fecha, ...etiquetas);

        gesPres.anyadirGasto(gastoN);

        repintar();

        this.btAnyadirGastoFormulario.disabled = false;

        this.formulario.remove();

    }
}

function CancelarNuevoGastoHandleForm() {
    this.handleEvent = function (e) {
        e.preventDefault();
        this.btAnyadirGastoFormulario.disabled = false;
        this.formulario.remove();

    }
}

function EditarHandleFormulario() {
    this.handleEvent = function (e) {
        let plantillaForm = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaForm.querySelector("form");
        e.target.disabled = true;

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;


        let evSubmit = new SubmitHandleForm();
        evSubmit.gasto = this.gasto;
        evSubmit.form = formulario;
        formulario.addEventListener("submit", evSubmit);

        let evCancel = new CancelHandleForm();
        evCancel.form = formulario;
        evCancel.btEditForm = e.target;
        let btCancel = formulario.querySelector("button.cancelar");
        btCancel.addEventListener("click", evCancel);


        e.target.after(formulario);

    }
}

function SubmitHandleForm() {
    this.handleEvent = function (e) {
        e.preventDefault();

        let desc = this.form.elements.descripcion.value;
        if (desc != "") {
            this.gasto.actualizarDescripcion(desc);
        }

        let val = this.form.elements.valor.value;
        val = parseFloat(val);
        this.gasto.actualizarValor(val);


        let fecha = this.form.elements.fecha.value;
        if (fecha != "") {
            this.gasto.actualizarFecha(fecha);

        }

        let etiquetas = this.form.etiquetas.value;
        if (etiquetas != "") {
            etiquetas = etiquetas.split(",");

            this.gasto.anyadirEtiquetas(...etiquetas);
        }


        repintar();



    }
}

function CancelHandleForm() {
    this.handleEvent = function (e) {
        e.preventDefault();
        this.form.remove();
        this.btEditForm.disabled = false;


    }
}

//Regexp
let formFiltrado = document.getElementById("formulario-filtrado");
let manejadorFiltrado= new filtrarGastosWeb();
formFiltrado.addEventListener("submit", manejadorFiltrado);

function filtrarGastosWeb() {
    this.handleEvent = function (e) {
        e.preventDefault();

        let descrip = formFiltrado.elements["formulario-filtrado-descripcion"].value;
        let valMin = formFiltrado.elements["formulario-filtrado-valor-minimo"].value;
        let valMax = formFiltrado.elements["formulario-filtrado-valor-maximo"].value;
        let fechaDesd = formFiltrado.elements["formulario-filtrado-fecha-desde"].value;
        let fechaHast = formFiltrado.elements["formulario-filtrado-fecha-hasta"].value;

        let etiquets = formFiltrado.elements["formulario-filtrado-etiquetas-tiene"].value;
        if (etiquets != "") {
            var etiquValidas = gesPres.transformarListadoEtiquetas(etiquets);
        }

        let filtro = {
            fechaDesde: fechaDesd,
            fechaHasta: fechaHast,
            valorMinimo: valMin,
            valorMaximo: valMax,
            descripcionContiene: descrip,
            etiquetasTiene: etiquValidas
        };
        let filtrado = gesPres.filtrarGastos(filtro);
        document.getElementById("listado-gastos-completo").innerHTML = "";
        for (let g of filtrado) {
            mostrarGastoWeb("listado-gastos-completo", g);
        }

    }



}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,

}