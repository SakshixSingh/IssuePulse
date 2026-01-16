import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import modRoutes from "./routes/modRoutes.js";
import authorityRoutes from "./routes/authorityRoutes.js";


const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow frontend origin
  credentials: true, // Allow cookies/credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For FormData text fields

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running", status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/issues", issueRoutes);

app.use("/api/mod", modRoutes);

app.use("/api/authority", authorityRoutes);

export default app;

