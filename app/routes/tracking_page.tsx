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
                    className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Wallet</h2>
                    <p className="leading-relaxed mb-5 text-gray-600 text-sm">{cookieValue}</p>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" name="message"
                                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                    <button
                        onClick={testContract}
                        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button
                    </button>
                </div>
            </div>
        </section>
        </body>
        </html>
    );
}