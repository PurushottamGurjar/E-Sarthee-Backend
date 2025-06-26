import express from "express";
import http from "http";
import ejs from "ejs";
import path from "path";
import { Server } from "socket.io";


import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

const app=express();
const server=http.createServer(app);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



const io=new Server(server);
io.on("connection",(socket)=>{
    console.log("you connection setup successfully with ", socket.id);

    socket.on("user-location",(data)=>{
        io.emit("fetch-all-locations",data);
    })

    socket.on("disconnect",()=>{
        console.log("your connection with socket is disconnected ",socket.id);
    })

});

app.get("/send-location",(req,res)=>{
    res.render("senderIndex");
})

app.get("/", (req,res)=>{
    res.render("viewerIndex");
})


server.listen(3030,(req,res)=>{
    console.log("Thanks for choosing the express and websocket and your server is listening on port ", 3030);
});
