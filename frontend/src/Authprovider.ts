import { AuthProvider } from "react-admin";

const authProvider : AuthProvider={
    login: async({username,password})=>{
        const request=new Request("", {
            method: "POST",
            body: JSON.stringify({"username":username, "password":password}),
            headers:new Headers({"Content-type":"application/json"})
        });
        try{
            const res=await fetch(request);
            if(res.status<200 || res.status>=300){
                throw new Error(res.statusText);
            }
            const auth=await res.json();
            sessionStorage.setItem("auth", auth.token);
        }catch{
            throw new Error("Error en usuario o password");
        }
    },
    logout:()=>{},
    checkAuth:()=>{},
    checkError:()=>{}

}
export default authProvider;