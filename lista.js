const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let lista = [];

function menu() {
  console.log('\nO que deseja fazer?');
  console.log('1 - Adicionar item');
  console.log('2 - Remover item');
  console.log('3 - Mostrar lista');
  console.log('4 - Sair');
  rl.question('> ', (opcao) => {
    switch(opcao) {
      case '1':
        adicionarItem();
        break;
      case '2':
        removerItem();
        break;
      case '3':
        mostrarLista();
        break;
      case '4':
        console.log('Tchau!');
        rl.close();
        break;
      default:
        console.log('Opção inválida.');
        menu();
    }
  });
}

function adicionarItem() {
  rl.question('Digite o nome do item: ', (nome) => {
    if (!nome) {
      console.log('Nome inválido.');
      return adicionarItem();
    }
    console.log('Escolha a prioridade: (1) Alta, (2) Média, (3) Baixa');
    rl.question('> ', (prio) => {
      let prioridade;
      switch(prio) {
        case '1':
          prioridade = 'alta';
          break;
        case '2':
          prioridade = 'média';
          break;
        case '3':
          prioridade = 'baixa';
          break;
        default:
          console.log('Prioridade inválida.');
          return adicionarItem();
      }
       lista.push({ nome, prioridade });
      console.log('Item adicionado!');
      menu();
    });
  });
}
function removerItem() {
  if (lista.length === 0) {
    console.log('A lista está vazia.');
    return menu();
  }
  mostrarLista(() => {
    rl.question('Digite o número do item para remover: ', (num) => {
      let index = parseInt(num) - 1;
      if (isNaN(index) || index < 0 || index >= lista.length) {
        console.log('Número inválido.');
        return removerItem();
      }
      lista.splice(index, 1);
      console.log('Item removido!');
      menu();
    });
  });
}

function mostrarLista(callback) {
  if (lista.length === 0) {
    console.log('A lista está vazia.');
  } else {
    console.log('\nLista de Compras:');

    const prioridades = { alta: 1, 'média': 2, baixa: 3 };
    lista.sort((a, b) => prioridades[a.prioridade] - prioridades[b.prioridade]);

    lista.forEach((item, i) => {
      console.log(`${i + 1} - ${item.nome} (prioridade: ${item.prioridade})`);
    });
  }
  if (callback) callback();
  else menu();
}
menu();