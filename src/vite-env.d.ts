/// <reference types="vite/client" />

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'motion/react' {
  export * from 'framer-motion';
}
