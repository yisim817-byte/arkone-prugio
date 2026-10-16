# A34 일정 표기 위치 — 2026-09-26

조사 기준: `seo/a34-fix-20260926` @ `b95b81a`
운영 롤백 기준: `dpl_BAMwXiheFvfZAC7B2P7YQcGW6qw4`

| 위치 | 현재 문구 | 조치 |
| --- | --- | --- |
| `src/routes/index.tsx` 홈 마운트 `{!intro ? <HomePopups /> : null}` 1곳. 다른 페이지 마운트 없음 | 첫 방문 팝업 5장. 오늘 하루 보지 않기는 `home-popups.tsx` localStorage | 마운트와 컴포넌트 제거. 이미지 파일은 유지 |
| 팝업 이미지 `public/upload/popup/20260921144145_6968.jpg` | 09.29(화) 사업설명회, 10.01~10.02 네트워크 착석, 10.08 모집공고, 10.16 GRAND OPEN, 10.19~11.07 청약·당첨·계약 | 참조 해제. 공개 허용 2건만 본문 텍스트로 대체 |
| 팝업 나머지 4장 | 일정 날짜 없음 | 참조 해제, 파일 유지 |
| 홈 title / description / JSON-LD | 일정 없음 | 변경 없음 |
| `__root.tsx` robots, `public/sitemap.xml`, 푸터 부인 고지 | noindex, url 0건, 부인 고지 있음 | 유지 |
| 히어로 `10월 OPEN 예정` | 기존 히어로 문구. 옛 분양 일정 날짜는 아님 | Hero 변경 금지라 유지 |
| `src/lib/news.ts` 기사 날짜 | 2026.09.02~09.22 게재일 | 변경 없음 |
