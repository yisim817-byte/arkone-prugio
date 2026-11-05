// 작업지시서 15 검사 v1.1 (15-1 반영): 공식 홈페이지 배열 적용 (헤더 · 오피스텔/상업시설 COMING SOON 팝업 · 원형 배지 · 사전고객등록 순서 · 직원 히어로)
// 읽기만 한다. 폼 전송 없음.
// 사용법: node wo15-check.mjs <기준주소> <이 사이트 대표번호> [staff]
//   세 번째 인자 staff = 직원 사이트(직원 히어로 교체 검사 S1 포함)
// Node 20 이상, 외부 패키지 없음.
const [base0, phone, kind] = process.argv.slice(2);
if (!base0 || !phone) { console.error('usage: <base-url> <site-phone> [staff]'); process.exit(2); }
const base = base0.replace(/\/$/, ''); const host = new URL(base).host; const STAFF = kind === 'staff';
const ALL_PHONES = ['1833-3872', '1666-4250', '1533-9014', '1666-6799', '1551-6881']; const others = ALL_PHONES.filter(p => p !== phone);
const get = async (u) => { for (let i = 0; i < 3; i++) { try { const r = await fetch(u, { redirect: 'follow' }); return { status: r.status, text: r.ok ? await r.text() : '' }; } catch {} } return { status: 0, text: '' }; };
const decode = (t) => t.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&nbsp;/g, ' ').replace(/&/g, '&').replace(/"/g, '"').replace(/&#39;/g, "'").replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
const load = async (path) => {
  const r = await get(base + path); let all = decode(r.text); const seen = new Set();
  const addJs = async (u) => { if (seen.has(u)) return; seen.add(u); const j = await get(u); if (!j.text) return; all += '\n' + decode(j.text);
    for (const m of j.text.matchAll(/["'`(]\.?\/?((?:assets\/)?[\w.-]+-[\w-]{6,}\.js)["'`)]/g)) await addJs(base + '/' + (m[1].startsWith('assets/') ? m[1] : 'assets/' + m[1])); };
  for (const m of r.text.matchAll(/(?:src|href)="([^"]+?\.js)(?:\?[^"]*)?"/g)) { try { const u = new URL(m[1], base + path); if (u.host === host) await addJs(u.origin + u.pathname); } catch {} }
  for (const x of ['/event-pop.js', '/assets/event-pop.js', '/soon-pop.js', '/assets/soon-pop.js']) await addJs(base + x);
  return { status: r.status, html: decode(r.text), all };
};
let fail = 0; const report = (ok, name, detail, s = []) => { if (!ok) fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${detail}`); [...new Set(s)].slice(0, 12).forEach(x => console.log('   ' + x)); };
const ctx = (t, re) => [...t.matchAll(new RegExp(re.source, 'g'))].map(m => '…' + t.slice(Math.max(0, m.index - 50), m.index + 60).replace(/\s+/g, ' ') + '…');
const inOrder = (t, labels, win = 6000) => {
  let i = -1; while ((i = t.indexOf(labels[0], i + 1)) >= 0) { let p = i, ok = true; for (const l of labels.slice(1)) { const q = t.indexOf(l, p + 1); if (q < 0 || q - i > win) { ok = false; break; } p = q; } if (ok) return true; } return false; };

const home = await load('/'); const reg = await load('/register');
const TOP = ['사업안내', '청약안내', '단지안내', '아파트', '오피스텔', '홍보센터', '근린생활시설'];
report(inOrder(home.all, TOP), 'H1 헤더 1단 메뉴 순서', TOP.join(' → '));
report(inOrder(home.all, ['홍보센터', '사전고객등록', '방문예약', '이벤트', '오시는길'], 2500), 'H2 홍보센터 하위 순서', '홍보센터 → 사전고객등록 → 방문예약 → 이벤트 → 오시는길');
report(/근린생활시설/.test(home.all) && /popup_soon_commercial/.test(home.all), 'H3 근린생활시설 버튼 → 상업시설 팝업 연결', /popup_soon_commercial/.test(home.all) ? '연결 있음' : '연결 없음');
const P1 = ['popup_soon_officetel', '청라 아크원 푸르지오', '청라가 기다리던', '또하나의 찬란한 순간', '멀티 발코니 오피스텔', 'COMING', 'SOON', '바로가기', '/register?product=officetel', '소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있습니다'];
const p1m = P1.filter(s => !home.all.includes(s));
report(p1m.length === 0, 'P1 오피스텔 COMING SOON 팝업', `누락 ${p1m.length ? p1m.join(' / ') : '없음'}`);
const P2 = ['popup_soon_commercial', '상업시설', 'CHEONGNA ARCONE PRUGIO', 'COMMERCIAL FACILITIES', '/register?product=commercial'];
const p2m = P2.filter(s => !home.all.includes(s));
report(p2m.length === 0, 'P2 상업시설 COMING SOON 팝업', `누락 ${p2m.length ? p2m.join(' / ') : '없음'}`);
const ext = ctx(home.all + '\n' + reg.all, /arkone-prugio\.com|bucket-apt\.s3|here-customer\.web\.app/);
const local = ['officetel_bg', 'commercial_bg', 'hero_circle_01', 'hero_circle_prereg'].filter(s => !home.all.includes(s));
report(ext.length === 0 && local.length === 0, 'P3 자산 자체 보관 · 외부 의존 0', `외부 ${ext.length}건 · 누락 ${local.length ? local.join(' / ') : '없음'}`, ext);
const b1 = ['hero_circle_01', 'hero_circle_prereg', 'hero_circle_text'].filter(s => !home.all.includes(s));
report(b1.length === 0, 'B1 원형 배지 2개(팩 파일)', `누락 ${b1.length ? b1.join(' / ') : '없음'}`);
const R_ORDER = inOrder(reg.all, ['모두 확인하였으며 동의합니다', '만 14세 이상입니다', '개인정보 수집·이용 동의', '광고성 정보 수신 동의', '성명을 입력하세요', '숫자만 입력하세요', '생년월일'], 20000);
const R_TEXT = ['참여하기', '청라 아크원 푸르지오 사전고객', '전체 동의에는 필수 및 선택 정보에 대한 동의가 포함되어 있으며', '개인정보 수집 및 이용 안내를 확인해주세요', '성명, 휴대폰번호, 생년월일을 입력해 주시기 바랍니다'].filter(t => !reg.all.includes(t));
const R_BTN = /["'`>]\s*등록\s*["'`<]/.test(reg.all);
const R_POSTER = /register-poster\.(jpe?g|png|webp)/.test(reg.all);
const R_PRODUCT = /product/.test(reg.all) && /officetel/.test(reg.all) && /commercial/.test(reg.all);
report(reg.status === 200 && R_ORDER && R_TEXT.length === 0 && R_BTN && R_POSTER && R_PRODUCT, 'R1 /register 공식 순서·문구·「등록」·포스터·상품',
  `HTTP ${reg.status} · 순서 ${R_ORDER ? 'O' : 'X'} · 문구 누락 ${R_TEXT.length ? R_TEXT.join(' / ') : '없음'} · 「등록」 ${R_BTN ? 'O' : 'X'} · 포스터 ${R_POSTER ? 'O' : 'X'} · 상품값 ${R_PRODUCT ? 'O' : 'X'}`);
if (!STAFF) { const keep = ['사전등록 완료되었습니다', '고객등록 확인은 대표번호'].filter(s => !reg.all.includes(s));
  report(keep.length === 0, 'R2 완료 문구·확인 안내 유지', keep.length ? `없음 ${keep.join(' / ')}` : '있음'); }
const auth = ctx(reg.all, /인증번호|휴대폰 인증|본인인증|전화번호 인증|인증하기|["'`>]\s*인증\s*["'`<]/);
report(auth.length === 0, 'R3 인증 단계 0', `${auth.length}건`, auth);
const kw = ctx(home.all + '\n' + reg.all, /관심고객/);
report(kw.length === 0, 'N1 「관심고객」 표기 0', `${kw.length}건`, kw);
const all = home.all + '\n' + reg.all;
const otherHit = others.filter(p => all.includes(p) || all.includes(p.replace(/-/g, '')) || all.includes(p.replace('-', '.')));
report(all.includes(phone) && otherHit.length === 0, 'N2 이 사이트 번호만', `자기 번호 ${all.includes(phone) ? '있음' : '없음'} · 다른 번호 ${otherHit.length}종`, otherHit);
const bad = ctx(home.all, /확정수익|수익\s*보장|원금\s*보장|무조건|대박|급매|지금 아니면/);
report(bad.length === 0, 'N3 금지 표현', `${bad.length}건`, bad);
if (STAFF) {
  const S = ['청라의 정점을 빛내는', '푸르지오의 완성', '10월 30일', 'GRAND OPEN', 'hero_bg.v100', 'hero_video_m_2'];
  const sm = S.filter(s => !home.all.includes(s));
  report(sm.length === 0, 'S1 직원 히어로 교체(공식 현재 히어로)', `누락 ${sm.length ? sm.join(' / ') : '없음'}`);
}
console.log(`INFO ${base} · 홈 HTTP ${home.status} · /register HTTP ${reg.status}${STAFF ? ' · 직원 사이트' : ''}`);
process.exit(fail ? 1 : 0);
