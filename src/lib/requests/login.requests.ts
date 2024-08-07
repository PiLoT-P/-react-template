import { $axios } from "../axios.service";

export const fetchLoginUser = async (data: {
    login: string,
    password: string,
  }): Promise<string> => {
    const response = await $axios.post(
      '/identityserver/Auth/Login',
      // /identityserver/Auth/Login
      data,
    )
  
    return response.data;
  }