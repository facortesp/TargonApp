import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import {Article} from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {
  article;
  
  
  constructor (private noticiasService:NoticiasService) {
  
  }

  ngOnInit() 
  {
    this.article=this.noticiasService.articleC;
    console.log(this.noticiasService.articleC);
  }
  
}
