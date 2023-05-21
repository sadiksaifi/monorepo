interface ImportMetaEnv {
  VITE_EMAILJS_SERVICE_ID: string;
  VITE_EMAILJS_TEMPLATE_ID: string;
  VITE_EMAILJS_USER_ID: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
