let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
    } else {
        cantidad = -1;
        console.log("Error al introducir el valor")
    }
    return cantidad;
}

function mostrarPresupuesto() {

    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`
}

function CrearGasto(descripcion, valor) {

    this.descripcion = descripcion;
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }


    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }

    }

}

function listarGastos(){

}

function anyadirGasto(){

}

function borrarGasto(){

}

function calcularTotalGastos(){

}
function calcularBalance(){
    
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}