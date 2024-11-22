import * as postsController from "../controllers/postsController.js"
import express from "express";

const routes = (app) => {
    app.use(express.json());
    app.get('/', (req, res) => {
        res.status(200).send("Seja bem vindo a minha primeira api!!!")
    });
    app.get('/posts',postsController.listarPosts);
    app.get('/posts/:id',postsController.findPostById);
    app.post("/posts", postsController.saveNewPost);
    app.delete("/posts", postsController.destroy);
}

export default routes;