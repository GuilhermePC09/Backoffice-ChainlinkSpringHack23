import Web3 from "web3";
import Contract from 'web3-eth-contract';

export async function authentication(): Promise<string> {
    // 'Web3.givenProvider' will be set if in an Ethereum supported browser.
    const web3Provider = Web3.givenProvider || 'ws://localhost:8546';

    // set provider for all later instances to use
    Contract.setProvider(web3Provider);
    const web3 = new Web3(web3Provider);

    const accounts: string[] | undefined = await web3.eth.requestAccounts();
    if (accounts === undefined) {
        console.log('No accounts found');
        return "";
    }

    let myWallet: string = accounts![0];
    console.log('Wallet found');
    return myWallet;
}