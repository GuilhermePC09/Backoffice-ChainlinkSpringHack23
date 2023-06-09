import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import Cookies from "js-cookie";
import { useState } from "react";
import { authentication } from "~/functions/contracts/auth";

export const meta: V2_MetaFunction = () => [{ title: "shipchain • Track and automate deliveries all around the world", description: "Automate the shipping process of delivering any kind of package in the real world. The smart contract gathers location data from IoT devices and stores it in the blockchain." }];

export default function Auth() {
    const [authenticated, setAuthenticated] = useState(false);

    async function authenticate() {
        if (authenticated) {
            // Redirect to tracking_page:
            window.location.href = "/tracking_page";
            return;
        }

        const hash = await authentication();

        const expiresMinutes = 60; // minutes

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expiresMinutes * 60 * 1000);

        Cookies.set("walletHash", hash, { expires: expirationDate });
        setAuthenticated(true)
    }

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </head>
            <body>
                <main
                    className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
                >
                    <section className="flex w-[30rem] flex-col space-y-10">
                        <img src="/shipchain.png" alt="Shipchain logo" className="mx-auto" />
                        <div className="text-center text-4xl font-medium">Shipchain</div>
                        <button onClick={authenticate} className="transform rounded-sm bg-indigo-500 py-2 duration-300 hover:bg-indigo-600">
                            <span className="relative text-white">
                                {authenticated ? "Go to your orders" : "Connect Wallet"}
                            </span>
                        </button>
                    </section>
                </main>
            </body>
        </html>
    );
}
