import { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';

import { createPortal } from 'react-dom';

import { Toast } from './toast';
import { ToastState } from './type';

type AddToastArgs = { message: string; state: ToastState };

type ToastProviderProps = {
  addToast: (args: AddToastArgs) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastProviderProps>({} as ToastProviderProps);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<{ id: number; message: string; state: ToastState }[]>([]);

  const addToast = useCallback(({ message, state }: AddToastArgs) => {
    setToasts((prev) => [...prev, { id: Date.now(), message, state }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-0 left-0 z-toast mb-4 ml-4 flex w-full flex-col-reverse">
          {toasts.map(({ id, message, state }) => (
            <Toast key={id} state={state} autoClose onClickClose={() => removeToast(id)} width={475}>
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
