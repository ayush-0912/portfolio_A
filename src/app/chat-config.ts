import { isDevMode } from '@angular/core';

// ng serve (dev) talks to your local backend; the built site talks to the deployed one.
export const CHAT_API = isDevMode()
  ? 'http://127.0.0.1:8000'
  : 'https://portfolio-a-4h94.onrender.com'; // replace after you deploy the backend