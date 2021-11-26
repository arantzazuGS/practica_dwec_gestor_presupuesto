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
    }


}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let divContenedor = document.getElementById(idElemento);

    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';
    divContenedor.append(divAgrup);

    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrup.append(h1);

    for(const[key,value] of Object.entries(agrup)){
        let divAgrupDato= document. createElement('div');
        divAgrupDato.className = 'agrupacion-dato';
        divAgrup.append(divAgrupDato);

        let spanAgrupDatClave= document.createElement('span');
        spanAgrupDatClave.className = 'agrupacion-dato-clave';
        spanAgrupDatClave.textContent=`${key}`;
        divAgrupDato.append(spanAgrupDatClave);

        let spanAgrupDatValor= document.createElement('span');
        spanAgrupDatValor.className='agrupacion-dato-valor';
        spanAgrupDatValor.textContent=`${value}`;
        divAgrupDato.append(spanAgrupDatValor);


    }






}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}