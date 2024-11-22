import * as postModel from "../models/postsModel.js";

export async function listarPosts (req, res){
    const posts = await postModel.getAll();
    res.status(200).json(posts)
}

export async function findPostById (req, res){
    const post = await postModel.get(req.params.id);
    res.status(200).json(post)
}

export async function saveNewPost(req, res){
    let newPost = req.body;

    try{
        const postCriado = await postModel.create(newPost);
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});

    }
}

export async function destroy(req, res){
    let postId = req.body.id;

    try{
        const postDeletado = await postModel.deletePost(postId);
        res.status(200).json(postDeletado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});

    }
}