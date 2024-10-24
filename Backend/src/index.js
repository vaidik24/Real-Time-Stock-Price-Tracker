import dotenv from "dotenv";
import { app } from "./app.js";
import cors from "cors"
import connectDB from "./config/dbConnection.js";
// import { startWebSocket } from "./websocket.js"; // Import the startWebSocket function

dotenv.config({ path: "./.env" });
app.use(cors({
  origin: 'http://localhost:5173', // Update this to your frontend origin
  credentials: true, // This allows cookies to be sent with the request, useful for authentication
}));

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:", error);
    });

    // Start the WebSocket connection
    // startWebSocket();

    app.listen(process.env.PORT || 8002, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error);
  });
