import { Path } from "~/routes/components/Map";

export default interface TrackingInfoDto {
    sender: string,
    expectedDeliveryDate: string,
    senderLocation?: Path,
    receiverLocation?: Path,
}

