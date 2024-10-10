import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    
        "id": 163212,
        "nome": "Giovanni",
        "profissao": "jogador",
        "envolvimento": "sim",
        "nivel": "medio"
}
];

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, envolvimento, nivel } = req.body;

  // Validação dos campos nome e profissão
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou profissão nao foi preenchido corretamente!",
    });
  }

  // Validação de nivel
  if (nivel != "baixo" && nivel != "medio" && nivel!= "alto") {
    return res.status(400).send({
      message:
        "O nivel de suspeito deve ser baixo, medio ou alto!",
    });
  }

  // Criação de um novo suspeito
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    envolvimento,
    nivel,
  };

  // Adiciona o novo suspeito ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "Suspeito cadastrado com sucesso!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeito
  const suspeito = suspeitos.find((suspect) => suspect.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

  return res.status(200).json(suspeito);
});

// Rota para atualizar um candidato pelo id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, profissao, envolvimento, nivel } = req.body;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspect) => suspect.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e profissão
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou a profissão não foram preenchidos!",
    });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  candidato.envolvimento = envolvimento;
  candidato.nivel = nivel;

  return res.status(200).json({
    message: "Suspeito atualizado com sucesso!",
    suspeito,
  });
});

suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeito
  const suspeito = suspeitos.find((suspect) => suspect.id == id);

  // Verifica se o candidato foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

  // Remove o suspeito do array de suspeitos
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "Suspeito removido com sucesso!",
    suspeito,
  });
});

export default suspeitosRoutes;