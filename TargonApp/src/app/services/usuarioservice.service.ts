import { Injectable } from '@angular/core'; 
import {Storage } from '@ionic/storage';


export interface Usuarios
{
  id:number,
  nom:string,
  ape:string,
  email:string,
  pass:string,
  zipcode:number,
  newsletter:boolean,
  modified:number
}

const ITEMS_KEY='my-datos';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _storage: Storage;
 //newUsuario?newUsuario
  constructor(private storage: Storage) 
  
  {
    this.init();
   }
   async init()
   {
    const storage=await this.storage.create();
    this._storage=storage;
   }

   addUsuarios(usuario: Usuarios):Promise<any>{

    return this.storage.get(ITEMS_KEY).then((usuarios : Usuarios[])=>{
        if (usuarios) {
          usuarios.push(usuario);
          return this.storage.set(ITEMS_KEY, usuarios);
        }else {
          return this.storage.set(ITEMS_KEY, [usuario]);
        }
     })
   }


   getUsuario(): Promise<Usuarios[]>{

    return this.storage.get(ITEMS_KEY);
  }
  updateUsuario(usuario: Usuarios): Promise<any>{

    return this.storage.get(ITEMS_KEY).then((usuarios : Usuarios[])=>{

      if (!usuarios || usuarios.length == 0){
        return null;
      }
      let newUsuario: Usuarios[] = [];
      for (let i of usuarios){
        if (i.id === usuario.id){
          newUsuario.push(usuario);
        }
        else{
          newUsuario.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newUsuario);

    });

  }
  deleteUsuario(id: number): Promise<Usuarios>{

    return this.storage.get(ITEMS_KEY).then((usuarios : Usuarios[])=>{

      if (!usuarios || usuarios.length === 0){
        return null;
      }
      let toKeep: Usuarios[] = []; 
      for (let i of usuarios){
        if (i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);

    });
  }
}
