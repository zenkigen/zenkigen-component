import { FloatingFocusManager, useFloating } from '@floating-ui/react';
import type { CSSProperties, MutableRefObject, PropsWithChildren } from 'react';
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
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

/** Modal の overlay に付与する内部属性。後から（または同時に）開いた別の Modal を inert の対象から外すために使う */
const MODAL_OVERLAY_ATTRIBUTE = 'data-zenkigen-modal-overlay';

/**
 * 「この Modal より後に DOM へ追加された前面側の要素」を選ぶセレクタ（DOM 上の位置で絞ってから使う）。
 * - [data-floating-ui-portal]: Popover / DatePicker / Combobox / Select が FloatingPortal で作る器。Modal の中で使われるものは
 *   Modal の DOM が挿入された後の layout effect で作られるため、必ず Modal より後ろに並ぶ
 * - MODAL_OVERLAY_ATTRIBUTE / [data-floating-ui-focus-guard]: 後から（または同時に）開いた別の Modal の overlay と focus guard
 * data-floating-ui-* は floating-ui の内部規約（createAttribute）なので、ライブラリ更新時は要確認。
 */
const FOLLOWING_INSIDE_SELECTOR = `[data-floating-ui-portal],[${MODAL_OVERLAY_ATTRIBUTE}],[data-floating-ui-focus-guard]`;

const isFollowing = (base: Element, target: Element) =>
  (base.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;

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
  const overlayRef = useRef<HTMLDivElement>(null);

  // Modal.Header の内容をダイアログのアクセシブルネームにする。Header がない場合は aria-labelledby を付けない
  const titleId = useId();
  const [hasTitle, setHasTitle] = useState(false);

  // FloatingFocusManager は context に useFloating の戻り値を要求する。
  // Modal は位置計算をしないため reference・placement・middleware は指定しない
  // （reference がないので computePosition は走らず、floatingStyles も使わない）。
  const { refs, context } = useFloating({ open: isOpen });

  // 開く直前にフォーカスがあった要素。閉じたときの復帰先として FloatingFocusManager に渡す。
  // floating-ui の既定（共有の履歴スタック）は、入れ子の Modal を内側→外側の順に閉じたときに
  // unmount 済みの要素を選んで復帰に失敗するため、Modal ごとに保持する。
  const returnFocusRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    if (isOpen) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
  }, [isOpen]);

  // Modal 表示中も inert / aria-hidden の対象から外す要素。FloatingFocusManager 側で useEffectEvent に包まれ、
  // Modal を開いた瞬間に一度だけ評価される。
  // - TOP_LAYER_ATTRIBUTE: Toast など Modal より前面に出る設計の要素（位置に関係なく除外）
  // - この Modal より DOM 上で後ろにある器・overlay・guard: Modal の中で使う floating UI と、後から／同時に開いた
  //   別の Modal。前にあるもの（背面で開いたままの Popover の器、同時に開いた外側の Modal）は背面として inert にする
  // body / html が除外対象に入ると floating-ui の走査がそこで止まり、トラップが丸ごと無効化されるため防御的に弾く。
  const getInsideElements = () => {
    const overlay = overlayRef.current;
    const topLayers = Array.from(document.querySelectorAll(`[${TOP_LAYER_ATTRIBUTE}]`));
    const following =
      overlay == null
        ? []
        : Array.from(document.querySelectorAll(FOLLOWING_INSIDE_SELECTOR)).filter((element) =>
            isFollowing(overlay, element),
          );

    return [...topLayers, ...following].filter(
      (element) => element !== document.body && element !== document.documentElement,
    );
  };

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
            要素（returnFocusRef）へ戻す。
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
            returnFocus={returnFocusRef}
            outsideElementsInert
            getInsideElements={getInsideElements}
          >
            <div
              ref={overlayRef}
              {...{ [MODAL_OVERLAY_ATTRIBUTE]: '' }}
              className="fixed left-0 top-0 z-overlay flex size-full items-center justify-center bg-backgroundOverlayBlack py-4"
            >
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
