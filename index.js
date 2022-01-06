import express from "express";
import cors from "cors";
import pool from "./db.js";
import multer from "multer";

// Init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

// Routes

// create a user
app.post("/videos", upload.single("videoFile"), async (req, res, next) => {
    try {
        const dbVideos = req.body;
        const url = req.protocol + "://" + req.get("host");
        const newVideo = await pool.query(
            `insert into video(song_name, description, video_url, likes, shares, messages, channel_id) values(
                ${dbVideos.song_name}, ${dbVideos.description},
                ${url + "/public/" + req.file.filename}, 0, 0, 0, 
                ${dbVideos.channel_id}
            );`
        );
        console.log("Save url", url);
        res.json(newVideo.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// list todos
app.get("/videos", async (req, res) => {
    try {
        const allVideos = await pool.query(
            "select channel.name as channel_name, v.* from video v left join channel on channel.id=v.channel_id;"
        );
        console.log("sended");
        res.status(200).json(allVideos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// Listener
app.listen(8001, () => {
    console.log("Server has started on port 8001");
});
