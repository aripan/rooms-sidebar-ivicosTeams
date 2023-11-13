import {
  getTheme,
  IStyle,
  mergeStyles,
  Stack,
  TooltipHost,
} from "@fluentui/react";
import { SharedColors } from "@fluentui/theme/lib/colors/FluentColors";

import React, { CSSProperties, ReactElement } from "react";
import { getTextColorForBackground } from "./colorKit";

export type ISVGIconVariant =
  | "light"
  | "dark"
  | "red"
  | "primary"
  | "green"
  | "dim"
  | "magenta"
  | "contrast"
  | "custom"
  | "deactivated";

export const getSVGIconStyles = (
  variant: ISVGIconVariant,
  hoverable?: boolean,
  customIconColor?: string
): any => {
  const theme = getTheme();
  const fillByVariant = {
    light: theme.palette.white,
    dark: theme.palette.black,
    red: theme.palette.red,
    primary: theme.palette.themePrimary,
    dim: theme.palette.neutralLighter,
    magenta: "#e20074",
    green: SharedColors.greenCyan10,
    contrast: getTextColorForBackground(theme.palette.themePrimary),
    deactivated: theme.palette.neutralLight,
  };

  const iconStyle: IStyle = {
    " svg *": {
      fill: variant != "custom" ? fillByVariant[variant] : customIconColor,
    },
  };

  const hoverableStyle: IStyle = {
    ":hover svg *": {
      fill: theme.palette.themePrimary,
    },
  };

  return mergeStyles(hoverable ? [iconStyle, hoverableStyle] : iconStyle);
};

export interface ISVGIconProps {
  variant: ISVGIconVariant;
  size?: number;
  spinning?: boolean;
  hoverable?: boolean;
  style?: CSSProperties;
  iconColor?: string;
  inline?: boolean;
  children?: React.ReactNode;
}

const SVGIcon: React.FC<ISVGIconProps> = ({
  variant,
  children,
  size,
  hoverable,
  spinning,
  style,
  iconColor,
  inline,
}) => {
  const svgIconStyles = getSVGIconStyles(variant, hoverable, iconColor);

  if (inline)
    return (
      <span
        className={
          "svg-icon " +
          svgIconStyles +
          (hoverable ? " svg-icon--hoverable" : "") +
          (spinning ? " fg-Spinner" : "")
        }
        style={{ ...style, ...{ fontSize: size, verticalAlign: "middle" } }}
      >
        {children}
      </span>
    );

  return (
    <Stack
      className={
        "svg-icon " +
        svgIconStyles +
        (hoverable ? " svg-icon--hoverable" : "") +
        (spinning ? " fg-Spinner" : "")
      }
      horizontalAlign="center"
      verticalAlign="center"
      style={{ ...style, ...{ fontSize: size } }}
    >
      {children}
    </Stack>
  );
};
export default SVGIcon;

export const IC = SVGIcon;

export interface IICButtonProps {
  size?: number;
  className?: string;
  title?: string;
  variant?: "rect" | "round";
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}
export const ICButton: React.FC<IICButtonProps> = ({
  children,
  className,
  variant,
  size,
  title,
  onClick,
}) => {
  if (!size) size = 32;
  const roundStyle = {
    width: size,
    height: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
    borderRadius: size / 2,
  };
  const rectStyle = {
    width: size,
    height: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
    borderRadius: 4,
  };

  const wrap = (c: ReactElement) => {
    if (title)
      return (
        <TooltipHost content={title} key="host">
          {c}
        </TooltipHost>
      );
    else return c;
  };
  const theme = getTheme();

  const iconButtonStyles = mergeStyles(className, {
    background: theme.palette.themePrimary,
    cursor: "pointer",
    color: getTextColorForBackground(theme.palette.themePrimary),
    ":hover": {
      background: theme.palette.themeDarker,
    },
    ":active": {
      background: theme.palette.themeDark,
    },
  });

  return wrap(
    <Stack
      onClick={onClick}
      className={iconButtonStyles}
      horizontalAlign="center"
      verticalAlign="center"
      style={variant && variant == "rect" ? rectStyle : roundStyle}
    >
      <IC variant="contrast" key="icon" size={20}>
        {children}
      </IC>
    </Stack>
  );
};
