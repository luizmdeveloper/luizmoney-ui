export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  numero: string;
  complemento: string;
}

export class Categoria {
  codigo: number;
  nome: string;
}

export class Lancamento {
  codigo: number;
  descricao: string;
  tipoDespesa = 'RECEITA';
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}
