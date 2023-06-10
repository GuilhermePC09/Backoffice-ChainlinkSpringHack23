import axios from 'axios';
import {CreateIotOrderDto} from '../dtos/iotClient.dto';
import {Path} from "~/routes/components/Map";

const BASE_URL = 'https://ship-track.fly.dev'; // Lembrar de colocar isso no .env

export async  function getLocations(orderId: string | undefined): Promise<Path[] | undefined> {
    try {
        if(orderId === undefined) {
            return
        }

        const response = await axios.get(`${BASE_URL}/locations/${orderId}`);
        const locations: Path[] = response.data

        return locations
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


