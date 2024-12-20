import express from 'express';
import { getBuildInfo } from './utils/buildInfo';

const app = express();
const PORT = process.env.PORT || 3000;

// Rota básica que retorna a versão do projeto e a última data de compilação
app.get('/', (req, res) => {
  const buildInfo = getBuildInfo();
  res.json({
    version: buildInfo.version,
    lastBuild: buildInfo.lastBuild,
    message: 'API funcionando com sucesso!'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
