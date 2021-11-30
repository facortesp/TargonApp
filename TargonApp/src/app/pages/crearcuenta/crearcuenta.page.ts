import { Component, OnInit , ViewChild} from '@angular/core';
import { UsuarioService, Usuarios } from 'src/app/services/usuarioservice.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.page.html',
  styleUrls: ['./crearcuenta.page.scss'],
})
export class CrearcuentaPage implements OnInit {

  usuarios: Usuarios[] = [];
//newUsuario a newUsuario
  newUsuario: Usuarios = <Usuarios>{};
  @ViewChild('myList')myList :IonList; 

  constructor(public alertController: AlertController,
    private storageService: UsuarioService, 
    private plt: Platform,
    private toastController: ToastController,
    private authService:AuthService)
    {  this.plt.ready().then(()=>{
 
     this.loadUsuarios();
 
   });}

  
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
       
     });
 
   }
   async showToast(msg){
 
     const toast = await this.toastController.create({
       message: msg, 
       duration: 2000
     });
     toast.present();
   }
 
   updateUsuarios(usuario: Usuarios ){
 
    usuario.nom = `UPDATED: ${usuario.nom}`;
    usuario.modified = Date.now();
     this.storageService.updateUsuario(usuario).then(item=>{
       this.showToast('Elemento actualizado!')
       this.myList.closeSlidingItems();
       this.loadUsuarios();
     });
   } 
   deleteUsuarios(usuario: Usuarios){
 
     this.storageService.deleteUsuario(usuario.id).then(item=>{
       this.showToast('Elemento eliminado');
       this.myList.closeSlidingItems();
       this.loadUsuarios();
     });
   }

  ngOnInit() {
  }




  onRegister(form:any){

    console.log('xxxx',form)
    this.authService.signUp(
      {
      email:form.value.email,
      password:form.value.password,
      returnSecuretoken:true
    }
    ).subscribe(resp=>
    {
      console.log('Response',resp)
    })
     
    
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuenta creada',
      message: 'Su cuenta ha sido creada con éxito. Por favor verifique su correo electrónico para mayor seguridad',
      buttons: [
        {
          text: 'Continuar',
          handler: () => {
            console.log('Continuar');
          }
        }
      ]
    });

    await alert.present();
  }




}
