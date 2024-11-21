import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export function getAll(){
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

// busca um registro especifico
export function get(postId){
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    return colecao.findOne({_id: new ObjectId(postId) })
}