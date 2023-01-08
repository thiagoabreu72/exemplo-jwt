import jwt from "jsonwebtoken";

var usuarios = [];

// Função para verificação do token recebido.
function auth(req, res, next) {
  const token_header = req.headers["authorization"];

  if (!token_header)
    return res.send({
      erro: "Token não enviado!",
    });

  jwt.verify(token_header, "corinthians", (err, decoded) => {
    console.log(decoded);
    if (err) return res.send({ erro: "Token Inválido!" });
    return next();
  });
}

// Função para validar se o usuário existe.
function validaUsuario(req, res, next) {
  console.log(req.body.usuario);
  let retorno = usuarios.filter(
    (usuario) =>
      usuario.usuario === req.body.usuario && usuario.senha === req.body.senha
  );
  console.log(retorno);

  if (retorno.length > 0) return next();
  else return res.send("Usuário Inválido.");
}

// Função para verificação se o usuário que está
// sendo criado, já existe.
function verificaUsuario(req, res, next) {
  let retorno = usuarios.filter(
    (usuario) => usuario.usuario === req.body.usuario
  );
  if (retorno.length > 0) return res.send("Usuário já existe.");
  else return next();
}

export default {
  auth,
  validaUsuario,
  verificaUsuario,
  usuarios,
};
