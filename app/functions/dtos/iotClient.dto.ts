export interface CreateIotOrderDto {
    id: string;
    senderWallet: string | undefined;
    receiverWallet: string;
    senderAddress: string;
    receiverAddress: string;
    expectedTime: Date;
    receiverAddrLat: number,
    receiverAddrLng: number
}