const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const abiPath = path.resolve(__dirname,'bin/contracts','Ballot.abi');
const bytePath = path.resolve(__dirname,'bin/contracts','Ballot.bin');
const interface = fs.readFileSync(abiPath,'utf8');
const bytecode = fs.readFileSync(bytePath,'utf8');

const provider = new HDWalletProvider(
    'thrive day milk layer spin reward check learn vacant galaxy night alert',
    'https://rinkeby.infura.io/v3/13322d87cfd54c9a880aad0ff59a507c'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Go to deploy in ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: '0x' + bytecode})
    .send({from: accounts[0]});
    console.log('deployed',result.options.address);
    console.log(interface);
    process.exit(); // la onsola se queda pegada
};
deploy();