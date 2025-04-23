/* eslint-disable no-undef */
import { TextEncoder, TextDecoder } from "text-encoding";
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

// jest.setup.js
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
