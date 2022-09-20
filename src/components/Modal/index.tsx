import * as React from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  Variant,
} from "framer-motion";
import styled from "styled-components";
import classNames from "classnames";
import Button from "../Button";
import { useClickAway } from "ahooks";
import IconClose from "../Icons/IconClose";

type MotionVariants<T extends string> = Record<T, Variant>;

type FadeMotionVariant = MotionVariants<"enter" | "exit">;

const tuple = <T extends string[]>(...args: T) => args;

const easings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

const fadeVariants: FadeMotionVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: easings.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: easings.easeIn,
    },
  },
};

const fadeConfig: HTMLMotionProps<any> = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: fadeVariants,
};

const PortalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 666;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  transition: all linear 0.2s;
  /* background: rgba(58, 58, 58, 0.3); */
  /* 产品的意思是：用户要能看清蒙层下的字，不能太模糊 */
  /* backdrop-filter: blur(6px); */
  > .inner {
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-sizing: border-box;
    /* padding: 0 0 24px 0; */
    /* padding-bottom: 24px; */
    padding: 48px 48px 72px;
    max-width: 624px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* width: 436px; */
    overflow: hidden;
    background: linear-gradient(
      147.98deg,
      rgba(33, 33, 38, 0.776) 0.92%,
      rgba(33, 33, 38, 0.52) 46.51%,
      rgba(3, 29, 25, 0.52) 80.49%
    );
    backdrop-filter: blur(20px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 48px;

    &.middle {
      width: 440px;
    }
    .row-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .row-start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .row-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .header {
      display: flex;
      align-items: center;
      font-weight: 600;
      h4 {
        flex: 1;
        i {
          margin-right: 2px;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          transition: all 0.3s ease-in-out;
          transform: rotateZ(180deg);
        }
        span {
          font-weight: 400;
          font-size: 22px;
          line-height: 32px;
          color: #ffffff;
          font-family: "Dela Gothic One";
        }
      }
      .back {
        cursor: pointer;
        user-select: none;
      }
      .close {
        position: absolute;
        right: 50px;
        cursor: pointer;
        user-select: none;
        i {
          font-size: 20px;
          color: #ffffff;
          transition: all 0.3s ease-in-out;
        }
        &:hover {
          i {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
    .content {
      &::-webkit-scrollbar{
        background-color: transparent;
        width: 9px;
        height: 9px;
        transition: all linear .1s;
      }
      &::-webkit-scrollbar-corner{
        background-color: transparent; 
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 30px;
      }

      .ms-container {
        max-height: 80vh;
      }
    }
    .footer {
      padding: 0 24px;
      height: 80px;
      > button {
        width: max-content;
        min-width: 74px;
      }
      > button + button {
        margin-left: 8px;
      }
      &.error {
        button:last-child {
          background: rgba(255, 77, 79, 1);
          &:hover {
            background: rgba(255, 77, 79, 0.8);
          }
        }
      }
    }
  }
`;

const ModalTypes = tuple("info", "success", "error", "warning", "confirm");
type SizeTypes = "default" | "middle";

export type ModalType = typeof ModalTypes[number];

export interface ModalProps {
  className?: string;
  visible?: boolean;
  away?: boolean; // 点击事件
  type?: ModalType;
  onBack?: (...args: any[]) => any;
  title?: React.ReactNode;
  closable?: boolean;
  onClose?: (...args: any[]) => any;
  cancel?: React.ReactNode;
  onCancel?: (...args: any[]) => any;
  ok?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  children?: React.ReactNode;
  size?: SizeTypes;
  footer?: React.ReactNode;
}

const Portal: React.FC<ModalProps> = (props: ModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    away = false,
    type = "info",
    onBack,
    title,
    closable = true,
    onClose,
    cancel,
    onCancel,
    ok,
    onOk,
    children,
    className,
    size,
    footer,
    ...rest
  } = props;

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  const renderHeader = (
    <div className="header row-between">
      <h4
        className={`row-center ${onBack ? "back" : ""}`.trimEnd()}
        onClick={() => {
          onBack?.();
        }}
      >
        {onBack && (
          <i
            className="iconfont icon-arrow_right"
            style={{ marginLeft: "-6px" }}
          />
        )}
        <span>{title}</span>
      </h4>
      <div className="close" onClick={(e) => onClose?.(e)}>
        <IconClose width={24} height={24} />
      </div>
    </div>
  );

  const renderFooter = (
    <div className={`footer row-end ${type}`.trimEnd()}>
      {onCancel && (
        <Button className="btn-cancel" type="default" onClick={handleCancel}>
          {cancel}
        </Button>
      )}
      {onOk && (
        <Button className="btn-ok" {...rest} onClick={handleOk}>
          {ok}
        </Button>
      )}
    </div>
  );

  const ref = React.useRef(null);

  useClickAway(() => {
    onClose && onClose();
  }, ref.current);

  return createPortal(
    <PortalWrapper
      className={className}
      {...fadeConfig}
      onClick={(e) => {
        if (away) return;
        e.stopPropagation();
      }}
    >
      <div ref={ref} className={classNames("inner", size)}>
        {(onBack || title || closable) && renderHeader}
        <div className="content scrollbar">
          <>{children}</>
        </div>
        {cancel || ok ? renderFooter : footer}
      </div>
    </PortalWrapper>,
    document.body
  );
};

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { visible = false } = props;

  return <AnimatePresence>{visible && <Portal {...props} />}</AnimatePresence>;
};

export default Modal;
