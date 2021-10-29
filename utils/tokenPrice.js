import Web3 from "web3";
import PAIR_ABI from "./abi/pair-abi.js";
import ERC20ABI from "./abi/api-erc20.js";


const NETWORK_URL = "https://rpc.xdaichain.com"


const tokenData = async (token = "") => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(NETWORK_URL)
  );
  if (!token) {
    var customToken = new web3.eth.Contract(
      PAIR_ABI,
      "0x9e8E5e4a0900fE4634c02AAf0f130cfB93c53fBc"  // xdai-xcomb pair

    ); 
  } else {
    var customToken = new web3.eth.Contract(ERC20ABI, token); 
  }


  // run only standalone
  const reserves = await customToken.methods.getReserves ().call();
  console.log(reserves);
  return  reserves;
};

// Get token price in xdai 0.8508342338796561 Xdai
const tokenPrice = async () => {
  const {_reserve0, _reserve1} = await tokenData();
    
  var rate = _reserve1/_reserve0
  console.log(`Rate: ${rate} Xdai`)
  return rate
}

// Run standalone
// const price = await tokenPrice();

export default tokenPrice;