import express from "express";
import jwt from "jsonwebtoken";
import services from "./services.js";

// Função para criação do token conforme palavra secreta.
const criarToken = (userId) => {
  return jwt.sign({ id: userId }, "corinthians", { expiresIn: "1d" });
};

const app = express();
app.use(express.json());

// Criar usuário temporário.
app.post("/user/create", services.verificaUsuario, (req, res) => {
  services.usuarios.push({ usuario: req.body.usuario, senha: req.body.senha });
  return res.send("Usuário Cadastrado");
});

// Verifica se o usuário é válido.
app.post("/user/get", (req, res) => {
  let retorno = services.usuarios.filter(
    (usuario) =>
      usuario.usuario === req.body.usuario && usuario.senha === req.body.senha
  );

  if (retorno.length > 0) return res.send("Usuário Válido.");
  else res.send("Usuário Inválido.");
});

// Gera o token caso o usuário seja existente.
app.post("/user", services.validaUsuario, (req, res) => {
  let { usuario, senha } = req.body;

  if (!usuario || !senha) return res.send({ erro: "Dados Insuficientes." });
  else return res.send({ token: criarToken(usuario) });
});

// testa autenticação via token
app.get("/auth", services.auth, (req, res) => {
  return res.send({ mensagem: "Usuário Autenticado." });
});

app.listen(3000, () => {
  console.log("Iniciado");
});
