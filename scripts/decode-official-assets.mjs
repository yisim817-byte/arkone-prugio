import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "scripts/official-b64");

export function decodeOfficialAssets() {
  const manifestPath = join(dir, "manifest.json");
  if (!existsSync(manifestPath)) return;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  for (const item of manifest) {
    const b64 = item.parts.map((part) => readFileSync(join(dir, part), "utf8").replace(/\s+/g, "")).join("");
    const out = join(root, "public/official", item.out);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(b64, "base64"));
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) decodeOfficialAssets();
