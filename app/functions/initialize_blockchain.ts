import Web3 from "web3";
import Contract from "web3-eth-contract";
import delivery from "~/contracts/delivery.json";
import {AbiItem} from "web3-utils";
import BlockChainConfigDto from "~/functions/dtos/blockChainConfig.dto";

export default async function initializeBlockchain(): Promise<BlockChainConfigDto>{
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);
    // connect to the library contract

    const deliveryABI = delivery as AbiItem[];
    const deliveryAddress = "0xcCc9435162B8244e25be757B38D718aeC4d3C570"

    const response: BlockChainConfigDto = {
        web3Provider,
        web3,
        deliveryABI,
        deliveryAddress,
    };

    return response;

}