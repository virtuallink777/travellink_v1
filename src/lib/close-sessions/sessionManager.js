export const setSession = () => {
  localStorage.setItem("session", "active");
};

export const clearSession = () => {
  localStorage.removeItem("session");
};

export const isSessionActive = () => {
  return localStorage.getItem("session") === "active";
};
