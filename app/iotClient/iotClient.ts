import axios from 'axios';
import { CreateOrderDto } from './iotClient.dto';

const BASE_URL = 'https://ship-track.fly.io'; // Lembrar de colocar isso no .env

// É só importar a classe onde for usar ela e chamar os métodos, lembra de usar await, exemplo:
// iotclient: IoTClient = new IoTClient();
// const locations = await iotclient.getLocations(orderHash);

class IoTClient {

    /**
     * @param orderId -> Hash da ordem, tem que ser formato de string, exemplo: "0x7E27790Fce89c933Cd5efA316d3d68c386cE4D2E"
     * @returns lista no formato {latitude, longitude, createdAt} -> aqui eu envio em ordem crescente, então o locations[0] 
     * foi a primeira posição pega. Foto com mais descrição no grupo.
     * @Observacoes A latitude e longitude não vem como float, vem como um inteiro, eu multiplica ela por 1 milhão pro banco não
     * arredondar. Então se você for inputar na API do google maps, precisa dividir por 1 milhão
     * @Observacoes2 Ainda tem registros no banco que estão no formato de float, se testar agora pode dar problema, mas vou excluir amanhã
     */
    async getLocations(orderId: string) {
        try {
            const locations = await axios.get(`${BASE_URL}/locations/${orderId}`);
            return locations;
        } catch(error: any) {
            return error.message;
        }
    }

    /**
     * 
     * @param createOrderDto Aqui é o DTO do create order, preciso de todos esses dados. Cada ordem vai ter um device ligado, mas essa lógica fica no back
     * por algum motivo que ainda não descobri ela está com bug. Amanhã vou ver melhor
     * @returns Vai te retornar o json do contrato criado, além dos dados que você mesmo envio vou te retornar quando ele foi criado e o deviceId
     * Ou seja, o IoT que vai pegar a localização dessa ordem
     */
    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const orderCreated = await axios.post(`${BASE_URL}/order`, createOrderDto);
            return orderCreated;
        } catch(error: any) {
            return error.message;
        }
    }
}

export default IoTClient;