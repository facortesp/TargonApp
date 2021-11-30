import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuarios,UsuarioService } from 'src/app/services/usuarioservice.service';
import { Platform, ToastController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  
  usuarios: Usuarios[] = [];
  newUsuario: Usuarios = <Usuarios>{};
  @ViewChild('myList')myList :IonList; 

  constructor(private storageService: UsuarioService, 
    private plt: Platform, private toastController: ToastController) {
      this.plt.ready().then(()=>{
        this.loadUsuarios();
      });
    }

  ngOnInit() {
  }

  openEdit(usuario:Usuarios)
  {
      this.newUsuario=usuario;
  }
  
  loadUsuarios(){
    this.storageService.getUsuario().then(usuarios=>{
      this.usuarios=usuarios;
    });
  }

   
   addUsuarios(){
    this.newUsuario.modified = Date.now();
    this.newUsuario.id = Date.now();
    this.storageService.addUsuarios(this.newUsuario).then(usuario=>{
      this.newUsuario = <Usuarios>{};
      this.showToast('!Usuarios Agregados');
      this.loadUsuarios();
    });
  }

  
  updateUsuarios(usuario: Usuarios ){
    this.newUsuario.nom = `${this.newUsuario.nom}`;
    this.newUsuario.ape = `${this.newUsuario.ape}`;
    this.newUsuario.email = `${this.newUsuario.email}`;
    this.newUsuario.pass = `${this.newUsuario.pass}`;
    
    this.newUsuario.modified = Date.now();
    this.storageService.updateUsuario(this.newUsuario).then(usuario=>{
      this.showToast('Elemento actualizado!')
      this.myList.closeSlidingItems();
      this.loadUsuarios();
    });
  } 

 
  deleteUsuarios(usuario: Usuarios){
    this.storageService.deleteUsuario(this.newUsuario.id).then(usuario=>{
      this.showToast('Usuario eliminado');
      this.myList.closeSlidingItems();
      this.loadUsuarios();
    });
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg, 
      duration: 2000
    });
    toast.present();
  }


}