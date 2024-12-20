import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface BuildInfo {
  version: string;
  lastBuild: string;
}
const buildInfoDir = join(__dirname, '../../dist'); // Diretório onde o arquivo será salvo

// Caminho do arquivo package.json
const packageJsonPath = join(__dirname, '../../package.json');
const buildInfoPath = join(__dirname, '../../dist/build-info.json');

// Função que gera as informações de build e as salva no disco
export function generateBuildInfo() {
  mkdirSync(buildInfoDir, { recursive: true });
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const buildInfo: BuildInfo = {
    version: packageJson.version,
    lastBuild: new Date().toISOString()
  };
  writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
}

// Função que lê as informações de build
export function getBuildInfo(): BuildInfo {
  try {
    return JSON.parse(readFileSync(buildInfoPath, 'utf-8'));
  } catch {
    generateBuildInfo(); // Gera o arquivo caso não exista
    return getBuildInfo();
  }
}
