import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';

describe('SigninComponent (TDD)', () => {
  let cookie: CookieService;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent, ReactiveFormsModule],
      providers: [
        CookieService,
        AuthService,
        provideRouter([]),
      ],
    }).compileComponents();

    cookie = TestBed.inject(CookieService);
    auth = TestBed.inject(AuthService);

    // *** Ensure a clean slate before every test ***
    cookie.deleteAll('/');
    cookie.deleteAll();
    // Reset BehaviorSubject to false
    (auth as any).authState.next(false);
  });

  it('Test 1: Should set cookie and authState to true on successful sign in', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;

    const email = 'aragorn@middle.earth';
    const password = 'Ranger#123';

    comp.form.setValue({ email, password });

    let latestAuthState: boolean | undefined;
    const sub = auth.getAuthState().subscribe(v => (latestAuthState = v));

    comp.onSubmit();

    expect(cookie.check('session_user')).toBeTrue();
    expect(cookie.get('session_user')).toBe(email);
    expect(latestAuthState).toBeTrue();

    sub.unsubscribe();
  });

  it('Test 2: Should not set cookie and should set authState to false on unsuccessful sign in', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;

    comp.form.setValue({ email: 'aragorn@middle.earth', password: 'WrongPassword!' });

    let latestAuthState: boolean | undefined;
    const sub = auth.getAuthState().subscribe(v => (latestAuthState = v));

    comp.onSubmit();

    expect(cookie.check('session_user')).toBeFalse();
    expect(latestAuthState).toBeFalse();

    sub.unsubscribe();
  });

  it('Test 3: Should call signin method on form submission', () => {
    const fixture = TestBed.createComponent(SigninComponent);
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    const spy = spyOn(auth, 'signin').and.returnValue(false);

    comp.form.setValue({ email: 'foo@bar.com', password: 'Password#1' });

    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith('foo@bar.com', 'Password#1');
  });
});

