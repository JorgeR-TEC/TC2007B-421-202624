import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const fetchJsonUtils=(url:string, options:fetchUtils.Options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"});
    }
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider("http://10.49.61.59:3000", fetchJsonUtils);