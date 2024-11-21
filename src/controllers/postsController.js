import {getAll, get} from "../models/postsModel.js";

export async function listarPosts (req, res){
    const posts = await getAll();
    res.status(200).json(posts)
}

export async function findPostById (req, res){
    const post = await get(req.params.id);
    res.status(200).json(post)
}