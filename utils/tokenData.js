import Web3 from 'web3';
import ERC20ABI from './abi/api-erc20.js';
// import ERC20ABI from './abi/api-moonDoge.js';
import BN from 'bignumber.js'


const tokenData = async () =>  {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed1.binance.org:443'));
    const customToken = new web3.eth.Contract(ERC20ABI, '0x3a2646fed69112698d3e8a9ab43ae23974e01a26'); // moondoge
    
    // const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.xdaichain.com'));
    // const customToken = new web3.eth.Contract(ERC20ABI, '0x3a97704a1b25F08aa230ae53B352e2e72ef52843'); // agave


    // run only standalone
    const name = await customToken.methods.name().call();
    const symbol = await customToken.methods.symbol().call();
    const decimals = await customToken.methods.decimals().call();
    const totalSupply = await customToken.methods.totalSupply().call() ;
    const totalSupplyFixed = await customToken.methods.totalSupply().call() / Math.pow(10, decimals);
    const totalFeesFixed = await customToken.methods.totalFees().call() / Math.pow(10, decimals);
    const percentageFees = totalFeesFixed * 100 / totalSupplyFixed

    // const foreignBalanceBN = new BN(totalSupply)

    // console.log(`name`, name)
    // console.log(`symbol`, symbol)
    // console.log(`decimals`, decimals)
    // console.log(`totalSupply`, totalSupply)
    // console.log(`foreignBalanceBN`, foreignBalanceBN)
    // console.log(`totalSupplyFixed`, totalSupplyFixed)
    // console.log(`totalFeesFixed`, totalFeesFixed)
    console.log(`percentageFees`, percentageFees)
    


    return {name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupplyFixed, totalFees: totalFeesFixed, percentageFees: percentageFees}
    // return {name: name, symbol: symbol, decimals: decimals, totalSupply: totalSupplyFixed}

}
// const data = await tokenData();
// console.log(data)

export default tokenData;





