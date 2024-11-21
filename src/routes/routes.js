import {listarPosts,findPostById} from "../controllers/postsController.js"

const routes = (app) => {
    app.get('/posts',listarPosts)
    app.get('/posts/:id',findPostById)
}

export default routes;