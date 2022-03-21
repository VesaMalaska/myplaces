import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

Geocode.setRegion("fi");

Geocode.setLocationType("ROOFTOP");

export const getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
        (response) => {
            const address = response.results[0].formatted_address;
            console.log(address);
            return address;
        },
        (error) => {
            console.error(error);
        }
    );
}