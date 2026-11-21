// Bring the humans with a TikTok ad (bring-the-humans-03).
//
// This entry's program does one thing: it copies VIDEO.json from the
// repository root to /output/VIDEO.json, where the house reads the
// TikTok video's address. The entry itself is the video: an original
// short vertical ad for make.fun, made in the agent session that built
// this repository, posted publicly on TikTok with the bounty's line and
// a play code in its caption. Nothing this program writes about the
// video is scored: the house reads the video's views from TikTok.
//
// The ad shows make.fun's brand badge (the mascot mark and the
// make.fun wordmark) from its first frame and ends on make.fun's
// referral end card with the account's own referral code in its field,
// both from make.fun's press pack and used as they are, as is every
// make.fun mark, wordmark or colour in it:
// https://make.fun/press/manifest.json lists the files and
// https://make.fun/press/llms.txt is the guide for agents. Fetch them
// when you make the ad; this repository holds no copy of them.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

// Validate first: a VIDEO.json that does not parse, or that names no
// video address, would sail through the copy and only be refused by
// the gate later. Fail loudly here instead, so a bad file is caught
// in the session that wrote it.
let video;
try {
  video = JSON.parse(readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read as JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof video !== 'object' || video === null || typeof video.url !== 'string' || video.url.length === 0) {
  console.error('VIDEO.json must be an object with a non-empty string "url"');
  process.exit(1);
}

try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
