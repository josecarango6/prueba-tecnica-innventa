import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Nationality } from './nationality';
import { User } from './user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  users: any[];
  usuarios: any[];
  nationalities: Nationality[];
  
  public user: User = new User()
  public usuario: Usuario = new Usuario()
  public nationality: Nationality = new Nationality()


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    //  this.usuarioService.getUser().subscribe(users => this.users = users)
     this.getUsers();
     console.log('usersOnInit',this.users)
  } 

  async getUsers(){
    console.log('getUsers async');    
    this.users = await this.usuarioService.getUsers();
    this.users.filter( usr => usr.sicCode > 0);
    console.log('getUsersTs',this.users);
  }

  // public getUser(): void{
  //   this.usuarioService.getUser().subscribe(dt => {
  //     if(dt.success){
  //       this.users = data.data;
  //     }
  //   })
  // }
  
  // public getUser(): void{
  //   this.usuarioService.getUser().subscribe(any => {
  //     if(any.length){
  //       this.users = ;
  //     }
  //   })     
     
  // }
  

}
