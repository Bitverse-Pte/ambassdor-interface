import * as React from "react";
import classNames from "classnames";
import styled, { keyframes } from "styled-components";
import Loading from "../Loading";

export const tuple = <T extends string[]>(...args: T) => args;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.button<{ radius?: number | string }>`
  /* 清除默认样式 */
  margin: 0px;
  padding: 0px;
  border: none;
  border-radius: 0px;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  font-family: 'Poppins';
  &:focus {
    outline: none;
  }
  /* global */
  min-width: 126px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  span {
    display: inline-block;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
  }
  /* base */
  /* 存在多种状态default */
  &.default {
    background: #00ebc8;
    span {
      color: rgba(255, 255, 255, 0.3628);
    }
    &:not(.disabled, .loading):hover {
      background: rgba(0, 235, 200, 0.6);
      span {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  &.primary {
    background: #00ebc8;
    span {
      color: #1b1502;
    }
    &:not(.disabled, .loading):hover {
      background: rgba(0, 235, 200, 0.8);
      span {
        color: rgba(27, 21, 2, 0.8);
      }
    }
  }
  &.solid {
    border: 1px solid #00ebc8;
    span {
      color: #00ebc8;
    }
    &:not(.disabled, .loading):hover {
      border: 1px solid rgba(0, 235, 200, 0.8);
      span {
        color: rgba(0, 235, 200, 0.8);
      }
    }
  }
  &.cancel {
    background: #3D454D;
    color: #F8F7FA;
  }
  &.text {
    background: transparent;
    span {
      color: #000;
    }
  }
  &.disabled {
    cursor: not-allowed;
    border: 1px solid rgba(255, 255, 255, 0.0605);
    background: #C4C4C4;
    color: #9B9191;
  }
  &.loading {
    cursor: not-allowed;
    i {
      margin-right: 6px;
      display: inline-block;
      font-size: 14px;
      animation: ${rotate} 2s linear infinite;
    }
    & + .primary {
      i {
        color: #1b1502;
      }
    }
    & + .solid {
      i {
        color: #00ebc8;
      }
    }
  }
  &.sm {
    width: 126px;
    height: 28px;
    border-radius: 5px;
      font-weight: 500;
      font-size: 12px;
      line-height: 22px;
  }
  &.md {
    width: 100%;
    height: 44px;
    border-radius: ${({ radius }) => radius || "6px"};
    /* font-weight: 600; */
    /* font-size: 14px; */

    font-weight: 400;
    font-size: 24px;
    line-height: 24px;

    .loader{
      height: 44px;
    }
  }
  &.lg {
    width: 100%;
    border-radius: ${({ radius }) => radius || "6px"};
      line-height: 68px;
      font-weight: 600;
      font-size: 18px;
  }

  .loader{
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      height: 100%;
    }
  }
`;

const ButtonTypes = tuple(
  "default",
  "primary",
  "ghost",
  "solid",
  "link",
  "text",
  "cancel"
);
export type ButtonType = typeof ButtonTypes[number];
export type SizeType = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  className?: string;
  type?: ButtonType;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  radius?: number | string;
}

const Button: React.FC<ButtonProps> = React.forwardRef(
  (props: ButtonProps, ref) => {
    const {
      className,
      type = "primary",
      size = "md",
      disabled,
      loading,
      children,
      radius,
      ...rest
    } = props;

    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
    const buttonRef = (ref as any) || React.createRef<HTMLElement>();
    // https://stackoverflow.com/questions/58051345/react-hook-useref-not-working-with-styled-components-and-typescript
    // const buttonRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;

    React.useEffect(() => {
      if (!buttonRef || !buttonRef.current) {
        return;
      }
    }, [buttonRef]);

    const classes = classNames(className, {
      [`${type}`]: type,
      [`${size}`]: size,
      disabled: disabled,
      loading: loading,
    });

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      const { onClick, disabled } = props;

      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)?.(e);
    };

    return (
      <Wrapper
        {...rest}
        ref={buttonRef}
        className={`${classes} ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        radius={radius}
      >
        {loading && <Loading/>}
        {!loading && children && <>{children}</>}
      </Wrapper>
    );
  }
);

export default Button;
