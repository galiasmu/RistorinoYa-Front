import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthResource } from '../../../home/api/resources/auth-resource';
import { AuthService } from '../../../core/services/auth-service';
import { ISesion } from '../../../core/models/i-sesion';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthResource],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class SidenavComponent {

  constructor(private _auth: AuthService, private _resource: AuthResource, private _router: Router) { }

  get sesion(): ISesion | null {
    return this._auth.sesion();
  }

  cerrarSesion(): void {
    this._resource.logout().subscribe({
      next: () => this.salir(),
      error: () => this.salir()
    });
  }

  private salir(): void {
    this._auth.cerrarSesion();
    this._router.navigateByUrl('/');
  }
}
