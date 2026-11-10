// 평면도 이미지 12장: 2026-11-06 운영 배포에만 있고 저장소에 없던 파일.
// 빌드 때 운영 도메인에서 받아 SHA1을 배포 파일 ID와 대조한다. 하나라도 다르면 빌드를 멈춘다.
// (원본 파일을 저장소에 직접 넣으면 이 스크립트는 건너뛴다.)
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ORIGIN = "https://www.xn--2w2b19sita0u67iz2mi7g.site";
const FILES = [
  [
    "public/plans/plan-103a-redraw-v2.png",
    "e623c9a481eb5726831b7e992d15627447a4bd88"
  ],
  [
    "public/plans/plan-103a-redraw-v2.webp",
    "485ad2f935af6b6fb94fb7a854d5a7b46eb65604"
  ],
  [
    "public/plans/plan-103b-official.jpg",
    "b895268fc9a7001f45336ccc011f55bce8b45f4b"
  ],
  [
    "public/plans/plan-103b-official.webp",
    "7193f49d69b0460e1b1e74d8f9c99a36d00f5ac7"
  ],
  [
    "public/plans/plan-84a-official.jpg",
    "ca4bd0a5829b85a1ceaa3a81649820a95d9dc1e5"
  ],
  [
    "public/plans/plan-84a-official.webp",
    "f84d6d3e24f7da07f19929a3916d89e9fe8d4d53"
  ],
  [
    "public/plans/plan-84b-official.jpg",
    "dfa2f6ce05177fa04c3a9d7be0c5b5289b868113"
  ],
  [
    "public/plans/plan-84b-official.webp",
    "ea70771552af33a59e074a032356bd9f63583523"
  ],
  [
    "public/plans/plan-84c-redraw-v2.png",
    "9afbf445ca1321064ee155734cf719a976882f23"
  ],
  [
    "public/plans/plan-84c-redraw-v2.webp",
    "c7079aa6a82fd3c931f70b7f6942c480dff00835"
  ],
  [
    "public/plans/plan-84d-official.jpg",
    "0aefd15eda883a8f1084a37e9dd6fc07da749fe0"
  ],
  [
    "public/plans/plan-84d-official.webp",
    "10227f29dfbc9c3ba560b03965032c5647f28f60"
  ]
];
const sha1 = (b) => createHash("sha1").update(b).digest("hex");
let fetched = 0;
for (const [path, want] of FILES) {
  if (existsSync(path) && sha1(readFileSync(path)) === want) continue;
  const url = ORIGIN + path.replace(/^public/, "");
  let buf = null;
  for (let i = 0; i < 3 && !buf; i++) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) buf = Buffer.from(await r.arrayBuffer());
    } catch {}
  }
  if (!buf || sha1(buf) !== want) {
    console.error(`[fetch-plan-images] FAIL ${path} (${buf ? "sha1 mismatch" : "download failed"})`);
    process.exit(1);
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buf);
  fetched++;
}
console.log(`[fetch-plan-images] ok · fetched ${fetched} · total ${FILES.length}`);
