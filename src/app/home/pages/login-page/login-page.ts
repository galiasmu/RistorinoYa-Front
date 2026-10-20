import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthResource } from '../../api/resources/auth-resource';
import { AuthService } from '../../../core/services/auth-service';
import { ISesion } from '../../../core/models/i-sesion';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.html'
})
export class LoginPage {
  @Input() returnUrl?: string;

  loginForm = new FormGroup({
    correo: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    clave: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  error = signal<string | null>(null);

  constructor(private _resource: AuthResource, private _auth: AuthService, private _router: Router) { }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this._resource.login(this.loginForm.getRawValue()).subscribe({
      next: (sesion: ISesion) => {
        this._auth.iniciarSesion(sesion);
        this._router.navigateByUrl(this.returnUrl || '/');
      },
      error: () => this.error.set($localize`El correo o la clave no son correctos`)
    });
  }
}
