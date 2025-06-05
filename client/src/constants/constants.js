export const API_URL = import.meta.env.PROD
  ? "https://final-project-smitsleon.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "feb93eaffffe6234a08efc0e6bfb3565baed2cfd4b8068ba9d5558c91d2fc27fda5aa4a54ddda521096c339a6d90c4e444d8a9c814518af1fd69984c0da4004294d5f6e58a1ed60ce878d163dca8288ea5f21a2b049541d75e9dc492eb09ad5bf98b73f41275a2aba18a03a46af1f1667f2a15614d062c4b0e1ff2a571e6e130"
  : "7d1f8b233fc3099857f759d8d2af7ac18bd89c36112be0d0e04dd99f8df0b71c8f2e54b55f1f4c36d72f1a0c5678f5d786018cdd716db04f61acf7cb2a5affa36b05a92809a2686cd132ffeee324de86a6c7154c3fe9680f03f9bb1ae32432fa780783f3094d7221c0d39bf7fc1d0eae3b7385f5e1673dd0f65c17f165b5535b";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];