import Web3 from 'web3';
// require('dotenv').config()
// require('dotenv').config({path: __dirname + '/.env'})



const network = "https://ropsten.infura.io/v3/7d99268b0de24027959f8d2e4bcc148e"
// const network = process.env.NETWORK_ROBSTEN
let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    console.log("We are in browsed guys and metamask is running")
    web3 = new Web3(globalThis.web3.currentProvider);
} else {
    // we are on the server or user not running metamask
    console.log("We are in server guys")
    const provider = new Web3.providers.HttpProvider(network);
    web3 = new Web3(provider);
}

export default web3;