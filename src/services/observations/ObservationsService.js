import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

class ObservationsService {

    async getAllObservationsByUserId(userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/observations-ms/observations/user?id=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            return response.data;
        } catch (error) {
            console.error('Error al consultar observaciones:', error);
            throw error;
        }
    }
}

export default ObservationsService;
