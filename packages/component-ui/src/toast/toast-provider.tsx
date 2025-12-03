import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './toast';
import type { ToastState } from './type';

type AddToastArgs = {
  /** 表示する本文 */
  message: string;
  /** 表示ステート */
  state: ToastState;
};

type ToastProviderProps = {
  addToast: (args: AddToastArgs) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastProviderProps>({} as ToastProviderProps);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isClientRender, setIsClientRender] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; state: ToastState }[]>([]);

  const addToast = useCallback(({ message, state }: AddToastArgs) => {
    setToasts((prev) => [...prev, { id: Math.trunc(Math.random() * 100000), message, state }]);
  }, []);

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
          <div className="pointer-events-none fixed bottom-0 left-0 z-toast mb-4 ml-4 flex w-full flex-col-reverse gap-[16px]">
            {toasts.map(({ id, message, state }) => (
              <Toast key={id} state={state} isAutoClose isAnimation onClickClose={() => removeToast(id)} width={475}>
                {message}
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
