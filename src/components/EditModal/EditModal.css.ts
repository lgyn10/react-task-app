import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 1000,
});

export const modalBackdropWrapper = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '800px',
  height: 'max-content',
  maxHeight: '500px',
  overflowY: 'auto',
  zIndex: 10,
  borderRadius: 14,
  boxShadow: vars.shadow.basic,
});

export const modalBackdrop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(3px)', // 블러 효과 적용
  zIndex: -1, // 모달창 뒤에 위치하도록 설정
});

export const modalWindow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '800px',
  height: 'max-content',
  maxHeight: '500px',
  overflowY: 'auto',
  backgroundColor: vars.color.mainDarker,
  position: 'relative', // 부모 요소의 블러 필터 영향을 받지 않도록 설정
  opacity: 0.85,
  zIndex: 10,
  borderRadius: 14,
  padding: 20,
  boxShadow: vars.shadow.basic,
  color: vars.color.brightText,
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '40px',
});

export const closeButton = style({
  fontSize: vars.fontSizing.T2,
  cursor: 'pointer',
  marginLeft: 5,
  transition: '0.2s',
  ':hover': {
    opacity: 0.8,
    scale: 1.2,
    transition: '0.2s',
  },
});

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: 'auto',
  marginBottom: vars.spacing.medium,
});

export const buttons = style({
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: 50,
});

export const updateButton = style({
  border: 'none',
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.updateButton,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

export const deleteButton = style({
  border: 'none',
  borderRadius: 5,
  fontSize: vars.fontSizing.T4,
  padding: vars.spacing.big2,
  marginRight: vars.spacing.big1,
  backgroundColor: vars.color.deleteButton,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8,
  },
});

export const input = style({
  width: '100%',
  minHeight: '30px',
  border: 'none',
  borderRadius: 5,
  marginBottom: vars.spacing.big2,
  padding: vars.spacing.medium,
  fontSize: vars.fontSizing.T4,
  boxShadow: vars.shadow.basic,
});
