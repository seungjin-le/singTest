'use client'


import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
   //도장 폰트
  @font-face {
    font-family: "JSArirang";
    font-weight: 700;
    src: local('/fonts/JSArirang.otf');
    font-display: swap;
  }

  @font-face {
    font-family: "SUITThin";
    font-weight: 700;
    src:  local('/fonts/SUIT-Thin.ttf');
    font-display: swap;
  }

  // 인천 교육체
  @font-face {
    font-family: 'IceSotongRg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/iceSotong-Rg.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  // 솔뫼 김대건체
  @font-face {
    font-family: 'kdg_Medium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/kdg_Medium.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  // 소이체
  @font-face {
    font-family: 'Somi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Somi.woff') format('woff');
    font-weight: 700;
    font-display: swap;
    font-style: normal;
  }

  // 학교안심 붓펜
  @font-face {
    font-family: 'HakgyoansimButpenB';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimButpenB.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
   .MuiTooltip-popper {
     z-index: 0 !important;
   }
   body {
     -webkit-user-select:none;
     -moz-user-select:none;
     -ms-user-select:none;
     user-select:none
   }
   img {
      user-drag: none;
   }
`;

export default GlobalStyled;
