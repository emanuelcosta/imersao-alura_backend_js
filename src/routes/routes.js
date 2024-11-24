import * as postsController from "../controllers/postsController.js"
import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({dest: "./uploads", storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    
    app.get('/', (req, res) => {
        res.status(200).send("Seja bem vindo a minha primeira api!!!")
    });
    app.get('/posts',postsController.listarPosts);
    app.get('/posts/:id',postsController.findPostById);
    app.post("/posts", postsController.saveNewPost);
    app.delete("/posts", postsController.destroy);
    app.post('/upload', upload.single("imagem"), postsController.uploadImagem);
    app.put("/posts/:id", postsController.updatePost);
}

export default routes;