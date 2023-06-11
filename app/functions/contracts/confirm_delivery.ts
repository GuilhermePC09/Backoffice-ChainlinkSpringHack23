import Cookies from "js-cookie";
import Contract from "web3-eth-contract";
import initializeBlockchain from "~/functions/contracts/initialize_blockchain";

export const confirmOrderDelivery = async (orderAddress: string) => {
    try {
        const config = await initializeBlockchain();
        const wallet = Cookies.get("walletHash");
        let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);
        console.log(config.deliveryAddress)
        console.log(orderAddress)
        return await deliveryContract.methods.confirmOrderReceipt(orderAddress).send({ from: wallet });
    } catch (err: any) {
        console.log(err);
        alert(err.message);
    }
}