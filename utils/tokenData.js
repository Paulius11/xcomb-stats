import Web3 from "web3";
import ERC20ABI from "./abi/api-erc20.js";
// import ERC20ABI from './abi/api-moonDoge.js';

const tokenData = async (token = "") => {
  const web3 = new Web3(
    // new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443")
    new Web3.providers.HttpProvider("https://rpc.xdaichain.com")
  );
  if (!token) {
    var customToken = new web3.eth.Contract(
      ERC20ABI,
      "0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7"
    ); // xcomb contract address
  } else {
    var customToken = new web3.eth.Contract(ERC20ABI, token); 
  }
  console.log(`token`, token);

  // run only standalone
  const name = await customToken.methods.name().call();
  const symbol = await customToken.methods.symbol().call();
  const decimals = await customToken.methods.decimals().call();
  const totalSupplyFixed =
    (await customToken.methods.totalSupply().call()) / Math.pow(10, decimals);
    

  const balanceOfDeadAddress =
    (await customToken.methods
      .balanceOf("0x000000000000000000000000000000000000dEaD")
      .call()) / Math.pow(10, decimals);




  return {
    name: name,
    symbol: symbol,
    decimals: decimals,
    totalSupply: totalSupplyFixed,
    balanceOfDeadAddress: balanceOfDeadAddress,
  };
};
// const data = await tokenData();
// console.log(data)
// comment in production
export default tokenData;
