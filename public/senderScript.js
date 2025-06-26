alert("this is the confirmation alert , good to have it main");
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("user-location", { latitude, longitude });
      },
      (error) => {
        console.log("some error is coming while fetching the location from the user", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 1000
      }
    );
  } else {
    alert("Sorry, your device doesn't support location.");
  }
});
