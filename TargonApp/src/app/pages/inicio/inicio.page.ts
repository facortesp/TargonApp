import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import {Article} from '../../interfaces/interfaces';
import {Source} from '../../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  noticias: Article[ ]=
  [
    
  ]

  constructor(public navCtrl: NavController,
    private noticiasService:NoticiasService,
    private router:Router) { }

  ngOnInit() {
    this.noticiasService.getPopular().subscribe(resp=>{
      console.log('noticias', resp);
      this.noticias.push(...resp.articles);
    });
  }
  // loadNoticias(){

  //   this.noticiasService.getNotiID().then(article=>{

  //     this.noticias=article;

  //   });

  // }

  onNoticia(noticia) {
      this.noticiasService.articleC = noticia;
      this.router.navigate(['/noticia']);
    }
	}
  
  
 


