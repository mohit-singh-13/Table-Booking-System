import express from "express";
import { bookingRouter } from "./routes/booking-routes";
import cors from "cors";
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", bookingRouter);

app.listen(PORT, () => {
  console.log("Server up and running");
});
