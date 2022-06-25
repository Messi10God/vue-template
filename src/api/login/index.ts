import { Response } from "@/api/typing";
// import request from '@/utils/request'
// export function login(params: Login) {
//   return request.post()
// }
export function login(params: Login): Promise<Response> {
  return new Promise((resolve) => {
    if (params.userName === "admin" && params.password === "admin") {
      resolve({ code: 200, data: { token: "HXIOHOSAIFHOSAHGOIHAG" } });
    } else {
      resolve({ code: 400 });
    }
  });
}

export interface Login {
  userName: string;
  password: string;
}
