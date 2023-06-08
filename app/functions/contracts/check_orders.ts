import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import Cookies from "js-cookie";
import initializeBlockchain from "~/functions/contracts/initialize_blockchain";


export const check_orders = async () => {
    const config = await initializeBlockchain();
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);

    return await deliveryContract.methods.getReceiverOrders(wallet).call();
    }

export const checkSenderOrders = async () => {
    const config = await initializeBlockchain();
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);

    return await deliveryContract.methods.getSenderOrders(wallet).call();
}