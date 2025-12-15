import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
const DEFAULT_CACHE_TTL_MS = Number.isFinite(Number(process.env.CACHE_TTL_MS))
  ? Number(process.env.CACHE_TTL_MS)
  : 60000;

export type RepoPaths = {
  repoRoot: string;
  docsDir: string;
};

export type BootstrapConfig = {
  serverName: string;
  serverVersion: string;
  logLevel: string;
  cacheTtlMs: number;
  paths: RepoPaths;
};

const FALLBACK_SERVER_NAME = 'zenkigen-component-mcp';
const FALLBACK_SERVER_VERSION = '0.1.0';
const moduleDir = path.dirname(fileURLToPath(import.meta.url));

const packageJsonServerInfo = (() => {
  // 単体配布時にも name/version を持たせるため、カレントの package.json を参照
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    return {
      name: typeof pkg.name === 'string' ? pkg.name : FALLBACK_SERVER_NAME,
      version: typeof pkg.version === 'string' ? pkg.version : FALLBACK_SERVER_VERSION,
    };
  } catch {
    return { name: FALLBACK_SERVER_NAME, version: FALLBACK_SERVER_VERSION };
  }
})();

export function findRepoRoot(startDir = process.cwd()): string {
  let current = path.resolve(startDir);
  let lastPackageJsonDir = current;

  while (true) {
    // git が見つかった時点を優先してリポジトリルートとみなす
    const hasGit = fs.existsSync(path.join(current, '.git'));
    if (hasGit) {
      return current;
    }

    const hasPackageJson = fs.existsSync(path.join(current, 'package.json'));
    if (hasPackageJson) {
      lastPackageJsonDir = current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return lastPackageJsonDir;
    }
    current = parent;
  }
}

export function resolveRepoPaths(): RepoPaths {
  const rootEnv = process.env.ROOT_DIR;
  const repoRoot =
    typeof rootEnv === 'string' && rootEnv.trim() !== '' ? path.resolve(rootEnv) : findRepoRoot(moduleDir);

  return {
    repoRoot,
    docsDir: path.join(repoRoot, 'docs'),
  };
}

export function createBootstrapConfig(): BootstrapConfig {
  return {
    serverName: packageJsonServerInfo.name,
    serverVersion: packageJsonServerInfo.version,
    logLevel: DEFAULT_LOG_LEVEL,
    cacheTtlMs: DEFAULT_CACHE_TTL_MS,
    paths: resolveRepoPaths(),
  };
}
