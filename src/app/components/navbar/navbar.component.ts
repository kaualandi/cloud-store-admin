import { Router } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() colapse: 'vertical' | 'horizontal' = 'vertical';
  @ViewChild('navbar') navbar: ElementRef<HTMLElement> | undefined;

  constructor(
    private authService: AuthService,
    private storage: StorageService,
    private http: HttpService,
    private router: Router
  ) {}

  loading = false;

  navbar_hidden = true;
  scroll = false;
  navbar_height = 0;
  url = this.http.base_url;
  user: IUser | null = null;

  ngOnInit(): void {
    this.onWindowScroll();

    this.getMe();
    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });
  }

  ngOnDestroy(): void {
    this.storage.unwatchUser();
  }

  logout() {
    this.storage.logout();
  }

  getMe() {
    this.loading = true;
    this.authService.me().subscribe({
      next: (data) => {
        this.storage.myself = data;
        this.user = data;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 401) {
          this.storage.logout();
        }
      },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scroll = window.scrollY;
    this.scroll = scroll > 200;

    setTimeout(() => {
      if (this.navbar) {
        this.navbar_height = this.navbar.nativeElement.offsetHeight;
      }
    }, 300);
  }
}
