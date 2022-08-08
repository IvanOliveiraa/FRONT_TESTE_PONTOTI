import useSWR from "swr";
import axios from "../api/axios";

export function useAxios(url){
const {data,error,mutate}= useSWR(url, async(url)=>{
    const response = await axios.get(url);
    return response.data
  });
  return{
    data, error, mutate
  };
}
export default useAxios