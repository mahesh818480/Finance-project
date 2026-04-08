import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent {
  mockMail = 'example@gmail.com';


  @ViewChild('contentArea') contentArea!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;

  activeSection = 'login';
  isSidebarOpen = false;

  sections = [
    'login',
    'login-validation',
    'register',
    'register-validation',
    'invalid-login',
    'forgot',
    'dashboard',
    'navbar',
    'cards',
    'chart',
    'profile',
    'transactions',
    'insights'
  ];

  ngAfterViewInit() {
    this.contentArea.nativeElement.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  scrollTo(section: string) {
    const container = this.contentArea.nativeElement;
    const element = document.getElementById(section);

    if (element) {
      container.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
    }

    this.isSidebarOpen = false; // mobile close
  }

  onScroll() {
    const scrollTop = this.contentArea.nativeElement.scrollTop;

    for (let sec of this.sections) {
      const el = document.getElementById(sec);

      if (el && scrollTop >= el.offsetTop - 120) {
        this.activeSection = sec;

        // 🔥 AUTO SCROLL SIDEBAR
        const navItem = document.getElementById('nav-' + sec);

        if (navItem && this.sidebar) {
          navItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          });
        }
      }
    }
  }
}
