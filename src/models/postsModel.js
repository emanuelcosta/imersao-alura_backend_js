import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

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
export function updatePost(id, novoPost) {
    try {
        const db = conexao.db("imersao-alura");
        const colecao = db.collection("posts");
        const objId = ObjectId.createFromHexString(id);
        return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost})
    } catch (erro) {
        console.error(erro.message);
    }
}

export function deletePost(postId) {
    try {
        const db = conexao.db("imersao-alura");
        const colecao = db.collection("posts");
        const objID = ObjectId.createFromHexString(postId)
        return colecao.deleteOne({_id: new ObjectId(objID)});
    } catch (erro) {
        console.error(erro.message);
    }
}