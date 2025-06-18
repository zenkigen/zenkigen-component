import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Snackbar } from './snackbar';
import type { SnackbarState } from './type';

type AddSnackbarArgs = { message: string; state: SnackbarState };

type SnackbarProviderProps = {
  addSnackbar: (args: AddSnackbarArgs) => void;
  removeSnackbar: (id: number) => void;
};

const SnackbarContext = createContext<SnackbarProviderProps>({} as SnackbarProviderProps);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [isClientRender, setIsClientRender] = useState(false);
  const [snackbars, setSnackbars] = useState<{ id: number; message: string; state: SnackbarState }[]>([]);

  const addSnackbar = useCallback(({ message, state }: AddSnackbarArgs) => {
    setSnackbars((prev) => [...prev, { id: Math.trunc(Math.random() * 100000), message, state }]);
  }, []);

  const removeSnackbar = useCallback((id: number) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  useEffect(() => {
    setIsClientRender(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ addSnackbar, removeSnackbar }}>
      {children}
      {isClientRender &&
        createPortal(
          <div className="z-snackbar pointer-events-none fixed bottom-0 left-0 mb-4 ml-4 flex w-full flex-col-reverse gap-[16px]">
            {snackbars.map(({ id, message, state }) => (
              <Snackbar
                key={id}
                state={state}
                isAutoClose
                isAnimation
                onClickClose={() => removeSnackbar(id)}
                width={475}
              >
                {message}
              </Snackbar>
            ))}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
