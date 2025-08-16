import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="shell">
      <header class="banner">
        <img class="banner-img" src="assets/banner_3.jpg" alt="RPG Character Builder banner">
        <nav class="nav">
          <a href="#" class="brand">RPG<span>Builder</span></a>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Races</a></li>
            <li><a href="#">Builder</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </header>

      <main class="main">
        <aside class="side">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Create Character</a></li>
            <li><a href="#">Saved Characters</a></li>
            <li><a href="#">Dice Roller</a></li>
            <li><a href="#">Export Sheet</a></li>
          </ul>
        </aside>

        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </main>

      <footer class="footer">
        <nav class="footer-nav">
          <a href="#">Home</a> ·
          <a href="#">Classes</a> ·
          <a href="#">Races</a> ·
          <a href="#">Builder</a> ·
          <a href="#">About</a>
        </nav>
        <p>&copy; 2025 RPG Character Builder</p>
      </footer>
    </div>
  `,
  styles: [`
    .shell { min-height: 100vh; display: flex; flex-direction: column; }
    .banner { position: relative; }
    .banner-img { width: 100%; height: 180px; object-fit: cover; opacity: .25; display: block; }
    .nav {
      position: absolute; inset: 0 0 auto 0; height: 64px; display: flex;
      align-items: center; justify-content: space-between; padding: 0 24px;
    }
    .brand {
      font-family: Montserrat, sans-serif; font-weight: 800; font-size: 1.3rem; letter-spacing: .5px;
      color: var(--ink); text-decoration: none;
    }
    .brand span { color: var(--accent); }
    .nav ul { list-style: none; display: flex; gap: 18px; margin: 0; padding: 0; }
    .nav a { color: var(--ink); text-decoration: none; font-weight: 600; }
    .nav a:hover { color: #a7f3d0; }

    .main { flex: 1; display: grid; grid-template-columns: 220px 1fr; gap: 24px; width: min(1080px, 92%); margin: 24px auto; }
    .side {
      background: var(--card); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }
    .side h3 { font-family: Merriweather, serif; margin: 0 0 8px; }
    .side ul { list-style: none; margin: 0; padding: 0; }
    .side li { padding: 6px 0; }
    .side a { color: var(--ink); text-decoration: none; }
    .side a:hover { color: var(--accent); }

    .content {
      background: var(--card); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; padding: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }

    .footer { text-align: center; padding: 24px 16px; color: #cbd5e1; }
    .footer-nav { margin-bottom: 8px; }
    .footer-nav a { color: #cbd5e1; text-decoration: none; margin: 0 6px; }
    .footer-nav a:hover { color: var(--accent); text-decoration: underline; }

    @media (max-width: 900px) {
      .nav { position: static; height: auto; padding: 12px 16px; }
      .banner-img { height: 120px; }
      .main { grid-template-columns: 1fr; }
    }
  `]
})
export class AppComponent {}
