import { ReactNode, ButtonHTMLAttributes } from 'react'

export interface Cache {
  [key: string]: any;
}

export interface TitleProps {
  children: ReactNode;
}

export interface LogoProps {
  size?: 'small' | 'normal' | 'large' | 'xlarge' | '2xlarge';
  className?: string
  href?: string;
  as?: string;
  [x: string]: any;
}

export interface UIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant: 'red' | 'black' | 'blue',
  glow?: boolean,
  fullWidth?: boolean,
  href?: string,
  as?: string,
  [x: string]: any
}