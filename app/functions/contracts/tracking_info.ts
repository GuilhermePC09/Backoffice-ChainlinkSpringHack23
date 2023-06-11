import initializeBlockchain from "~/functions/contracts/initialize_blockchain";
import Contract from "web3-eth-contract";
import Cookies from "js-cookie";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";
import order from "~/contracts/order.json";
import {AbiItem} from "web3-utils";
import {Path} from "~/routes/components/Map";

function convertUnixTimestampToString(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${month}/${day}/${year}`;
}

export default async function trackingInfo(orderAddress:string | undefined): Promise<TrackingInfoDto> {
    const config = await initializeBlockchain();
    const orderABI = order as AbiItem[];
    const wallet = Cookies.get("walletHash");
    let orderContract = new Contract(orderABI, orderAddress);

    const sender = await orderContract.methods.sender().call();
    const expectedDate = await orderContract.methods.expectedTimeOfArrival().call();
    const senderLocation = await orderContract.methods.sourceLocation().call();
    const receiverLocation = await orderContract.methods.destinationLocation().call();


    const senderString = sender.toString();
    const dateString = convertUnixTimestampToString(expectedDate);
    const srcLat = senderLocation.latitude / 1000000;
    const srcLng = senderLocation.longitude / 1000000;
    const destLat = receiverLocation.latitude  / 1000000;
    const destLng = receiverLocation.longitude / 1000000;

    const convertedSourceLocation: Path  = {
        lat: srcLat,
        lng: srcLng,
    }
    const convertedDestinationLocation: Path  = {
        lat: destLat,
        lng: destLng,
    }

    console.log(convertedSourceLocation)
    console.log(convertedDestinationLocation)

    return {
        sender: senderString,
        expectedDeliveryDate: dateString,
        senderLocation: convertedSourceLocation,
        receiverLocation: convertedDestinationLocation,
    };
}
