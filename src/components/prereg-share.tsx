import { useEffect, useState } from "react";

// 카카오 개발자 앱(1564100)의 JavaScript 키. 브라우저 공개용 키이며, 콘솔에 등록된 도메인에서만 동작한다.
const KAKAO_JS_KEY = "203cb59ee380ba085e5c3076443b93d4";
const KAKAO_SDK = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

type KakaoSdk = {
  isInitialized(): boolean;
  init(key: string): void;
  Share: { sendDefault(options: Record<string, unknown>): void };
};

declare global {
  interface Window { Kakao?: KakaoSdk }
}

let sdkPromise: Promise<KakaoSdk | null> | null = null;

function loadKakao(): Promise<KakaoSdk | null> {
  if (!KAKAO_JS_KEY || typeof window === "undefined") return Promise.resolve(null);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve) => {
    const ready = () => {
      const k = window.Kakao;
      if (!k) return resolve(null);
      try {
        if (!k.isInitialized()) k.init(KAKAO_JS_KEY);
        resolve(k);
      } catch {
        resolve(null);
      }
    };
    if (window.Kakao) return ready();
    const s = document.createElement("script");
    s.src = KAKAO_SDK;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.onload = ready;
    s.onerror = () => { sdkPromise = null; resolve(null); };
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function shareText(receipt: string, at: string) {
  return [
    "[청라 아크원 푸르지오] 사전등록 완료되었습니다.",
    `접수번호 ${receipt}${at ? ` · 접수시각 ${at}` : ""}`,
    "고객등록 확인은 대표번호 1833-3872",
  ].join("\n");
}

export function PreregShare({ receipt, at }: { receipt: string; at: string }) {
  const [note, setNote] = useState("");
  const text = shareText(receipt, at);

  // SDK를 미리 불러 둔다. 클릭 이후 await가 끼면 PC 브라우저가 공유 팝업을 차단한다.
  useEffect(() => { void loadKakao(); }, []);

  async function onShare() {
    setNote("");
    const url = `${window.location.origin}/`;
    const ready = window.Kakao?.isInitialized?.() ? window.Kakao : null;
    const kakao = ready ?? (await loadKakao());
    if (kakao) {
      try {
        kakao.Share.sendDefault({
          objectType: "text",
          text,
          link: { mobileWebUrl: url, webUrl: url },
          buttonTitle: "현장 홈페이지",
        });
        return;
      } catch {
        // 아래 대체 경로로 진행
      }
    }
    if (navigator.share) {
      try {
        await navigator.share({ title: "청라 아크원 푸르지오 사전등록", text: `${text}\n${url}` });
        return;
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setNote("접수 내용이 복사되었습니다. 카카오톡 '나와의 채팅'에 붙여 넣어 보관하세요.");
    } catch {
      setNote("이 화면을 캡처해 보관해 주세요.");
    }
  }

  return (
    <div className="prereg-share">
      <button type="button" className="prereg-share__btn" onClick={onShare}>
        카카오톡으로 접수확인 저장
      </button>
      <p className="prereg-share__hint">카카오톡 '나와의 채팅'으로 보내 두시면 접수번호를 언제든 확인하실 수 있습니다.</p>
      {note ? <p className="prereg-share__note" role="status">{note}</p> : null}
    </div>
  );
}
