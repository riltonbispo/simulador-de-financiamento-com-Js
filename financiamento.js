import { Parcela } from "./parcela.js";

export class Financiamento{
  #taxaJuros;
  #prazo;
  #parcelas = [];
  constructor(valor, entrada, taxaJuros, prazo){
    this.#taxaJuros = taxaJuros;
    this.#prazo = prazo;
    // aqui criar um novo objeto(parcela) no array parcelas -composição- 
    this.#parcelas.push(new Parcela(0,0,0,0,valor - entrada));
  }
  
  // metodo estatico pode ser usado sem instanciar um objeto
  static calcJuros(valor, taxaJuros){
    return valor * (taxaJuros / 100);
  }

  calcParcelaMensal(){
    let saldo = this.#parcelas[this.#parcelas.length - 1].getSaldo();
    let prazo = this.#prazo - (this.#parcelas.length - 1);
    let amortizacao = saldo / prazo;
    for(let i=0; i < prazo; i++){
      const numero = this.#parcelas.length;
      const juros = Financiamento.calcJuros(saldo, this.#taxaJuros);
      const valor = juros + amortizacao;
      saldo -= amortizacao;
      if (saldo < 0 ){saldo = 0}
      this.#parcelas.push(new Parcela(numero, valor, juros, amortizacao, saldo));
    }
  }

  exibeParcelas(){
    const parcelas = this.#parcelas.slice(1);

    // esse for cria uma linha no tbody
    for(const parcela of parcelas){
      const linha = corpoTabela.insertRow(-1);
      // esse for percorre os dados da parcela e adiciona na linha atual
      for(const dado of parcela.getDadosFormatado()){
        const celula = linha.insertCell(-1);
        celula.textContent = dado;
      }
    }
  }

  getParcelas(){
    return this.#parcelas;
  }

}