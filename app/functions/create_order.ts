import initializeBlockchain from "~/functions/initialize_blockchain";
import Cookies from "js-cookie";
import Contract from "web3-eth-contract";

export default async function createOrder() {
    const config = await initializeBlockchain();
    const wallet = Cookies.get("walletHash");

    let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);
}