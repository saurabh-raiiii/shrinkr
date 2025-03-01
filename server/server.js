import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import router from "./router/routes.js";

const app = express();
const port = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://shrinkr-client-dfqv.onrender.com',
    credentials: true
}));

app.use("/", router);

// Test Route
app.get('/', (req, res) => {
    res.send("API Working fine");
});

// Connect to MongoDB and Start Server
connectDB()
    .then(() => {
        app.listen(port, "0.0.0.0", () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Stop the app if DB connection fails
    });
