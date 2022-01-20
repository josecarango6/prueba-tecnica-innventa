import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';
import { Nationality } from './nationality';
import { User } from './user';



@Injectable()

export class UsuarioService {

  private urlEndPoint: string = 'http://144.217.88.168:3030/api/user';
  private urlEndPoint2: string = 'https://restcountries.com/v2/all';
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> { 

    return this.http.get<Usuario[]>(this.urlEndPoint)
  }

  public getUser(): Observable<any[]> { 

     return this.http.get<any[]>(this.urlEndPoint)
    
  } 
  
  public getUsers(){
    console.log('getUsersServiceInit');    
    return new Promise<any>(resolve => {
      this.get(this.urlEndPoint).then((data) => {
        console.log('EntreGetUsers',data);
        resolve(data);
      });
    })
  }

  /**
   * funcion creada como una utilidad para cargar las url por get
   * @param url path del api a consulta
   */
   get(url){
     console.log('entreget');
     
    return new Promise<any>(resolve => {
      this.http.get(url).subscribe(
        (resp: any) => {
          console.log('respGet',resp);
          let data:any = resp.data;
          data = data.filter( usr => usr.sicCode > 0 && usr.firstName.length > 0);
          console.log('respGetMyData',data);
          if (resp.success) {
            resolve(data);
          } else {
            resolve({ result: false, msg: 'Ah ocurrido un error obteniendo los datos' });
          }
        },
        (error: any) => {
          console.log('Error',error);
        }
      );
    });
  }

  getNationality(): Observable<Nationality[]> { 

    return this.http.get<Nationality[]>(this.urlEndPoint2)
    
  }

  create(usuario: Usuario) : Observable<Usuario>{
    console.log("Clicked!")
    console.log(usuario)
    return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.httpHeaders})
    
  }
}
