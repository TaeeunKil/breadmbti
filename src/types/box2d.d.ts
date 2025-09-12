// Box2D WebAssembly 타입 정의
declare module "box2d-wasm" {
  const Box2D: any;
  export default function (): Promise<any>;
}

declare global {
  interface Window {
    Box2D: any;
  }
}

export {};
