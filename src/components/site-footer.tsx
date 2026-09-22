import { SITE_PHONE, SITE_TEL_HREF } from "@/lib/site-data";

type Props = { onPrivacy: () => void };

export function SiteFooter({ onPrivacy }: Props) {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/resources/img/common/logotype.svg" alt="PRUGIO" />
          </div>
          <button type="button" className="footer__privacy-btn" onClick={onPrivacy}>
            개인정보처리방침
          </button>
        </div>
        <div className="footer__info">
          <p className="footer__info-text">
            (주) 대우건설 : 서울특별시 중구 을지로 170 <br className="m-only" /> 사업자등록번호 :
            104-81-58180
            <br />
            (주) 청라스마트시티 : 인천광역시 연수구 센트럴로 263,
            <br className="m-only" /> 8층 9호(송도동, 송도국제업무단지 C8-2블럭 업무복합시설){" "}
            <br className="m-only" /> 사업자등록번호 : 866-88-02497
            <br />
            온라인대행 : (주)나인야드 <span className="pc-inline">|</span>
            <br className="m-only" /> 주소 : 서울시 송파구 법원로8길 8 문정역2차 SK V1 1010호{" "}
            <span className="pc-inline">|</span>
            <br className="m-only" /> 사업자등록번호 : 874-88-03065 <br />
            온라인대행 : (주)넥스미디어 <span className="pc-inline">|</span>
            <br className="m-only" /> 주소 : 경기도 성남시 분당구 미금일로90번길 32, 웰파크3층{" "}
            <span className="pc-inline">|</span>
            <br className="m-only" /> 사업자등록번호 : 462-81-00186
          </p>
          <p className="footer__disclaimer">
            ※ 본 홈페이지의 CG, 이미지컷은 소비자의 이해를 돕기 위해 <br className="m-only" /> 제작된
            것으로 실제와 다소 차이가 있을 수 있습니다.
            <br />
            ※ 본 홈페이지에 명시된 모든 개발계획은 관계기관 혹은 <br className="m-only" /> 지자체의
            사정에 의해 변경 또는 취소될 수 있습니다.
            <br />※ 본 홈페이지에 사용된 일부 이미지 및 영상은 AI로 제작되었습니다.
          </p>
          <p className="footer__copyright">POWERED BY ㈜청라스마트시티. ALL RIGHT RESERVED.</p>
        </div>
        <div className="footer__right">
          <div className="footer__construction">
            <p>시행 | ㈜청라스마트시티</p>
            <p>
              시공 |{" "}
              <img
                src="/resources/img/common/logo_daewoo.svg"
                className="footer__construction-logo"
                alt="대우건설"
              />
            </p>
          </div>
          <div className="footer__contact">
            <span className="footer__contact-label">문의</span>
            <a href={SITE_TEL_HREF} className="footer__contact-phone">
              <span>{SITE_PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
