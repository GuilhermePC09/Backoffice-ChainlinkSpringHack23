import initializeBlockchain from "~/functions/initialize_blockchain";
import Contract from "web3-eth-contract";
import Cookies from "js-cookie";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";
import order from "~/contracts/order.json";
import {AbiItem} from "web3-utils";

function convertUnixTimestampToString(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${month}/${day}/${year}`;
}

export default async function trackingInfo(): Promise<TrackingInfoDto> {
    const config = await initializeBlockchain();
    const orderABI = order as AbiItem[];
    const orderAddress = "0x0f3a3Bc2b56AD73EeD6b574bAE99bfeA83606564"
    const wallet = Cookies.get("walletHash");
    let orderContract = new Contract(orderABI, orderAddress);

    let sender = await orderContract.methods.sender().call();
    let expectedDate = await orderContract.methods.expectedTimeOfArrival().call();

    const senderString = sender.toString();
    const dateString = convertUnixTimestampToString(expectedDate);

    return {
        sender: senderString,
        expectedDeliveryDate: dateString
    };
}
