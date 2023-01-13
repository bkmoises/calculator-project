# # Calculator
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/devsuperior/sds1-wmazoni/blob/master/LICENSE)

[Link do projeto](https://bkmoises.github.io/calculator-project/)

## Sobre o Código
Este código é uma implementação básica de uma calculadora, com o visual baseado na famosa calculadora da Apple, usando JavaScript e manipulação de elementos do DOM. Ela utiliza uma estrutura de objetos para encapsular as funções e as propriedades da calculadora.

A função `startCalc` é chamada no início do código e retorna um objeto que contém as propriedades e métodos da calculadora.
A função `start` é chamada no final da função `startCalc` e inicia todos os eventos e funções necessários para a calculadora funcionar.

A função `btn_click` adiciona um evento de clique a página e verifica qual elemento foi clicado. Ele chama funções específicas para cada tipo de botão, como `putNumber`, `putOperator`, `clearDisplay`, `eraseNumber` e `submit`.

A função `listen_btn` adiciona um evento de preionamento de tecla a página e verifica qual tecla foi pressionada. Ele também chama funções específicas para cada tipo de tecla, como `putNumber`, `putOperator`, `clearDisplay` e `eraseNumber`.

A função `submit` é chamada quando o botão de igual é pressionado ou quando a tecla *Enter* é pressionada. Ela avalia a expressão atual na tela e mostra o resultado. Se a expressão não puder ser avaliada, ela mostra a mensagem "*Invalid!*" na tela.

A função `putOperator` é chamada quando um operador é pressionado. Ela verifica se um operador já foi pressionado anteriormente e, se sim, impede que a inclusão de um novo operador à expressão atual. Ele também gerencia o uso de ponto decimal, com o uso de dotStatus.

Outras funções como `btn_check`, `submit_btn`, `clearDisplay_Err`, `enableBtn`, `disableDot` gerencia o estado dos botões e validação do display.

## Teclas de Atalho

`0-9`: Respectivamente, insere os números ao operando.

`+`: Insere o operador de *soma.*

`-`: Insere o operador de *subtração*.

`*`: Insere o operador de *multiplicação*.

`/`: Insere o operador de *divisão*.

`%`: Insere o operador de *porcentagem*.

`Backspace`: Apaga o operando/operador imediatamente a esquerda.

`Esc`: Limpa o display.

## Layout

![calculator-layout](https://github.com/bkmoises/calculator-project/blob/main/assets/img/calculator-project-layout.png)
## Dependências

Navegador Web.
