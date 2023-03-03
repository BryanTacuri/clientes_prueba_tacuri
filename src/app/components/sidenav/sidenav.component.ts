import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  title = 'Prueba';
  isCollapsed = false;
  offsetTop = 0;

  constructor(private router: Router, public valueService: AuthService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleCollapsedOnSmallScreen();
  }

  toggleCollapsedOnSmallScreen(): void {
    const isSmallScreen = window.innerWidth < 768; // ajusta el valor según tus necesidades
    if (isSmallScreen) {
      this.isCollapsed = true;
    }
  }

  onLogout() {
    this.valueService.CerrarSesion();
    this.router.navigate(['/login']);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
