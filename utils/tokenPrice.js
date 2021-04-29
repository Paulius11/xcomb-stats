import Web3 from "web3";
import ROUTER_ABI from "./abi/api-bscRouter.js";
import PAIR_ABI from "./abi/api-bscPair.js";


const ROUTER_ADDRESS = "0xbcfccbde45ce874adcb698cc183debcf17952812" // bsc router address

const TOKEN_ADDRESS = "0x3A2646FeD69112698D3e8A9aB43AE23974E01a26" // example for local runs
const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" 
const NETWORK_BSC = "https://bsc-dataseed1.binance.org:443"




// Get token pair address
const tokenData = async (token_address) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(NETWORK_BSC)
  );
    var customToken = new web3.eth.Contract(
      ROUTER_ABI,
      ROUTER_ADDRESS
    );


  const pair = await customToken.methods.getPair(token_address, WBNB_ADDRESS).call();
  return pair
}

// Get address reserve data
const tokenPairData = async (pairAddress) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(NETWORK_BSC)
  );
    var customToken = new web3.eth.Contract(
      PAIR_ABI,
      pairAddress
    );


  const reserves = await customToken.methods.getReserves().call();
  return reserves
}

// wrapper function
// get address from factory and quiry reserve
const getReserveData = async (tokenAddress) => {
  const pairAddress = await tokenData(tokenAddress);
  console.log(pairAddress);
  const reserve = await tokenPairData(pairAddress);
  return reserve
}

// const pairData = await getReserveData(TOKEN_ADDRESS);
// console.log(`pairAddress`, pairData)

export default getReserveData;