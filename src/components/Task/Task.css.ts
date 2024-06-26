import { style } from '@vanilla-extract/css';
import { vars } from '../../App.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: vars.spacing.medium,
  backgroundColor: vars.color.task,
  borderRadius: 10,
  marginBottom: vars.spacing.big2,
  boxShadow: vars.shadow.basic,
  cursor: 'pointer',
  transition: '0.2s',
  ':hover': {
    backgroundColor: vars.color.taskHover,
    transition: '0.2s',
    transform: 'scale(1.03)',
  },
});

export const title = style({
  fontSize: vars.fontSizing.T4,
  fontWeight: 'bold',
  marginBottom: vars.spacing.small,
});

export const description = style({
  fontSize: vars.fontSizing.P1,
});
