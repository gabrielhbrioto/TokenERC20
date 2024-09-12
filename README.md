# Projeto de Token ERC20

Este projeto é uma implementação de um token ERC20 no Ethereum, seguindo o padrão estabelecido para contratos de tokens. Ele foi desenvolvido usando o framework Truffle e testado com Ganache, fornecendo uma base sólida para desenvolvimento de DApps e outros projetos blockchain.

## Sumário
- [Descrição](#descrição)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Testes](#testes)
- [Conclusão](#conclusão)

## Descrição

Este projeto implementa um token ERC20 chamado GHBToken, que possui as funcionalidades básicas de um token fungível, como transferência de tokens, consulta de saldo, e aprovação de uso por terceiros.

O contrato segue o padrão ERC20 da Ethereum e pode ser facilmente implantado em redes de teste ou na mainnet. Como forma de demonstrar isso foi realizada um deploy na rede na testnet Sepolia. Além disso, o projeto conta com um script de testes simples que é responsável por validar o contrato e testar cada uma das suas funções. 

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:
   ```bash
   npm install --save-dev
   ```

4. Se necessário, instale o Truffle globalmente:
    ```bash
   npm install -g truffle
   ```

## Configuração

Antes de usar o projeto, certifique-se de ter configurado as redes Ethereum que você planeja usar. No arquivo `truffle-config.js`, já estão configuradas as redes `development`, referente à rede de testes local ganache e `sepolia`, uma testnet pública. Porém, seguindo as intruções do site oficial do projeto [Truffle](https://archive.trufflesuite.com/docs/truffle/reference/configuration/), você pode configurar as redes que desejar.

Exemplo de configuração para a rede de desenvolvimento local (usando Ganache):

```javascript
    module.exports = {
      networks: {
        development: {
          host: "127.0.0.1",
          port: 8545,
          network_id: "*", // Qualquer ID de rede
        },
      },
      compilers: {
        solc: {
          version: "0.8.17", // Versão do Solidity
        }
      }
    };

```

## Uso

Antes de implantar o contrato, você deve compilá-lo:

```bash
    truffle compile
```

Para realizar a implantação do contrato deve-se utilizar o comando:

```bash
    truffle migrate --network rede
```

Sendo o parâmetro `rede` o nome da rede na qual se deseja realizar a implantação, a qual deve ser uma das redes presentes no arquivo `truffle-config.js`.

## Testes

Para testar o contrato é necessário utilizar precisa da rede de desenvolvimento (ganache). Assim o comando para executar a versão de linha de comando da ganache é:

```bash
    ganache-cli -a 5 -p 7545
```

A opção `-a` determina a quantidade de contas que devem ser criadas ao inicializar a rede, o valor padrão é de 10 contas, porém a escolha de iniciar a rede com apenas 5 contas foi feita com base no número de contas utilizadas no script de testes. Já a flag `-p` indica a porta que deve ser utilizada para a a comunicação com a ganache, que por padrão é a 8545. Neste caso, como no arquivo de configuração a porta foi definida como 7545 ao executar o ganache devemos especificar a porta, porém alterar o arquivo de configuração também é uma opção válida. 

Com a rede ganache rodando, basta executar o script de teste com o seguinte comando:

```bash
    truffle test
```

A saída produzida deve ser algo como:

Using network 'development'.


> Compiling your contracts...
>
> ===========================
>
> \> Compiling ./contracts/GHBToken.sol <br>
> \> Compiling ./contracts/erc20.sol<br>
> \> Artifacts written to /tmp/test--42174-if00DUUau30s<br>
> \> Compiled successfully using:<br>
>    \- solc: 0.8.17+commit.8df45f5f.Emscripten.clang
> 
> 
>   Contract: GHBToken
>
>     Validação GHBToken:
>       ✔ Total Supply = 1 000 000 (GHBT) (80ms)
>       ✔ Nome = GHBToken (63ms)
>       ✔ Símbolo = GHBT (58ms)
>       ✔ saldo(Dono do contrato) = 1 000 000 (GHBT) (65ms)
>       ✔ Teste do método transfer (1) (356ms)
>       ✔ Teste do método transfer (2) (712ms)
>       ✔ Teste do método transferFrom (1) (565ms)
>       ✔ Teste do método transferFrom (2) (1187ms)
> 
> 
>   8 passing (5s)

## Conclusão

Para ilustrar melhor o uso do contrato foi realizado um deploy do contrato na rede de testes pública Sepolia. A transação de criação do contrato pode ser visualizada através de um explorador de blocos [aqui](https://sepolia.etherscan.io/tx/0xc449c4d973f0ee69e62dd7232a3b734e06c2c52467915e6b9ce9b12907a0afe3). Também foram realizadas algumas transações entre os contratos para endossar o exemplo.