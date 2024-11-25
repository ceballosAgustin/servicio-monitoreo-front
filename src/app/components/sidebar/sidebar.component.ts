import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  authenticated: boolean = false;

  constructor(
    private loginService: LoginService,
    private toast: ToastrService,
    private router: Router) {

    }

    ngOnInit(): void {
      this.authenticated = this.loginService.isAuthenticated();
    }

    logout(): void {
      this.toast.info("Que vuelvas pronto", "¡Adiós!");
      this.loginService.logout();
      this.router.navigate(["/login"]);
    }

}
