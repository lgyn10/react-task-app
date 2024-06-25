import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    main: '#ffa726',
    mainDarker: '#f50c00',
    mainFaded: '#ffb74d',
    mainFadedBright: '#ffb74da6',
  },
});

// 사용법
// vars.color.main
