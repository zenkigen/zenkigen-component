import { FloatingFocusManager, useFloating } from '@floating-ui/react';
import type { CSSProperties, MutableRefObject, PropsWithChildren } from 'react';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import { MODAL_OPEN_EVENT } from '../hooks/use-dismiss-on-modal-open';
import { TOP_LAYER_ATTRIBUTE } from '../utils';
import { BodyScrollLock } from './body-scroll-lock';
import { ModalBody } from './modal-body';
import { ModalContext } from './modal-context';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

const LIMIT_WIDTH = 320;
const LIMIT_HEIGHT = 184;

/**
 * Modal 表示中も inert / aria-hidden の対象から外す要素を返す（FloatingFocusManager の getInsideElements 用）。
 * Modal を開いた瞬間に一度だけ評価される。
 *
 * - `[data-floating-ui-portal]`: Popover / DatePicker / Combobox は閉じていても FloatingPortal の器を
 *   body 直下に作る。Modal より先に存在するため、除外しないと Modal 内で後から開いたときに
 *   中身が inert 配下に入って操作できなくなる。
 *   属性名は floating-ui の内部規約（createAttribute('portal')）なので、ライブラリ更新時は要確認。
 * - `TOP_LAYER_ATTRIBUTE`: Toast など、Modal より前面に出る設計の要素。inert にすると操作できなくなる。
 *
 * body / html が除外対象に入ると floating-ui の走査がそこで止まり、何も inert にならず
 * トラップが丸ごと無効化されるため、防御的に弾く。
 */
const getInsideElements = () =>
  Array.from(document.querySelectorAll(`[data-floating-ui-portal],[${TOP_LAYER_ATTRIBUTE}]`)).filter(
    (element) => element !== document.body && element !== document.documentElement,
  );

type Props = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  maxWidth?: CSSProperties['maxWidth'];
  isOpen: boolean;
  onClose?: () => void;
  portalTargetRef?: MutableRefObject<HTMLElement | null>;
};

export function Modal({
  children,
  width = 480,
  height,
  maxWidth = 'calc(100vw - 40px)',
  isOpen,
  onClose,
  portalTargetRef,
}: PropsWithChildren<Props>) {
  const [isMounted, setIsMounted] = useState(false);

  // Modal.Header の内容をダイアログのアクセシブルネームにする。Header がない場合は aria-labelledby を付けない
  const titleId = useId();
  const [hasTitle, setHasTitle] = useState(false);

  // FloatingFocusManager は context に useFloating の戻り値を要求する。
  // Modal は位置計算をしないため reference・placement・middleware は指定しない
  // （reference がないので computePosition は走らず、floatingStyles も使わない）。
  const { refs, context } = useFloating({ open: isOpen });

  const renderWidth = typeof width === 'number' ? Math.max(width, LIMIT_WIDTH) : width;
  const renderHeight = typeof height === 'number' ? Math.max(height, LIMIT_HEIGHT) : height;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Modal が表示された瞬間に、外側で開いている floating UI（Select / Dropdown / Popover 等）を閉じるためのイベント発行。
  // `isOpen` が false → true の遷移時だけでなく、初回マウント時に isOpen=true で渡された場合や、
  // Modal を unmount → 再 mount した場合の表示時にも発火する。
  // いずれも「Modal が新たに前面へ出てきた瞬間」なので、背景の floating UI を閉じる対象として正しい挙動。
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent(MODAL_OPEN_EVENT));
    }
  }, [isOpen]);

  return isMounted && isOpen ? (
    <>
      <BodyScrollLock />
      {createPortal(
        <ModalContext.Provider value={{ onClose, titleId, setHasTitle }}>
          {/*
            フォーカストラップ。Tab / Shift+Tab を Modal 内でループさせ、閉じたら開く直前にフォーカスがあった
            要素へ戻す（既定値の挙動）。
            Escape / 背景クリックで閉じる機能は意図的に持たせていない（useDismiss を使わない）。
            利用側には Esc で閉じてはいけないモーダルがあり、デフォルトで有効にすると破壊的変更になるため。

            initialFocus: 開いたときのフォーカス先をダイアログ本体にする（既定は先頭の tabbable = ヘッダーの
            閉じるボタンで、キーボード操作や自動撮影ではそこにフォーカスリングが出てしまう）。本体にフォーカスが
            あれば支援技術はダイアログとして（Header があればそのタイトルを）読み上げ、Tab 1 回で先頭の tabbable へ進める。

            outsideElementsInert: 背面を inert にする。既定の aria-hidden はタブ順から要素を外さないため、
            フォーカスが focus guard の外（body 直下のポータル内や body 自身）へ出ると Tab + Enter で
            背面が操作できてしまう。inert 非対応ブラウザ・jsdom では自動的に aria-hidden へフォールバックする。
          */}
          <FloatingFocusManager
            context={context}
            initialFocus={refs.floating}
            outsideElementsInert
            getInsideElements={getInsideElements}
          >
            <div className="fixed left-0 top-0 z-overlay flex size-full items-center justify-center bg-backgroundOverlayBlack py-4">
              {/*
                role="dialog" は FloatingFocusManager が tabindex を自動付与する前提条件なので変更しない。
                outline-none: 本体は開いた瞬間にフォーカスを受けるが、操作対象ではないためフォーカスリングは出さない。
              */}
              <div
                ref={refs.setFloating}
                role="dialog"
                aria-modal="true"
                {...(hasTitle && { 'aria-labelledby': titleId })}
                className="grid max-h-full min-h-[120px] grid-rows-[max-content_1fr_max-content] flex-col rounded-lg bg-uiBackground01 shadow-modalShadow outline-none"
                style={{ width: renderWidth, height: renderHeight, maxWidth }}
              >
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </ModalContext.Provider>,
        portalTargetRef?.current != null ? portalTargetRef.current : document.body,
      )}
    </>
  ) : null;
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
