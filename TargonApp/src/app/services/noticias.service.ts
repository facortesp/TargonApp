import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaPopular } from '../interfaces/interfaces';
import { Article } from '../interfaces/interfaces';
import {Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




const ITEMS_KEY=environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  storage: any;
  private _storage: Storage;
  articleC: any;
  // article: Article= new Article();
  
  

  constructor(private http: HttpClient, private router:Router ) 
  {
    this.init();
   }
   async init()
   {
    const storage=await this.storage?.create();
    this._storage=storage;
   }

  getPopular()
  {
    return this.http.get<RespuestaPopular>
    ('https://newsapi.org/v2/everything?q=apple&from=2021-10-30&to=2021-10-30&sortBy=popularity&apiKey=c6fb6fcf774a4acbb43ad3b496373264')
  }

  // getNoticia(article: Article) {
  //   this.articleC = article;
  //   this.router.navigate(["/noticia"]);
  // }

  
  
}
