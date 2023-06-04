import Web3 from "web3";
import Contract from "web3-eth-contract";
import ERC20_ABI from "~/contracts/ERC20_ABI.json";
import {AbiItem} from "web3-utils";
import BlockChainConfigDto from "~/functions/dtos/blockChainConfig.dto";

export default async function initializeBlockchain(): Promise<BlockChainConfigDto>{
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);
    // connect to the library contract

    const deliveryABI = ERC20_ABI as AbiItem[];
    const deliveryAddress = "0xab077Be2c042536bC2379Fc9D903A8EaC87d5969"

    const response: BlockChainConfigDto = {
        web3Provider,
        web3,
        deliveryABI,
        deliveryAddress,
    };

    return response;

}