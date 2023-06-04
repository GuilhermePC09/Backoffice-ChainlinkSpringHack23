import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ERC20_ABI from '../contracts/ERC20_ABI.json';
import Cookies from "js-cookie";


export const checkContracts = async () => {
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);
    // connect to the library contract

    const deliveryABI = ERC20_ABI as AbiItem[];
    const deliveryAddress = "0xab077Be2c042536bC2379Fc9D903A8EaC87d5969"
    const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(deliveryABI, deliveryAddress);
    const balance = await deliveryContract.methods.balanceOf(wallet).call();
    console.log(balance)
    }