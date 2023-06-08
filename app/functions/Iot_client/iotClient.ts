import axios from 'axios';
import {CreateIotOrderDto} from '../dtos/iotClient.dto';
import {Path} from "~/routes/components/Map";

const BASE_URL = 'https://ship-track.fly.io'; // Lembrar de colocar isso no .env

export async  function getLocations(orderId: string) {
    try {
        return await axios.get(`${BASE_URL}/locations/${orderId}`);
    } catch(error: any) {
        return error.message;
    }
}

export async function createIotOrder(createOrderDto: CreateIotOrderDto) {
    try {
        const orderCreated = await axios.post(`${BASE_URL}/order`, createOrderDto);
        return orderCreated;
    } catch(error: any) {
        return error.message;
    }
}


