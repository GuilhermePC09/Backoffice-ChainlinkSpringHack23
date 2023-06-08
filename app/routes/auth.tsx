import {authentication} from "~/functions/contracts/auth";
import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import Cookies from "js-cookie";
import {useState} from "react";
import {redirect} from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "stableshop • Buy Gift Cards using BTGUSD", description: "stableshop improves the usability of BTG Dol (a form of digital currency) into a payment product aimed at everyday use. Initially, a prepaid card structure called Gift Card will be developed to be used in digital stores. With this product, customers who wish to use BTG Dol for their purchases will be able to use our prepaid card wallet as a gift card. This solution will provide a convenient and affordable way for users to take advantage of BTG Dol in the context of everyday transactions." }];

// Loaders only run on the server and provide data
// to your component on GET requests
export const loader = async ({ request }: LoaderArgs) => {

    return null;
};

// Actions only run on the server and handle POST
// PUT, PATCH, and DELETE. They can also provide data
// to the component
export async function action({ request }: ActionArgs) {
    return null;
}

// The default export is the component that will be
// rendered when a route matches the URL. This runs
// both on the server and the client

export default function Auth() {
    const [authenticated, setAuthenticated] = useState(false);

    async function authenticate() {
        const hash = await authentication();

        const expiresMinutes = 60; // Duração em minutos

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
                <div className="text-center text-4xl font-medium">Log In</div>

                <button onClick={authenticate} className="transform rounded-sm bg-indigo-500 py-2 duration-300 hover:bg-indigo-600">
                    {authenticated ? (
                        <Link to={`/tracking_page`}>
                              <span className="relative text-white">
                                Go to your orders
                              </span>
                        </Link>
                                ) : (
                                    <span className="relative text-white">
                                        Connect Wallet
                                    </span>
                                )}
                </button>
            </section>
        </main>
        </body>
        </html>
    );
}