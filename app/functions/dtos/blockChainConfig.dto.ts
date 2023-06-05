import Web3 from "web3";
import {AbiItem} from "web3-utils";

export default interface BlockChainConfigDto {
    web3Provider: any,
    web3: Web3,
    deliveryABI: AbiItem[],
    deliveryAddress: string,
    orderABI: AbiItem[],
    orderAddress: string,
}