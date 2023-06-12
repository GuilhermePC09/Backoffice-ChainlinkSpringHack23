import Cookies from "js-cookie";
import Contract from "web3-eth-contract";
import initializeBlockchain from "~/functions/contracts/initialize_blockchain";

export const confirmOrderDelivery = async (orderAddress: string) => {
    try {
        const config = await initializeBlockchain();
        const wallet = Cookies.get("walletHash");
        let orderContract = new Contract(config.orderABI, orderAddress);
        let isDelivered = await orderContract.methods.delivered().call();
        if (isDelivered) {
            let isConfirmed = await orderContract.methods.confirmed().call();
            if (isConfirmed) {
                alert("Order is already confirmed.");
                return false;
            } else {
                let deliveryContract = new Contract(config.deliveryABI, config.deliveryAddress);
                console.log(config.deliveryAddress)
                console.log(orderAddress)
                return await deliveryContract.methods.confirmOrderReceipt(orderAddress).send({ from: wallet });
            }
        } else {
            alert("Order is not delivered yet.");
            return false;
        }
    } catch (err: any) {
        console.log(err);
        alert(err.message);
    }
}