export interface CreateIotOrderDto {
    id: string;
    senderWallet: string | undefined;
    receiverWallet: string;
    senderAddress: string;
    senderAddrLat: number;
    senderAddrLng: number;
    receiverAddress: string;
    expectedTime: Date;
    receiverAddrLat: number,
    receiverAddrLng: number
}