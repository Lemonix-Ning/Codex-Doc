// Stub implementation - authentication removed
// This hook is kept for compatibility but returns default values
export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    loading: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
  };
}
