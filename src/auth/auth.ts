export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};
