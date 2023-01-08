import express from "express";
import jwt from "jsonwebtoken";
import services from "./services.js";
/*let usuario = "thiago";
let senha = "thiago10";*/

const criarToken = (userId) => {
  return jwt.sign({ id: userId }, "corinthians", { expiresIn: "1d" });
};

const app = express();
app.use(express.json());

app.post("/user/create", services.verificaUsuario, (req, res) => {
  services.usuarios.push({ usuario: req.body.usuario, senha: req.body.senha });
  return res.send("Usuário Cadastrado");
});

app.post("/user/get", (req, res, next) => {
  let retorno = services.usuarios.filter(
    (usuario) =>
      usuario.usuario === req.body.usuario && usuario.senha === req.body.senha
  );

  if (retorno.length > 0) return res.send("Usuário Válido.");
  else res.send("Usuário Inválido.");
});

app.post("/user", (req, res) => {
  let { usuario, senha } = req.body;

  console.log(req.body);

  if (!usuario || !senha) return res.send({ erro: "Dados Insuficientes." });
  else return res.send({ token: criarToken(usuario) });
  /*else if (usuario !== usuario) return res.send({ erro: "Usuário inválido." });
  else if (password !== senha) return res.send({ erro: "Senha incorreta." });*/
});

app.get("/auth", services.auth, (req, res) => {
  return res.send({ mensagem: "Informação importante." });
});

app.listen(3000, () => {
  console.log("Iniciado");
});
