import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export interface User {
  empId: number;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Demo users
  private users: User[] = [
    { empId: 1, email: 'aragorn@middle.earth', password: 'Ranger#123' },
    { empId: 2, email: 'galadriel@lothlorien', password: 'Light#456' },
    { empId: 3, email: 'gandalf@istari.org',   password: 'Wizard#789' },
  ];

  private authState = new BehaviorSubject<boolean>(false);

  constructor(private cookies: CookieService, private router: Router) {
    // Restore state if cookie exists
    this.authState.next(this.cookies.check('session_user'));
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const found = this.users.find(u => u.email === email && u.password === password);
    if (found) {
      this.cookies.set('session_user', found.email);
      this.authState.next(true);
      return true;
    }
    this.authState.next(false);
    return false;
  }

  signout(): void {
    this.cookies.deleteAll('/');
    this.cookies.deleteAll(); // extra safety
    this.authState.next(false);
    this.router.navigate(['/signin']);
  }
}
