import initializeBlockchain from "~/functions/contracts/initialize_blockchain";
import Cookies from "js-cookie";
import Contract from "web3-eth-contract";

export const confirmOrderDelivery = async (orderAddress:string) => {
    const config = await initializeBlockchain();
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    // const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);

    console.log(config.deliveryAddress)
    console.log(orderAddress)
    return await deliveryContract.methods.confirmOrderReceipt(orderAddress).call();
}