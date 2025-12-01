import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';
const DEFAULT_CACHE_TTL_MS = Number.isFinite(Number(process.env.CACHE_TTL_MS))
  ? Number(process.env.CACHE_TTL_MS)
  : 60000;

type RepoPaths = {
  repoRoot: string;
  docsDir: string;
  componentDocsGlob: string;
  tokensPath: string;
  iconsDir: string;
};

type BootstrapConfig = {
  serverName: string;
  serverVersion: string;
  logLevel: string;
  cacheTtlMs: number;
  paths: RepoPaths;
};

const FALLBACK_SERVER_NAME = 'zenkigen-component-mcp';
const FALLBACK_SERVER_VERSION = '0.1.0';

const packageJsonServerInfo = (() => {
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
  while (true) {
    const hasGit = fs.existsSync(path.join(current, '.git'));
    const hasPackageJson = fs.existsSync(path.join(current, 'package.json'));
    if (hasGit || hasPackageJson) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return startDir;
    }
    current = parent;
  }
}

export function resolveRepoPaths(): RepoPaths {
  const repoRoot = process.env.ROOT_DIR ? path.resolve(process.env.ROOT_DIR) : findRepoRoot();

  return {
    repoRoot,
    docsDir: path.join(repoRoot, 'docs'),
    componentDocsGlob: path.join(repoRoot, 'docs', 'component', '*.md'),
    tokensPath: path.join(repoRoot, 'packages', 'component-config', 'src', 'tokens', 'tokens.ts'),
    iconsDir: path.join(repoRoot, 'packages', 'component-icons', 'src', 'svg'),
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

// TODO: Wire up @modelcontextprotocol/sdk with resources/tools and replace the placeholder logging.
export async function main(): Promise<void> {
  const config = createBootstrapConfig();
  // 現時点ではレスポンスを実装していないため、起動情報のみを出力する。
  // 実装着手時に createServer などで SDK へ接続する。
  console.log(
    JSON.stringify(
      {
        message: 'MCP server scaffold (responses not implemented yet)',
        server: {
          name: config.serverName,
          version: config.serverVersion,
        },
        logLevel: config.logLevel,
        cacheTtlMs: config.cacheTtlMs,
        paths: config.paths,
      },
      null,
      2,
    ),
  );
}

const isMainModule =
  typeof process.argv[1] === 'string' &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  void main();
}
