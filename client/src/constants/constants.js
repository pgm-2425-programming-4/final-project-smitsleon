export const API_URL = import.meta.env.PROD
  ? "https://final-project-smitsleon.onrender.com/api"
  : "http://localhost:1337/api";

export const API_TOKEN = import.meta.env.PROD
  ? "d583de3f53f91b78ac817a06c92613d763e6f0acb3d5cc1372062f45ab3922ca65b5837218d187da5bc564184f91f4e5546a7684e1ee29c38c6e1cf9e1490aecb061e732345639bc0468a5ceda8ebd3fed875c11eebaffb4c368c921e3c53f043cc56a6bda48d657a3fa1cc9e16550889a07d89088239c93858f135756638431"
  : "7d1f8b233fc3099857f759d8d2af7ac18bd89c36112be0d0e04dd99f8df0b71c8f2e54b55f1f4c36d72f1a0c5678f5d786018cdd716db04f61acf7cb2a5affa36b05a92809a2686cd132ffeee324de86a6c7154c3fe9680f03f9bb1ae32432fa780783f3094d7221c0d39bf7fc1d0eae3b7385f5e1673dd0f65c17f165b5535b";

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
