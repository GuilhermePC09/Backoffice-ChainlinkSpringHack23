import Web3 from "web3";
import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import delivery from "~/contracts/delivery.json";
import BlockChainConfigDto from "~/functions/dtos/blockChainConfig.dto";

const DELIVERY_CONTRACT_ADDRESS = "0x12B50cbD48F814299FcF6782159025427d60E7b8"

export default async function initializeBlockchain(): Promise<BlockChainConfigDto> {
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);
    // connect to the library contract

    const deliveryABI = delivery as AbiItem[];

    // const orderABI = order as AbiItem[];
    // const orderAddress = "0x0f3a3Bc2b56AD73EeD6b574bAE99bfeA83606564"

    return {
        web3Provider,
        web3,
        deliveryABI,
        deliveryAddress: DELIVERY_CONTRACT_ADDRESS,
    };

}