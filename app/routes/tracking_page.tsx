import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TrackMap, {Path} from "~/routes/components/Map";
import { Link, useLocation } from "@remix-run/react";
import trackingInfo from "~/functions/contracts/tracking_info";
import TrackingInfoDto from "~/functions/dtos/trackingInfoDto";
import {MyContextProvider} from "~/routes/context/context_provider";
import {check_orders, checkSenderOrders} from "~/functions/contracts/check_orders";
import {confirmOrderDelivery} from "~/functions/contracts/confirm_delivery";
import {getLocations} from "~/functions/Iot_client/iotClient";

export default function TrackingPage() {
    const [trackingInfoDto, setTrackingInfoDto] = useState<TrackingInfoDto>({
        sender: "",
        expectedDeliveryDate: "",
    });
    const [showInfo, setShowInfo] = useState(false);
    const { pathname } = useLocation();
    const [path, setPath] = useState<Path[]>([]);
    const [receiverOrderList, setReceiverOrderList] = useState<any>([]);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [senderOrderList, setSenderOrderList] = useState<any>([]);

    const [cookieValue, setCookieValue] = useState(Cookies.get("walletHash"));

    useEffect(() => {
        const fetchData = async () => {
            const receiverOrders = await check_orders();
            setReceiverOrderList(receiverOrders);

            const senderOrders = await checkSenderOrders();
            setSenderOrderList(senderOrders);
        };

        fetchData();
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

    async function orderPath() {
        const pathIot:any = await getLocations(selectedOrder)
        console.log(pathIot)
        const info = await trackingInfo(selectedOrder);
        setPath(pathIot)
        setTrackingInfoDto(info);
        setShowInfo(true);
    }

    async function confirmDelivery() {
        const confirmation = await confirmOrderDelivery(selectedOrder);
        console.log(confirmation)
    }

    // @ts-ignore
    function handleOrderChange(event) {
        const selectedValue = event.target.value;
        console.log(selectedValue)
        setSelectedOrder(selectedValue);
    }

    // @ts-ignore
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
        </head>
        <body>
        <section className="text-gray-600 body-font relative">
            <div className="fixed inset-0 bg-gray-300">
                <MyContextProvider value={path}>
                    <TrackMap />
                </MyContextProvider>
            </div>
            <div className="container px-5 py-24 mx-auto flex">
                <div className="lg:w-1/3 md:w-1/2 bg-gray-900 text-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-white mb-1 font-medium title-font">
                        Wallet
                    </h2>
                    <p className="leading-relaxed mb-5 text-white text-sm">
                        {cookieValue}
                    </p>
                    <select
                        onChange={handleOrderChange}
                        className="rounded-t-md rounded-b-md rounded-l-md rounded-r-md border-4 mb-2 w-100 text-black">
                        <option value="">Select one Receiving Order</option>
                        { // @ts-ignore
                            receiverOrderList.map((order, index) => (
                            <option key={index} value={order}>
                                {order}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleOrderChange}
                        className="rounded-t-md rounded-b-md rounded-l-md rounded-r-md border-4 mb-2 w-100 text-black">
                        <option value="">Select one Sent Order</option>
                        { // @ts-ignore
                            senderOrderList.map((order, index) => (
                            <option key={index} value={order}>
                                {order}
                            </option>
                        ))}
                    </select>
                    {showInfo ? (
                        <>
                            <p className="leading-relaxed mb-1 text-white text-sm">
                                Sender: {trackingInfoDto.sender}
                            </p>
                            <p className="leading-relaxed mb-5 text-white text-sm">
                                Expected Arrival: {trackingInfoDto.expectedDeliveryDate}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="leading-relaxed mb-1 text-white text-sm">
                                Sender: {trackingInfoDto.sender}
                            </p>
                            <p className="leading-relaxed mb-5 text-white text-sm">
                                Expected Arrival: {trackingInfoDto.expectedDeliveryDate}
                            </p>
                        </>
                    )}
                    <button
                        onClick={orderPath}
                        className="mb-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-white"
                    >
                        Show order path
                    </button>
                    <button
                        onClick={confirmDelivery}
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
