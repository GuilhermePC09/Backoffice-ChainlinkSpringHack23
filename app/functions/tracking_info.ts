import initializeBlockchain from "~/functions/initialize_blockchain";
import Contract from "web3-eth-contract";
import Cookies from "js-cookie";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";

function convertUnixTimestampToString(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${month}/${day}/${year}`;
}

export default async function trackingInfo(): Promise<TrackingInfoDto> {
    const config = await initializeBlockchain();
    const wallet = Cookies.get("walletHash");
    let orderContract = new Contract(config.orderABI, config.orderAddress);

    let sender = await orderContract.methods.sender().call();
    let expectedDate = await orderContract.methods.expectedTimeOfArrival().call();

    const senderString = sender.toString();
    const dateString = convertUnixTimestampToString(expectedDate);

    return {
        sender: senderString,
        expectedDeliveryDate: dateString
    };
}
