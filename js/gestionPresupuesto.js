// TODO: Crear las funciones, objetos y variables indicadas en el enunciado


let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto += cantidad;
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
    if (valor < 0) {
        valor = 0;
    }
    this.descripcion = descripcion;
    this.valor = valor;
    this.mostrarGasto = function () {
        console.log(`Gasto correspondiente a ${descripcion} con valor ${valor}`);
    }


}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}