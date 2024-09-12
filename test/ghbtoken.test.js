const GHBToken = artifacts.require("GHBToken");

contract ('GHBToken', ([owner, person1, person2, person3, person4]) => {

    const NAME = 'GHBToken';
    const SYMBOL = 'GHBT';
    const TOTAL_SUPLY = '1000000000000000000000000';
    var contractInstance;

    beforeEach(async function(){
        contractInstance = await GHBToken.new();
    });
    
    describe("Validação GHBToken:", async () => {

        //Testa se o total supply foi de fato definido em 1 milhão de unidades
        it('Total Supply = 1 000 000 (GHBT)', async function() {
            let supply = (await contractInstance.totalSupply());
            assert.equal(supply.toString(), TOTAL_SUPLY)
        });

        //Testa se o nome do contrato foi definido como "GHBToken"
        it('Nome = GHBToken', async function() {
            assert.equal((await contractInstance.name()), NAME);
        });

        //Testa se o símbolo do contrato foi definido como "GHBT"
        it('Símbolo = GHBT', async function() {
            assert.equal((await contractInstance.symbol()), SYMBOL);
        });

        /*  
            Testa se o dono do contrato recebeu todos os tokens após o deploy e 
            se as demais carteiras estão sem saldo
        */
        it('saldo(Dono do contrato) = 1 000 000 (GHBT)', async function() {
            assert.equal((await contractInstance.balanceOf(owner)), TOTAL_SUPLY);

        });

        //testa a função de transferência
        it('Teste do método transfer (1)', async function() {

            //realiza a transferência propriamente dita
            await contractInstance.transfer(person1, 500000, {from: owner});

            /*
                Verifica o saldo das carteiras participantes da transação garantindo que o 
                receberdor teve seu saldo acrescido em 500000 e o pagador teve sua conta 
                decrescida nesse valor, que se trata da quantia transferida
            */
            assert.equal((await contractInstance.balanceOf(owner)), TOTAL_SUPLY-500000);
            assert.equal((await contractInstance.balanceOf(person1)), 500000);
        });

        //testa a função de transferência
        it('Teste do método transfer (2)', async function() {

            //realiza a transferência propriamente dita
            await contractInstance.transfer(person1, 500000, {from: owner});
            await contractInstance.transfer(person2, 250000, {from: person1});
            await contractInstance.transfer(person2, 500000, {from: owner});

            //verifica o saldo final das contas para verifiacr se estão corretos
            assert.equal((await contractInstance.balanceOf(owner)), TOTAL_SUPLY-1000000);
            assert.equal((await contractInstance.balanceOf(person1)), 250000);
            assert.equal((await contractInstance.balanceOf(person2)), 750000);
        });
        
        //Testa os métodos approve, allowance e transferFrom do contrato
        it('Teste do método transferFrom (1)', async function() {

            //emite uma aprovação para que "person2" retire uma quantia de tokens de "owner"
            await contractInstance.approve(person2, 500000, {from: owner});

            //verifica se a quantidade permissionada está correta(o método allowance retorna o valor permissionado)
            assert.equal((await contractInstance.allowance(owner, person2)), 500000);

            //realiza a transferência
            await contractInstance.transferFrom(owner, 500000, {from: person2});

            //verifica se os saldos foram devidamente atualizados
            assert.equal((await contractInstance.balanceOf(owner)), TOTAL_SUPLY-500000);
            assert.equal((await contractInstance.balanceOf(person2)), 500000);

        });

        //Testa os métodos approve, allowance e transferFrom do contrato
        it('Teste do método transferFrom (2)', async function() {

            //emite uma aprovação para que "person2" retire uma quantia de tokens de "owner"
            await contractInstance.approve(person3, 500000, {from: owner});
            await contractInstance.approve(person4, 500000, {from: owner});

            //verifica se a quantidade permissionada está correta(o método allowance retorna o valor permissionado)
            assert.equal((await contractInstance.allowance(owner, person3)), 500000);
            assert.equal((await contractInstance.allowance(owner, person4)), 500000);

            //realiza a transferência
            await contractInstance.transferFrom(owner, 500000, {from: person3});
            await contractInstance.approve(person4, 250000, {from: person3});
            assert.equal((await contractInstance.allowance(person3, person4)), 250000);
            await contractInstance.transferFrom(person3, 250000, {from: person4});
            await contractInstance.transferFrom(owner, 500000, {from: person4});

            //verifica se os saldos foram devidamente atualizados
            assert.equal((await contractInstance.balanceOf(owner)), TOTAL_SUPLY-1000000);
            assert.equal((await contractInstance.balanceOf(person3)), 250000);
            assert.equal((await contractInstance.balanceOf(person4)), 750000);

        });

    });

});