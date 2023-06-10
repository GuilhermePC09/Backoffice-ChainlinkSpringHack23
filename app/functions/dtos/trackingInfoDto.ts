
export default interface TrackingInfoDto {
    sender: string,
    expectedDeliveryDate: string,
    senderLocation: Position,
    receiverLocation: Position,
}

type Position={
    lat: number,
    lng: number
}