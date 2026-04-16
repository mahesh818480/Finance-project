import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() menuClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  user() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.name || 'User';
  }

  logout() {
    this.router.navigate(['/']);
  }
}