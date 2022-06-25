import { defineStore } from "pinia";
export const tokenStore = defineStore("token", {
  state: () => ({
    token: sessionStorage.getItem("token") as string,
  }),
  actions: {
    addToken(val: string) {
      sessionStorage.setItem("token", val);
      this.token = val;
    },
  },
});
