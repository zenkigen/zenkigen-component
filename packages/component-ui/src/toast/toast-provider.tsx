import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './toast';
import type { ToastState } from './type';

type AddToastArgs = { message: string; state: ToastState; closeTimeMsec?: number };

type ToastProviderProps = {
  addToast: (args: AddToastArgs) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastProviderProps>({} as ToastProviderProps);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isClientRender, setIsClientRender] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; state: ToastState; closeTimeMsec?: number }[]>(
    [],
  );

  const addToast = useCallback(({ message, state, closeTimeMsec }: AddToastArgs) => {
    setToasts((prev) => [...prev, { id: Math.trunc(Math.random() * 100000), message, state, closeTimeMsec }]);
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
            {toasts.map(({ id, message, state, closeTimeMsec }) => (
              <Toast
                key={id}
                state={state}
                closeTimeMsec={closeTimeMsec}
                isAutoClose
                isAnimation
                onClickClose={() => removeToast(id)}
                width={475}
              >
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
