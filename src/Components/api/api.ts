import axios, { AxiosResponse } from 'axios';

export type ResponseInfoAPIType = {
  incomplete_results:boolean
  items:AxiosResponse
  total_count:number
};

export const infoAPI = {
  searchInfoApp(param:string) {
    return axios.get<ResponseInfoAPIType>(`https://api.github.com/search/repositories?q=${param}`)
      .then((res:AxiosResponse) => {
        console.log(res.data);
        return res.data;
      });
  },
};
