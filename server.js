require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route GET untuk ambil data tracking HT
app.get("/tracking", async (req, res) => {
    try {
        const response = await axios.post(
            process.env.API_URL,
            { uids: "62,63", corrdinateType: "Wgs84" },
            {
                headers: {
                    "Content-Type": "application/json",
                    "token": process.env.TOKEN,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Gagal mengambil data" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
