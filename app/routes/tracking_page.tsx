import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TrackMap from "~/routes/components/Map";
import { checkContracts } from "~/functions/checkContracts";
import { Link, useLocation } from "@remix-run/react";

export default function TrackingPage() {
    const { pathname } = useLocation();

    const [cookieValue, setCookieValue] = useState(Cookies.get("walletHash"));

    useEffect(() => {
        setCookieValue(Cookies.get("walletHash"));
    }, [pathname]);

    if (!cookieValue && pathname !== "/auth") {
        return (
            <html>
            <head>
                <meta content="0; url=/auth" />
            </head>
            </html>
        );
    }

    async function testContract() {
        const hash = await checkContracts();
    }

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
                <div className="lg:w-1/3 md:w-1/2 bg-gray-900 text-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-white mb-1 font-medium title-font">
                        Wallet
                    </h2>
                    <p className="leading-relaxed mb-5 text-white text-xs">
                        {cookieValue}
                    </p>
                    <p className="leading-relaxed mb-1 text-white text-m">
                        Select one order:
                    </p>
                    <select className="rounded-t-md rounded-b-md rounded-l-md rounded-r-md border-4 mb-5">
                        <option value="order1">Order 1</option>
                    </select>
                    <p className="leading-relaxed mb-1 text-white text-sm">Sender:</p>
                    <p className="leading-relaxed mb-5 text-white text-sm">
                        Expected Arrival:
                    </p>
                    <button
                        onClick={testContract}
                        className="mb-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white"
                    >
                        Confirm delivery
                    </button>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white">
                        <Link to="/create_order_form"> Create order </Link>
                    </button>
                </div>
            </div>
        </section>
        </body>
        </html>
    );
}
