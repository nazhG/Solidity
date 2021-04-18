const assert = require('assert');
const ganache = require('ganache-cli'); // el mismo te crea una cuena sin clave privada para tesiar en la red local
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const abiPath = path.resolve(__dirname,'../bin/contracts','Ballot.abi');
const bytePath = path.resolve(__dirname,'../bin/contracts','Ballot.bin');

const provider = ganache.provider();
const web3 = new Web3(provider);

const interface = fs.readFileSync(abiPath,'utf8');
const bytecode = fs.readFileSync(bytePath,'utf8');

let accounts;
let contract;
beforeEach(async () => {
    //get al list of all accoun
    accounts = await web3.eth.getAccounts();

    // Use one of those accoun to deploy
    contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from: accounts[0], gas: '1000000'});
    contract.setProvider(provider);
});

describe('Ballot', () => {
    it('deploys a contract', () => {
        assert.ok(contract.options.address);
    });
    it('allow enter', async () => {
        let i = 0;
        for(let x of Array(3)) {      
            await contract.methods.enter().send({
                from: accounts[i++],
                value: web3.utils.toWei('0.02', 'ether')
            });
        }
        const players = await contract.methods.getPlayers().call({
            from: accounts[0]
        });
        assert.strictEqual(players[0], accounts[0]);
        assert.strictEqual(players.length, i);
    });
    it('minimun amount', async () => {
        try {
            await contract.methods.enter().send({
                from: accounts[0],
                value: 200
            });
            assert(false);
        } catch (err) {
            assert.ok(err);
        }
    });
    it('Restricted', async () => {
        try {
            await contract.methods.pickWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert.ok(err);
        }
    });
    it('pay to the winner, winner valid', async () => {
        
        await contract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });
        
        const banlanceAfter = await web3.eth.getBalance(accounts[1]);
        
        await contract.methods.pickWinner().send({
            from: accounts[0]
        });
        
        const banlanceBefore = await web3.eth.getBalance(accounts[1]);

        const different = banlanceBefore - banlanceAfter;
        assert(different > web3.utils.toWei('1.8', 'ether'));
    });

});