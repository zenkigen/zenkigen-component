import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
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

  const addToast = useCallback(
    (args: AddToastArgs) => {
      setToasts((prev) => [
        ...prev,
        {
          id: Math.trunc(Math.random() * 100000),
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
            role="status"
            aria-live="polite"
            aria-atomic="false"
            className="pointer-events-none fixed bottom-0 left-0 z-toast mb-4 ml-4 flex w-full flex-col-reverse gap-4"
          >
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
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
