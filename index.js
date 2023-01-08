import { Financiamento } from "./financiamento.js";
import {FinanciamentoCarencia} from "./financiamentoCarencia.js"

const comCarencia = document.querySelector('#flexSwitchCheckDefault');
const listaSuspensa = document.querySelector('#listaSuspensa');
const corpoTabela = document.querySelector('#corpoTabela');
const botaoCalcular = document.querySelector('#botaoCalcular');
const textoValor = document.querySelector('#textoValor');
const textoEntrada = document.querySelector('#textoEntrada');
const textoTaxaJuros = document.querySelector('#textoTaxaJuros');
const textoPrazo = document.querySelector('#textoPrazo');

function limpaCorpoTabela(){
  while(corpoTabela.firstChild){
    corpoTabela.removeChild(corpoTabela.firstChild);
  }
}

comCarencia.addEventListener('change', ()=>{
  if(comCarencia.checked){
    listaSuspensa.removeAttribute('hidden');
  }else{
    listaSuspensa.setAttribute('hidden', 'hidden');
  }
});

botaoCalcular.addEventListener('click', ()=>{
  limpaCorpoTabela();
  const valor = parseFloat(textoValor.value);
  const entrada = parseFloat(textoEntrada.value);
  const taxaJuros = parseFloat(textoTaxaJuros.value);
  const prazo = parseFloat(textoPrazo.value);
  let simulacao;

  if(comCarencia.checked){
    const carencia = parseInt(listaSuspensa.value);
    simulacao = new FinanciamentoCarencia(valor, entrada, taxaJuros, prazo, carencia)
  } else{
    simulacao = new Financiamento(valor, entrada, taxaJuros, prazo);
  }
  simulacao.calcParcelaMensal();
  simulacao.exibeParcelas();
});