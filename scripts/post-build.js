const fs = require('fs');
const path = require('path');

// Função para gerar o arquivo com a data e hora atuais
function createBuildTimestampFile() {
  const timestamp = new Date().toISOString(); // Data e hora atuais em formato ISO
  const buildInfoDir = path.join(__dirname, '../dist'); // Diretório onde o arquivo será salvo
  fs.mkdirSync(buildInfoDir, { recursive: true });
  const buildInfoPath = path.join(__dirname, '../dist/build-info.json'); // Caminho para o arquivo gerado
  const packageJsonPath = path.join(__dirname, '../package.json');
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Conteúdo do arquivo
  const content = {
    version: packageJson.version,
    lastBuild: timestamp
  }

  // Criar o arquivo na pasta dist
  fs.writeFileSync(buildInfoPath, JSON.stringify(content), 'utf8');

  console.log(`Arquivo de timestamp criado em: ${buildInfoPath}`);
}

// Executar a função
createBuildTimestampFile();
