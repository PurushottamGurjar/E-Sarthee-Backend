document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const urlParams=new URLSearchParams(window.location.search);
  const driverID=urlParams.get("id") || "one";
  
  let lastSent = { latitude: 0, longitude: 0 };

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        lastSent = { latitude, longitude }; 
        socket.emit("driver-location-byID", { latitude, longitude, driverID });
        console.log("Sending location", latitude, longitude, driverID);
      },
      (error) => {
        console.log("⚠️ Error while fetching location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 1000
      }
    );

    
    setInterval(() => {
      socket.emit("driver-location-byID", { ...lastSent, driverID });
      console.log("Heartbeat sent", lastSent);
    }, 15000);

  } else {
    alert("Sorry, your device doesn't support location.");
  }
});
