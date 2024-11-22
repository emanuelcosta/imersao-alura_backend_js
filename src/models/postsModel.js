import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export function getAll() {
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

// busca um registro especifico
export function get(postId) {
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.findOne({ _id: new ObjectId(postId) })
}

export function create(newPost) {
    try {
        const db = conexao.db("imersao-alura");
        const colecao = db.collection("posts");
        return colecao.insertOne(newPost)
    } catch (erro) {
        console.error(erro.message);
    }
}

export function deletePost(postId) {
    try {
        const db = conexao.db("imersao-alura");
        const colecao = db.collection("posts");
        return colecao.deleteOne({_id: new ObjectId(postId)});
    } catch (erro) {
        console.error(erro.message);
    }
}