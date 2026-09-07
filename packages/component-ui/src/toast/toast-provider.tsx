import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './toast';
import type { ToastState } from './type';

type AddToastArgs = {
  /** タイトルとして表示する本文 */
  message: string;
  /** 表示ステート */
  state: ToastState;
  /** タイトルの下に表示する補足テキスト */
  description?: ReactNode;
  /** 閉じるボタンを表示するかどうか。ToastProvider の既定値を上書きする */
  hasCloseButton?: boolean;
  /** 5 秒後に自動で閉じるかどうか。既定は true */
  isAutoClose?: boolean;
};

type ToastContextValue = {
  addToast: (args: AddToastArgs) => void;
  removeToast: (id: number) => void;
};

type ToastProviderProps = PropsWithChildren<{
  /** このプロバイダー配下で追加されるトーストの、閉じるボタン表示の既定値 */
  hasCloseButton?: boolean;
}>;

type ToastItem = {
  id: number;
  message: string;
  state: ToastState;
  description?: ReactNode;
  hasCloseButton: boolean;
  isAutoClose: boolean;
};

const ToastContext = createContext<ToastContextValue>({} as ToastContextValue);

export const ToastProvider = ({ children, hasCloseButton = false }: ToastProviderProps) => {
  const [isClientRender, setIsClientRender] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // 乱数だと衝突時に key の重複と removeToast での一括削除が起こるため、単調増加カウンタで採番する
  const nextIdRef = useRef(0);

  const addToast = useCallback(
    (args: AddToastArgs) => {
      nextIdRef.current += 1;

      const id = nextIdRef.current;

      setToasts((prev) => [
        ...prev,
        {
          id,
          message: args.message,
          state: args.state,
          description: args.description,
          hasCloseButton: args.hasCloseButton ?? hasCloseButton,
          isAutoClose: args.isAutoClose ?? true,
        },
      ]);
    },
    [hasCloseButton],
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  useEffect(() => {
    setIsClientRender(true);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {isClientRender &&
        createPortal(
          <div
            role="region"
            aria-label="通知"
            className="pointer-events-none fixed bottom-0 left-0 z-toast mb-4 ml-4 flex w-full flex-col-reverse gap-4"
          >
            {/*
              live region はトーストごとのラッパーに置き、error は role="alert"（assertive 相当）で即時に、
              それ以外は role="status"（polite 相当）で読み上げる。要素の挿入と同時に内容が告知される
              role を使うことで、politeness の異なる通知を 1 つの視覚スタックに時系列のまま混在できる
            */}
            {toasts.map((toast) => (
              <div key={toast.id} role={toast.state === 'error' ? 'alert' : 'status'}>
                <Toast
                  state={toast.state}
                  description={toast.description}
                  hasCloseButton={toast.hasCloseButton}
                  isAutoClose={toast.isAutoClose}
                  isAnimation
                  width={475}
                  onClickClose={() => removeToast(toast.id)}
                >
                  {toast.message}
                </Toast>
              </div>
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
