import {  createContext,useEffect,useState } from "react";


export const AuthContext= createContext({});


export const AuthProvider=({ children }) =>{
  const [token,SetToken]= useState('');
  const [nivel,SetNivel]= useState('');
  const [iduser,SetIduser]= useState('');

  useEffect(()=>{
  SetToken( localStorage.getItem('token'));
  SetNivel(  localStorage.getItem('nivel'));
  SetIduser(  localStorage.getItem('id_usuario'));
    },[])


    function sair(){
        localStorage.clear();
        SetToken(null);
        SetNivel(null);
        SetIduser(null);
      }
      


  return <AuthContext.Provider value={{token,nivel,iduser,sair}}>{children}</AuthContext.Provider>;
};
