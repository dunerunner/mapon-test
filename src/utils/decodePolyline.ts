export const decodePolyline = (encoded: string): { lat: number; lng: number }[] => {
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;
    const coordinates: { lat: number; lng: number }[] = [];

    while (index < len) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const deltaLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        const deltaLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;

        coordinates.push({
            lat: lat / 1e5,
            lng: lng / 1e5,
        });
    }

    return coordinates;
};
