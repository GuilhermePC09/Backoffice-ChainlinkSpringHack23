import axios from 'axios';
export default async function getLatLng(address: string) {
    const apiKey = 'AIzaSyDM9y8YCKfW_v0j0iBvPHe9bOyZFtkB1DU';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        console.log(address)
        const response = await axios.get(apiUrl);
        console.log(response);
        const { results } = response.data;
        if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error('no results found.');
        }
    } catch (error) {
        throw new Error('Error when converting address into latitude and longitude.');
    }
}

