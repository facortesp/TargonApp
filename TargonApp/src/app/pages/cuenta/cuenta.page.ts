import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(public alertController: AlertController,
    private authService:AuthService) { }
  
  ngOnInit() {
  }
  
  login(form:any){

    console.log('submit',form);
    this.authService.login(
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
      header: 'Sesión iniciada',
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