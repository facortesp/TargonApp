import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  constructor(public alertController: AlertController) { }
  
  ngOnInit() {
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
