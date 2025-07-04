const socket=io();

const map=L.map("map").setView([27.552990,76.634573],15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "&copy; openStreetMap || Purushottam Gurjar"
}).addTo(map);

let marker;
socket.on("fetch-all-locations",(data)=>{
    const {latitude,longitude}=data;
    map.setView([latitude,longitude],15);

    if(marker){
        marker.setLatLng([latitude,longitude]);
    }
    else{
        marker=L.marker([latitude,longitude],{
            title:"user location",
        }).addTo(map).bindPopup("user is here").openPopup();
    }
})

