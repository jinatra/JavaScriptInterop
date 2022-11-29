// 위도
let lat = 0;
export function GetLatitude() {    
    navigator.geolocation.getCurrentPosition((pos) => {
        lat = pos.coords.latitude;
    });
    return lat;
}

// 경도
let lon = 0;
export function GetLongtitude() {
    navigator.geolocation.getCurrentPosition((pos) => {
        lon = pos.coords.longitude;
    });
    return lon;
}