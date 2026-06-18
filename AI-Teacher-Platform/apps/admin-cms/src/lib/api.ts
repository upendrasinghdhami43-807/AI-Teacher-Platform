export const api = {
  admin: {
    login: async (_email: string, _password: string) => {
      await new Promise(r => setTimeout(r, 800));
      return { success: true };
    },
    logout: async () => {
      await new Promise(r => setTimeout(r, 200));
      return { success: true };
    },
  },
};
