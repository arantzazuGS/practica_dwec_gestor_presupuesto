let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
    } else {
        cantidad = -1;
        console.log("Error al introducir el valor");
    }
    return cantidad;
}

function mostrarPresupuesto() {

    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion = descripcion;
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }


    if (fecha) {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    } else {
        fecha = Date.now();
        this.fecha = fecha;
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function (...etiquetas) {
        let pos;
        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.lastIndexOf(etiqueta);
            if (pos == -1) {
                this.etiquetas.push(etiqueta);
            }
        }
    }
    this.anyadirEtiquetas(...etiquetas);


    this.mostrarGasto = function () {

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.mostrarGastoCompleto = function () {

        let date = new Date(this.fecha);
        let textoFecha = date.toLocaleString();

        let textoEtiquetas = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            textoEtiquetas += `- ${this.etiquetas[i]}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${textoFecha}\nEtiquetas:\n${textoEtiquetas}`;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.actualizarFecha = function (fecha) {
        fecha = Date.parse(fecha);
        if (fecha) {
            this.fecha = fecha;
        }
    }



    this.borrarEtiquetas = function (...etiquetas) {
        let pos;
        for (let etiqueta of etiquetas) {
            pos = this.etiquetas.lastIndexOf(etiqueta);
            if (pos != -1) {
                this.etiquetas.splice(pos, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function (periodo) {
        let date = new Date(this.fecha);
        let textoFecha = date.toISOString();
        let periodoAgrupacion = "";

        switch (periodo) {
            case "dia":
                periodoAgrupacion = textoFecha.substring(0, 10);
                return periodoAgrupacion;
                break;
            case "mes":
                periodoAgrupacion = textoFecha.substring(0, 7);
                return periodoAgrupacion;
                break;
            case "anyo":
                periodoAgrupacion = textoFecha.substring(0, 4);
                return periodoAgrupacion;
                break;

        }
    }

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let pos = gastos.findIndex(item => item.id === id);
    if (pos != -1) {
        gastos.splice(pos, 1);
    }
}

function calcularTotalGastos() {
    let sumaGastos = 0;
    for (let i = 0; i < gastos.length; i++) {
        sumaGastos += gastos[i].valor;
    }
    return sumaGastos;

}

function calcularBalance() {
    let sumaGastos = calcularTotalGastos();
    let balance = presupuesto - sumaGastos;
    return balance;
}

function filtrarGastos({
    fechaDesde,
    fechaHasta,
    valorMinimo,
    valorMaximo,
    descripcionContiene,
    etiquetasTiene
}) {
    let filtrados = [];
    if (!fechaDesde && !fechaHasta && !valorMinimo && !valorMaximo && !descripcionContiene && !etiquetasTiene) {
        filtrados = gastos;
    }
    if (fechaDesde) {
        let fD = Date.parse(fechaDesde);
        filtrados = gastos.filter(item => item.fecha >= fD);
    }
    if (fechaHasta) {
        let fH = Date.parse(fechaHasta);
        if (filtrados.length == 0) {
            filtrados = gastos.filter(item => item.fecha <= fH);
        } else {
            let i = 0;
            do {
                if (fH < filtrados[i].fecha) {
                    let pos = i;
                    filtrados.splice(pos, 1);
                } else {
                    i++;
                }
            } while (i < filtrados.length);
        }
    }
    if (valorMinimo) {
        if (filtrados.length > 0) {
            let i = 0;
            do {
                if (valorMinimo > filtrados[i].valor) {
                    let pos = i;
                    filtrados.splice(pos, 1);
                } else {
                    i++;
                }
            } while (i < filtrados.length);

        } else if (filtrados.length == 0) {
            filtrados = gastos.filter(item => item.valor >= valorMinimo);
        }
    }

    if (valorMaximo) {

        if (filtrados.length > 0) {
            let i = 0;
            do {
                if (filtrados[i].valor > valorMaximo) {
                    let pos = i;
                    filtrados.splice(pos, 1);
                } else {
                    i++;
                }
            } while (i < filtrados.length);
        }
        if (filtrados.length == 0) {
            filtrados = gastos.filter(item => item.valor <= valorMaximo);
        }
    }

    if (descripcionContiene) {
        if (filtrados.length > 0) {
            let i = 0;
            do {
                let incluye = filtrados[i].descripcion.includes(descripcionContiene);
                if (!incluye) {
                    let pos = i;
                    filtrados.splice(pos, 1);
                } else {
                    i++;
                }
            } while (i < filtrados.length);
        }
        if (filtrados.length == 0) {
            for (let gasto of gastos) {
                let incluye = gasto.descripcion.includes(descripcionContiene);
                if (incluye) {
                    filtrados.push(gasto);
                }
            }

        }
    }

    if (etiquetasTiene) {
        if (filtrados.length > 0) {
            let i = 0;

            let existe = false;
            let pos = -1;
            for (i = 0; i < filtrados.length; i++) {
                if (pos >= 0) {
                    i = 0;
                }
                let j = 0;
                do {
                    let etiq = etiquetasTiene[j];
                    existe = filtrados[i].etiquetas.includes(etiq);
                    j++;
                } while (!existe && j < etiquetasTiene.length);
                if (!existe) {
                    pos = i;
                    filtrados.splice(pos, 1);
                }
            }



        }

        if (filtrados.length == 0) {
            for (let etiq of etiquetasTiene) {
                let contieneEtiq;
                let contieneId;
                for (let gasto of gastos) {
                    contieneEtiq = gasto.etiquetas.includes(etiq);
                    if (contieneEtiq) {
                        let idG = gasto.id;
                        let i = 0;
                        let pos = filtrados.findIndex(item => item.id === idG);
                        if (pos == -1) {
                            filtrados.push(gasto);
                        }
                    }
                }
            }
        }
    }





    return filtrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){

    let etiquetasTiene = etiquetas;

    if(!fechaDesde){
        fechaDesde = "2020-01-01";
    }
    if(!fechaHasta){
        fechaHasta =  new Date(Date.now()).toISOString().substr(0,10);
    }

    let gastosCreados = filtrarGastos({fechaDesde, fechaHasta, etiquetasTiene});

    let resultado = gastosCreados.reduce((acc , gasto) => {

        let propiedad = gasto.obtenerPeriodoAgrupacion(periodo);
        
        acc[propiedad] = ( acc[propiedad] || 0) + gasto.valor;

        return acc;

    }, {});

    return resultado;
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}