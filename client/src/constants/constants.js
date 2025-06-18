export const API_URL = import.meta.env.PROD
  ? "https://final-project-smitsleon.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "3686fffd20ef82b47dc035a55d1e3361f382a543e09fba9d6afdebaf2a0be3af21f79a8433fa43ffcd9024542e07fb530a44129f05b2216d0e1634022e6314a8dc07a9d9124c412ead90a80af9500595e87c27c928c14416fa34a11a1a1927232ae51f38db49a332958f1af7f82f3a7d46f1dd2ad38de99d749374f2a689ecec"
  : "7d1f8b233fc3099857f759d8d2af7ac18bd89c36112be0d0e04dd99f8df0b71c8f2e54b55f1f4c36d72f1a0c5678f5d786018cdd716db04f61acf7cb2a5affa36b05a92809a2686cd132ffeee324de86a6c7154c3fe9680f03f9bb1ae32432fa780783f3094d7221c0d39bf7fc1d0eae3b7385f5e1673dd0f65c17f165b5535b";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
