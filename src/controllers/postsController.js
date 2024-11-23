import * as postModel from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

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
export async function updatePost(req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post  = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        
        const postCriado = await postModel.updatePost(id, post);
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição."});
    }
}

export async function uploadImagem(req, res){
    console.log(req.file)
    let newPost = {
        imgUrl: req.file.originalname,
        descricao:"",
        alt: ""

    };
    try{
        const postCriado = await postModel.create(newPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
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