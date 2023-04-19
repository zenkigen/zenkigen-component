import type { Config } from 'tailwindcss';

type TailwindConfig = Omit<Config, 'content'>;
const createTailwindConfig = () => {
  return {
    theme: {
      extend: {},
    },
    plugins: [],
  };
};

export const config: TailwindConfig = createTailwindConfig();
