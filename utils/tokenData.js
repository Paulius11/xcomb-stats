import Web3 from "web3";
import ERC20ABI from "./abi/api-erc20.js";
// import ERC20ABI from './abi/api-moonDoge.js';

const tokenData = async (token = "") => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org:443")
  );
  if (!token) {
    var customToken = new web3.eth.Contract(
      ERC20ABI,
      "0x3a2646fed69112698d3e8a9ab43ae23974e01a26"
    ); // dogeMoon
  } else {
    var customToken = new web3.eth.Contract(ERC20ABI, token); // dogeMoon
  }
  console.log(`token`, token);
  // var customToken = new web3.eth.Contract(ERC20ABI, '0xacfc95585d80ab62f67a14c566c1b7a49fe91167'); // fegtoken

  // const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.xdaichain.com'));
  // const customToken = new web3.eth.Contract(ERC20ABI, '0x3a97704a1b25F08aa230ae53B352e2e72ef52843'); // agave

  // locked liquidity address
  // 0xaf56e77806746da58abdf65b2b87b170a863a37a

  // added liquidity
  //https://bscscan.com/token/0xc6dba3b20e34fd32eea83d947d7b79067c9ba9df?a=0xaf56e77806746da58abdf65b2b87b170a863a37a

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



    var totalFeesFixed;
    try {
        totalFeesFixed = (await customToken.methods.totalFees().call()) / Math.pow(10, decimals);
    } catch (error) {
        console.log(`totalFeesFixed`, totalFeesFixed)
    }
    


  var getTaxFee;
  try {
    getTaxFee = await customToken.methods._taxFee().call();
  } catch (error) {
      console.log(`getTax`, getTaxFee)
  }

  var liquidityFee;
  try {
    liquidityFee = await customToken.methods._liquidityFee().call();
  } catch (error) {
      console.log(`getLiquidityFee`, liquidityFee)
      console.log(error)
  }

  // const foreignBalanceBN = new BN(totalSupply)

  // console.log(`name`, name)
  // console.log(`symbol`, symbol)
  // console.log(`decimals`, decimals)
  // console.log(`totalSupply`, totalSupply)
  // console.log(`foreignBalanceBN`, foreignBalanceBN)
  // console.log(`totalSupplyFixed`, totalSupplyFixed)
  // console.log(`totalFeesFixed`, totalFeesFixed)
  // console.log(`percentageFees`, percentageFees)

  // console.log(deadAddressTokens)

  return {
    name: name,
    symbol: symbol,
    decimals: decimals,
    totalSupply: totalSupplyFixed,
    totalFees: totalFeesFixed,
    balanceOfDeadAddress: balanceOfDeadAddress,
    taxFee: getTaxFee,
    liqFee: liquidityFee
  };
};
// const data = await tokenData();
// console.log(data)

export default tokenData;
