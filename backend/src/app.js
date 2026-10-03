import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: [
            "GET",
            "POST",
            "PATCH",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(helmet());

app.use(express.json());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});

app.use(
    "/api/auth/login",
    loginLimiter
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/shop",
    shopRoutes
);

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Shiv Electronics API is running"
    });

});

export default app;