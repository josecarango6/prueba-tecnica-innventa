import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { Nationality } from './nationality';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public usuario: Usuario = new Usuario()
  nationalities: Nationality[];
  public titulo:string = "Crear Usuario"

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit() {
    this.usuarioService.getNationality().subscribe(nationalities => this.nationalities = nationalities)

  }

  public validaciones(): void{
    (function () {
      'use strict';
      window.addEventListener('click', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }

  // public create(): void{
  //   this.usuarioService.create(this.usuario).subscribe(
  //     response => this.router.navigate(['/usuarios'])
  //   )
  // }

  public create(): void{
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.router.navigate(['/usuarios'])
      swal.fire('Nuevo Usuario', `Usuario ${usuario.firstName} creado con éxito!`, 'success')
        }
    );
  }

}
