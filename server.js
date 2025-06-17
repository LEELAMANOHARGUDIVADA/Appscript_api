import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import { connectDB } from "./db/db.js";
import salesRoutes from "./routes/SalesRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: "",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("SERVER IS UP AD RUNNING");
});

app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB();
    console.log("SERVER RUNNING ON PORT", PORT);
});