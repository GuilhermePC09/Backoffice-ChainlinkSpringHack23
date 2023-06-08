import initializeBlockchain from "~/functions/contracts/initialize_blockchain";

export async function authentication(): Promise<string> {
    const config = await initializeBlockchain();

    const accounts: string[] | undefined = await config.web3.eth.requestAccounts();
    if (accounts === undefined) {
        console.log('No accounts found');
        return "";
    }

    let myWallet: string = accounts![0];
    console.log('Wallet found');
    return myWallet;
}