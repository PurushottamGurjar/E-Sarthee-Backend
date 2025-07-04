const socket=io();

const map=L.map("map").setView([27.552990,76.634573],15);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "&copy; openStreetMap || Purushottam Gurjar"
}).addTo(map);

const  markers={};
const  updateTimers={};
socket.on("fetch-all-locations-byID",(data)=>{
    console.log("recieved-location ",data);
    const {latitude,longitude,driverID}=data;

    if(markers[driverID]){
        markers[driverID].setLatLng([latitude,longitude]);
    }
    else{
        markers[driverID]=L.marker([latitude,longitude],{
            title:`E-Van ${driverID}`,
        }).addTo(map).bindPopup(`E-Van ${driverID} is here`).openPopup();
    }

    if(updateTimers[driverID]) clearTimeout(updateTimers[driverID]);
    updateTimers[driverID]=setTimeout(()=>{
        if(markers[driverID]){
            map.removeLayer(markers[driverID]);
            delete markers[driverID];
            delete updateTimers[driverID];

        }
    },30000);


})

