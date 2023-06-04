import {Link} from "@remix-run/react";
export default function CreateOrderForm() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </head>
            <body>
                <div className="grid min-h-screen place-items-center">
                    <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                        <h1 className="text-xl font-semibold">Create your order</h1>
                        <form className="mt-6">
                            <label htmlFor="sender-adress"
                                   className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Sender Address</label>
                            <input id="sender-adress" type="sender-adress" name="sender-address"
                                   className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                   required/>
                            <p className="text-xs mb-5">Ex:1600 Broadway, New York, NY</p>
                            <label htmlFor="receiver-adress"
                                   className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Receiver Address</label>
                            <input id="receiver-address" type="receiver-address" name="receiver-address"
                                   className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                                   required/>
                            <p className="text-xs">Ex: 1600 Amphitheatre Parkway, Mountain View, CA</p>
                            <button type="submit"
                                    className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                Create
                            </button>
                            <button type="submit"
                                    className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                                <Link to="/tracking_page">Cancel</Link>
                            </button>
                        </form>
                    </div>
                </div>
            </body>
        </html>
    );
}