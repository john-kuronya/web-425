import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <h1>Forge Your Legend</h1>
      <p class="tagline">
        Welcome to <strong>RPG Character Builder</strong>—a workshop for world-builders, dungeon crawlers,
        and storytellers who love creating unforgettable heroes. In minutes, you can shape a character’s
        race, class, background, and personality, then save and refine your build as your adventures grow.
      </p>
      <img class="hero-img" src="assets/party.jpg" alt="adventuring party illustration">
    </section>

    <section class="grid">
      <article class="card">
        <img src="assets/dice.jpg" alt="polyhedral dice set">
        <h2>Create with Purpose</h2>
        <p>
          Rather than random stats on a page, this builder encourages intent: define who your character is,
          why they adventure, and how their choices shape the party. Select a race and class, assign attributes,
          and choose proficiencies that support a clear role. Whether you imagine a patient healer, clever scout,
          or relentless tank, the interface guides you with tips that make sense for your concept.
        </p>
      </article>

      <article class="card">
        <img src="assets/sheet.png" alt="character sheet close-up">
        <h2>Grow Over Time</h2>
        <p>
          Characters aren’t static. Save builds, revisit them after a session, and record how experiences change
          your hero. Adjust ability scores when milestones unlock, track new spells, and document companions you
          meet along the way. Progress becomes a story: a timeline of tiny decisions leading toward a memorable arc.
        </p>
      </article>

      <article class="card">
        <img src="assets/mini.jpg" alt="miniature figures on a battle map">
        <h2>Ready to Share</h2>
        <p>
          When it’s time to play, export a clean character summary or a detailed sheet tailored to your game.
          Share builds with friends, compare party roles, and refine together before the next session. This is a
          builder that embraces creativity and clarity, helping you focus on what matters most: telling a great story.
        </p>
      </article>
    </section>
  `,
  styles: [`
    :host { display:block; }

    .hero h1 {
      font-family: Montserrat, sans-serif;
      font-size: clamp(2rem, 3.5vw, 3rem);
      margin: 0 0 .25rem;
    }
    .hero .tagline {
      font-family: Merriweather, serif;
      color: #cbd5e1;
      max-width: 65ch;
      margin-bottom: 16px;
      line-height: 1.6;
    }
    .hero-img {
      width: 100%; height: auto; border-radius: 12px;
      border: 1px solid rgba(255,255,255,.08);
      box-shadow: 0 10px 25px rgba(0,0,0,.35);
      margin: 12px 0 8px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      margin-top: 18px;
    }
    .card {
      background: rgba(31, 37, 49, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.19);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
    }
    .card h2 {
      font-family: Montserrat, sans-serif;
      margin: 8px 0;
      color: #e2e8f0;
    }
    .card p {
      font-family: Merriweather, serif;
      color: #d1d5db;
      line-height: 1.65;
    }
    .card img {
      width: 100%; height: 180px; object-fit: cover;
      border-radius: 10px; border: 1px solid rgba(255,255,255,.06);
      margin-bottom: 8px;
    }

    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
      .card img { height: 200px; }
    }
  `]
})
export class HomeComponent {}
