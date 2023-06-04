import Cookies from "js-cookie";
import TrackMap from "~/routes/components/map";
export default function TrackingPage() {
    const cookieValue = Cookies.get("walletHash");

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body>
            <TrackMap />
        </body>
        </html>
    );
}