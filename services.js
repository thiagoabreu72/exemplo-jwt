import jwt from "jsonwebtoken";

var usuarios = [{ usuario: "thiago", senha: "asdf" }];

function auth(req, res, next) {
  const token_header = req.headers.auth;

  if (!token_header)
    return res.send({
      erro: "Token não enviado!",
    });

  jwt.verify(token_header, "corinthians", (err, decoded) => {
    if (err) return res.send({ erro: "Token Inválido!" });
    return next;
  });
}

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
