import initializeBlockchain from "~/functions/initialize_blockchain";
import Contract from "web3-eth-contract";
import Cookies from "js-cookie";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";

export default async function trackingInfo(): Promise<TrackingInfoDto> {
    const config = await initializeBlockchain();
    const wallet = Cookies.get("walletHash");
    let orderContract = new Contract(config.orderABI, config.orderAddress);

    let sender = await orderContract.methods.sender().call();
    let expectedDate = await orderContract.methods.expectedTimeOfArrival().call();

    const senderString = sender.toString();
    const expectedDateString = expectedDate.toString();

    return {
        sender: senderString,
        expectedDeliveryDate: expectedDateString
    };
}
