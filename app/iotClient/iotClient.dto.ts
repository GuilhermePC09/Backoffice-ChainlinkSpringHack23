export interface CreateOrderDto {
    id: string;
    senderWallet: string;
    receiverWallet: string;
    senderAddress: string;
    receiverAddress: string;
    expectedTime: Date;
}