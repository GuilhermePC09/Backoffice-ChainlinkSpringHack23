import Cookies from "js-cookie";
import TrackMap from "~/routes/components/map";
import {checkContracts} from "~/functions/checkContracts";
export default function TrackingPage() {
    async function testContract() {
        const hash = await checkContracts();

    }

    const cookieValue = Cookies.get("walletHash");
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body>
        <section className="text-gray-600 body-font relative">
            <div className="fixed inset-0 bg-gray-300">
                <TrackMap />
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div
                    className="lg:w-1/3 md:w-1/2 bg-gray-900 text-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">

                    <h2 className="text-gray-900 text-white mb-1 font-medium title-font">Wallet</h2>
                    <p className="leading-relaxed mb-5 text-white text-xs">{cookieValue}</p>


                    <p className="leading-relaxed mb-1 text-white text-sm">Select one order:</p>
                    <select className="rounded-t-md rounded-b-md rounded-l-md rounded-r-md border-4 mb-5">
                        <option value="order1">Order 1</option>
                    </select>
                    <button
                        onClick={testContract}
                        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white">
                        Register receipt of delivery
                    </button>
                </div>
            </div>
        </section>
        </body>
        </html>
    );
}