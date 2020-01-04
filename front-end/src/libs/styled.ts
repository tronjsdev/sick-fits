import styledEmotion, { CreateStyled } from '@emotion/styled'

export interface Theme {
  red: string;
  black: string;
  grey: string;
  lightgrey: string;
  offWhite: string;
  maxWidth: string;
  bs: string;
}


export const styled = styledEmotion as CreateStyled<Theme>;

