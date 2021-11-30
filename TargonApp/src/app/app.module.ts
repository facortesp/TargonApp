import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, IonRippleEffect, isPlatform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

const getConfig=()=>{
  if(isPlatform('hybrid')){
    return{
      backButtonText:'Previous',
      tabButtonLayout:'label-hide'
    }
  }
  return{
    menuIcon:'ellipsis-vertical'
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
   BrowserModule,FormsModule, IonicModule.forRoot({rippleEffect: false,
    mode:'md'}), AppRoutingModule,HttpClientModule, 
    IonicStorageModule.forRoot({

      name: 'mydb',

      driverOrder: [Drivers.IndexedDB,Drivers.LocalStorage]

    }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
