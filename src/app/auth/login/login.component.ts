import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateFrm!: FormGroup;
  validateFrmRecuperar!: FormGroup;
  urlImageLogo: string;
  isVisible = false;
  passwordVisible = false;
  loading: boolean = false;
  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.urlImageLogo = 'assets/clientes.png';
    this.authService.CerrarSesion();
  }

  ngOnInit(): void {
    this.validateFrm = this.fb.group({
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    if (this.validateFrm.valid) {
      this.onLogin(this.validateFrm.value);
    } else {
      Object.values(this.validateFrm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onLogin(formData: any): void {
    this.loading = true;
    if (formData.usuario == 'admin' && formData.password == 'admin') {
      this.authService.setIsAuth(true);
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/home']);
      }, 1200);
    } else {
      this.loading = false;
      this.message.error('Usuario o contraseña incorrectos');
    }
  }
}
