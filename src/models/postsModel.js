import 'dotenv/config';
// Importa a função para conectar ao banco de dados, definida em dbConfig.js
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados utilizando a string de conexão obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instalikes"
  const db = conexao.db("imersao-instalikes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Retorna um array com todos os documentos da coleção "posts"
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instalikes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instalikes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}