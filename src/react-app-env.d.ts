export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_BASE?: string;
    }
  }

  // (Optional) nếu TS vẫn không nhận process trong một số môi trường:
  const process: { env: NodeJS.ProcessEnv };
}
