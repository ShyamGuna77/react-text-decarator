import { ReactNode, CSSProperties } from "react";

export interface RoughAnnotation {
  isShowing: boolean;
  show: () => void;
  hide: () => void;
  getAnnotation: () => {
    animationDuration: number;
  };
}

export type Notationtype =
  | "underline"
  | "box"
  | "circle"
  | "highlight"
  | "strike-through"
  | "crossed-off"
  | "bracket";

export type BracketPosition = "left" | "right" | "top" | "bottom";

export interface TextDecoratorProps {
  children: ReactNode;
  type?: Notationtype;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  childrenProps?: any;
  show?: boolean;
  iterations?: number;
  animationDuration?: number;
  animationDelay?: number;
  padding?: number;
  multiline?: boolean;
  brackets?: BracketPosition | BracketPosition[];
  order?: number;
  hover?: boolean;
  className?: string;
  id?: string;
  [key: `data-${string}`]: string | undefined;
}

export interface TextDecoratorGroupProps {
  children: ReactNode;
  show?: boolean;
}

export interface UseTextDecoratorReturn {
  ref: React.RefObject<HTMLElement | null>;
  show: () => void;
  hide: () => void;
}

export interface UseTextDecoratorprops {
  type: Notationtype;
  show?: boolean;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  childrenProps?: any;
  iterations?: number;
  animationDuration?: number;
  animationDelay?: number;
  padding?: number;
  multiline?: boolean;
  brackets?: BracketPosition | BracketPosition[];
  order?: number;
  hover?: boolean;
  className?: string;
  id?: string;
  [key: `data-${string}`]: string | undefined;
}
