import type { PropsWithChildren } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { createPortal } from 'react-dom';

import type { SelectOption } from '../select';
import { Form } from './Form/form';

type State = {
  count: number;
  list: ItemState[];
};

type ViewTransitionProviderProps = {
  state: State;
  dispatch: React.Dispatch<ViewTransitionReducerAction>;
};

const ViewTransitionContext = createContext<ViewTransitionProviderProps>({} as ViewTransitionProviderProps);

type ItemState = {
  value?: string;
  valueLabel?: string;
  option?: SelectOption;
};

const initState: State = {
  count: 0,
  list: [],
};

type ValueItem = {
  index: number;
  value: string;
};

type OptionItem = {
  index: number;
  value: SelectOption;
};

export type ViewTransitionReducerAction =
  | {
      type: 'Reset';
      payload: State;
    }
  | {
      type: 'UpdateCount';
      payload: number;
    }
  | {
      type: 'UpdateValue';
      payload: ValueItem;
    }
  | {
      type: 'UpdateOption';
      payload: OptionItem;
    };

function reducer(state: State, action: ViewTransitionReducerAction) {
  switch (action.type) {
    case 'Reset': {
      return { ...action.payload };
    }
    case 'UpdateValue': {
      const item = state.list[action.payload.index];
      if (item) item.value = action.payload.value;

      return { ...state };
    }
    case 'UpdateOption': {
      const item = state.list[action.payload.index];
      if (item) item.option = action.payload.value;

      return { ...state };
    }
    default:
      return { ...state };
      break;
  }
  // ...
}

type Props = {
  //
};

export const ViewTransitionProvider = ({ children }: PropsWithChildren<Props>) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <ViewTransitionContext.Provider value={{ state, dispatch }}>
      {children}
      {state.list.length !== 0 &&
        createPortal(
          <div className="z-Transition fixed right-0 top-[0] mb-4 ml-4 flex w-[400px] flex-col p-10">
            {state.list.length !== 0 &&
              state.list.map((item, i) => {
                return (
                  <>
                    <div key={i.toString()}>
                      <Form
                        valueLabel={item.valueLabel}
                        value={item.value}
                        option={item.option}
                        onChangeValue={(value) => {
                          dispatch({ type: 'UpdateValue', payload: { value: value, index: i } });
                        }}
                        onChangeSelectOption={(option) => {
                          dispatch({ type: 'UpdateOption', payload: { value: option, index: i } });
                        }}
                      />
                    </div>
                  </>
                );
              })}
          </div>,
          document.body,
        )}
    </ViewTransitionContext.Provider>
  );
};

export const useViewTransition = () => {
  return useContext(ViewTransitionContext);
};
