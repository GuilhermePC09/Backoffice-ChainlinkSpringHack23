export default interface TrackingInfoDto {
    sender: string,
    expectedDeliveryDate: string,
    senderLocation: Position,
    receiverLocation: Position,
}

export type Position ={
    lat: number,
    lng: number
};