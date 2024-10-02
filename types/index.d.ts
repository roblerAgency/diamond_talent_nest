// node.JS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PORT: string;
    DB_HOST: string;
    JWT_SECRET: string;
    APP_PORT: string;
    DB_ENGINE: string;
    APP_ROOT: string;
    EMAIL_PASSWORD: string;
    EMAIL_USER: string;
    APP_HOST: string;
    EMAIL_HOST: string;
    EMAIL_PORT: number;
    APP_ROUTE: string;
  }
}
