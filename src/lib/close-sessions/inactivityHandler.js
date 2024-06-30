let inactivityTimeout;

export const resetInactivityTimeout = (logoutCallback) => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    logoutCallback();
  }, 10 * 60 * 1000);
};

export const startInactivityTimer = (logoutCallback) => {
  window.addEventListener("mousemove", () =>
    resetInactivityTimeout(logoutCallback)
  );
  window.addEventListener("keypress", () =>
    resetInactivityTimeout(logoutCallback)
  );
  resetInactivityTimeout(logoutCallback);
};
