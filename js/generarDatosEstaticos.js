

import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";


gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

let gastos = [];
let gasto1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPres.anyadirGasto(gasto1);
gesPres.anyadirGasto(gasto2);
gesPres.anyadirGasto(gasto3);
gesPres.anyadirGasto(gasto4);
gesPres.anyadirGasto(gasto5);
gesPres.anyadirGasto(gasto6);


let total = gesPres.calcularTotalGastos();
gesPresWeb.mostrarDatoEnId("gastos-totales", total);

let balance = gesPres.calcularBalance();
gesPresWeb.mostrarDatoEnId("balance-total", balance);

gastos = gesPres.listarGastos();
for (let gasto of gastos) {
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let gastosFiltrados1 = gesPres.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
for (let gasto of gastosFiltrados1) {
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let gastosFiltrados2 = gesPres.filtrarGastos({
    valorMinimo: 50
});
for (let gasto of gastosFiltrados2) {
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let gastosFiltrados3 = gesPres.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});
for (let gasto of gastosFiltrados3) {
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let gastosFiltrados4 = gesPres.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});
for (let gasto of gastosFiltrados4) {
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}
let periodo1 = "dia";
let gastosAgrupados = gesPres.agruparGastos(periodo1);
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupados, "día");


let periodo2 = "mes";
let gastosAgrupados2 = gesPres.agruparGastos(periodo2);
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupados2, "mes");

let periodo3= "anyo";
let gastosAgrupados3= gesPres.agruparGastos(periodo3);
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupados3, "año");

