import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useLocation } from "@remix-run/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import createOrder from "~/functions/contracts/create_order";

export default function CreateOrderForm() {
    const { pathname } = useLocation();
    const [cookieValue, setCookieValue] = useState(Cookies.get("walletHash"));
    const [creationStatus, setCreationStatus] = useState("")
    const [createdOrderHash, setCreatedOrderHash] = useState("")
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDM9y8YCKfW_v0j0iBvPHe9bOyZFtkB1DU',
        libraries: ['places'],
    });

    if (!cookieValue && pathname !== "/auth") {
        return (
            <html>
                <head>
                    <meta content="0; url=/auth" />
                </head>
            </html>
        );
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const receiverWallet = formData.get("receiver-wallet") as unknown as string;
        const senderAdress = formData.get("sender-address") as unknown as string;
        const receiverAdress = formData.get("receiver-address") as unknown as string;
        const estimatedDeliveryDate = formData.get("estimated-delivery-date") as unknown as any;

        try {
            setCreationStatus("Loading")

            const response = await createOrder(receiverWallet, senderAdress, receiverAdress, estimatedDeliveryDate);
            setCreatedOrderHash(response)
            setCreationStatus("Complete")
        } catch (error: any) {
            setCreationStatus(error.toString)
        }
    }

    function redirectToTrackingPage() {
        window.location.href = "/tracking_page";
    }

    useEffect(() => {
        setCookieValue(Cookies.get("walletHash"));
    }, [pathname]);


    return isLoaded ? (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </head>
            <body>
                <div className="grid min-h-screen place-items-center bg-gray-900">
                    <div className="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12 bg-gray-900">
                        <h1 className="text-xl font-semibold text-white">Create your order</h1>
                        <form className="mt-6 bg-gray-900" onSubmit={handleSubmit}>
                            <label htmlFor="receiver-wallet"
                                className="block mt-2 text-xs font-semibold uppercase text-white">Receiver Wallet</label>
                            <input id="receiver-wallet" type="receiver-wallet" name="receiver-wallet"
                                className="block w-full p-3 mt-2 text-grey-700 bg-gray-200 appearance-none mb-5 focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                required />
                            <label htmlFor="sender-address"
                                className="block mt-2 text-xs font-semibold uppercase text-white">Sender Address</label>
                            <Autocomplete>
                                <input id="sender-adress" type="sender-adress" name="sender-address" autoComplete="off"
                                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    required />
                            </Autocomplete>
                            <p className="text-xs mb-5 text-white">Ex:1600 Broadway, New York, NY</p>
                            <label htmlFor="receiver-adress"
                                className="block mt-2 text-xs font-semibold text-white uppercase">Receiver Address</label>
                            <Autocomplete>
                                <input id="receiver-address" type="receiver-address" name="receiver-address" autoComplete="off"
                                    className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                    required />
                            </Autocomplete>
                            <p className="text-xs mb-5 text-white">Ex: 1600 Amphitheatre Parkway, Mountain View, CA</p>
                            <label htmlFor="estimated-delivery-date"
                                className="block mt-2 text-xs font-semibold text-white uppercase">Estimated Delivery Date</label>
                            <input id="estimated-delivery-date" type="date" name="estimated-delivery-date"
                                className="block w-full p-3 mb-5 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                required />
                            <p className="text-sm mb-2 text-white">Creation Status: {creationStatus}</p>
                            <p className="text-sm mb-5 text-white">Order Address: {createdOrderHash}</p>
                            <button
                                type="submit"
                                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-indigo-500 shadow-lg focus:outline-none hover:bg-indigo-600 hover:shadow-none">
                                Create
                            </button>
                            <button type="button"
                                onClick={redirectToTrackingPage}
                                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-red-500 shadow-lg focus:outline-none hover:bg-red-600 hover:shadow-none">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    ) : (
        <div className="grid min-h-screen place-items-center bg-gray-900">
            <div className="w-11/12 p-12 sm:w-8/12 md:w-1/2 lg:w-5/12 bg-gray-900">
                <h1 className="text-xl font-semibold text-white">Loading...</h1>
            </div>
        </div>
    );
}