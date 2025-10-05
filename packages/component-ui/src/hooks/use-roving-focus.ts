import { useCallback, useState } from 'react';

export type UseRovingFocusProps = {
  values: string[];
  defaultFocusedValue?: string;
  isDisabled?: boolean;
};

export type UseRovingFocusReturn = {
  focusedValue: string | null;
  handleFocusChange: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  handleBlur: () => void;
  setFocusedValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useRovingFocus = ({
  values,
  defaultFocusedValue,
  isDisabled = false,
}: UseRovingFocusProps): UseRovingFocusReturn => {
  const [focusedValue, setFocusedValue] = useState<string | null>(
    typeof defaultFocusedValue === 'undefined' ? null : defaultFocusedValue,
  );

  // フォーカス管理
  const handleFocusChange = useCallback((newValue: string) => {
    setFocusedValue(newValue);
  }, []);

  // フォーカスが外れた時の処理
  const handleBlur = useCallback(() => {
    setFocusedValue(null);
  }, []);

  // キーボードナビゲーション
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isDisabled === true || values.length === 0) return;

      const currentIndex = focusedValue !== null && focusedValue !== '' ? values.indexOf(focusedValue) : -1;
      let newIndex: number;
      let targetValue: string | undefined;

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : values.length - 1;
          targetValue = values[newIndex];
          if (typeof targetValue !== 'undefined' && targetValue !== null && targetValue !== '') {
            handleFocusChange(targetValue);
          }
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          newIndex = currentIndex < values.length - 1 ? currentIndex + 1 : 0;
          targetValue = values[newIndex];
          if (typeof targetValue !== 'undefined' && targetValue !== null && targetValue !== '') {
            handleFocusChange(targetValue);
          }
          break;
        case 'Home':
          event.preventDefault();
          targetValue = values[0];
          if (typeof targetValue !== 'undefined' && targetValue !== null && targetValue !== '') {
            handleFocusChange(targetValue);
          }
          break;
        case 'End':
          event.preventDefault();
          targetValue = values[values.length - 1];
          if (typeof targetValue !== 'undefined' && targetValue !== null && targetValue !== '') {
            handleFocusChange(targetValue);
          }
          break;
        default:
          break;
      }
    },
    [focusedValue, values, isDisabled, handleFocusChange],
  );

  return {
    focusedValue,
    handleFocusChange,
    handleKeyDown,
    handleBlur,
    setFocusedValue,
  };
};
