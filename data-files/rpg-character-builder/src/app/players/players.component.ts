import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Warrior' | 'Mage' | 'Rogue';
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="players">
      <h1>Players</h1>
      <p class="intro">
        Meet ten adventurers ready for glory. The table below lists core details and a fun fact for each character.
      </p>

      <div class="table-wrap" role="region" aria-labelledby="players-caption" tabindex="0">
        <table class="chars" aria-describedby="players-desc">
          <caption id="players-caption">RPG Character Roster</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Class</th>
              <th scope="col">Faction</th>
              <th scope="col">Starting Location</th>
              <th scope="col">Fun Fact</th>
            </tr>
          </thead>
  <tbody id="players-desc">
    @for (c of characters; track c.name) {
      <tr class="char-item">
      <th scope="row">
        <span class="avatar" [attr.aria-hidden]="true">{{ c.name[0] }}</span>
        <span class="name">{{ c.name }}</span>
      </th>
      <td>{{ c.gender }}</td>
      <td>{{ c.class }}</td>
      <td>{{ c.faction }}</td>
      <td>{{ c.startingLocation }}</td>
      <td class="fact">💡 {{ c.funFact }}</td>
    </tr>
  }
 </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    :host { display:block; }

    h1 {
      margin: 0 0 .25rem;
      font-family: Montserrat, sans-serif;
      font-size: clamp(1.75rem, 3vw, 2.25rem);
      color: #e2e8f0;
    }
    .intro {
      margin: 0 0 1rem;
      color: #cbd5e1;
      font-family: Merriweather, serif;
      line-height: 1.55;
    }

    .table-wrap {
      background: rgba(17,24,39,.9);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,.25);
      overflow: auto; /* allow horizontal scroll on small screens */
    }
    .table-wrap:focus { outline: 2px solid #22c55e; outline-offset: 2px; }

    table.chars {
      border-collapse: collapse;
      width: 100%;
      min-width: 780px; /* keeps columns readable on narrow viewports */
      color: #e5e7eb;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }
    caption {
      text-align: left;
      padding: 8px 4px 12px;
      color: #93c5fd;
      font-weight: 700;
      font-family: Montserrat, sans-serif;
    }
    thead th {
      text-align: left;
      padding: 10px 12px;
      border-bottom: 2px solid rgba(255,255,255,.12);
      white-space: nowrap;
    }
    tbody th[scope="row"] {
      font-weight: 700;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255,255,255,.06);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    tbody td {
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255,255,255,.06);
      vertical-align: top;
    }
    tbody tr:nth-child(even) { background: rgba(255,255,255,.03); }

    .avatar {
      width: 36px; height: 36px; border-radius: 50%;
      display: grid; place-items: center;
      background: #111827; color: #a7f3d0; font-weight: 800;
      border: 1px solid rgba(255,255,255,.08);
      font-family: Montserrat, sans-serif;
      flex: 0 0 36px;
    }
    .name { white-space: nowrap; }

    .fact { line-height: 1.5; font-family: Merriweather, serif; }

    @media (max-width: 700px) {
      caption { padding-bottom: 8px; }
      thead th, tbody td, tbody th { padding: 8px 10px; }
    }
  `]
})
export class PlayersComponent {
  characters: Character[] = [
    { name: 'Thorn',  gender: 'Male',   class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Ironhold',     funFact: 'Thorn once single handedly defeated a dragon.' },
    { name: 'Lyra',   gender: 'Female', class: 'Mage',    faction: 'The Ember Circle',     startingLocation: 'Aetherfall',   funFact: 'Lyra can recite 500 arcane runes from memory.' },
    { name: 'Kestrel',gender: 'Other',  class: 'Rogue',   faction: 'Nightshade Syndicate', startingLocation: 'Shadowmarket', funFact: 'Kestrel can pick any lock in under ten seconds.' },
    { name: 'Brann',  gender: 'Male',   class: 'Warrior', faction: 'Stonewatch Legion',    startingLocation: 'Granite Gate', funFact: 'Brann forged his own greatsword from fallen meteor iron.' },
    { name: 'Selene', gender: 'Female', class: 'Mage',    faction: 'Moonveil Order',       startingLocation: 'Lunarglade',   funFact: 'Selene maps starpaths to predict enemy movements.' },
    { name: 'Rook',   gender: 'Male',   class: 'Rogue',   faction: 'Free Blades',          startingLocation: 'Port Meridian',funFact: 'Rook never loses a coin toss, claims it’s luck, not trickery.' },
    { name: 'Mira',   gender: 'Female', class: 'Warrior', faction: 'Dawnwardens',          startingLocation: 'Sunspire',     funFact: 'Mira trained with a giant’s shield and still carries it.' },
    { name: 'Ash',    gender: 'Other',  class: 'Mage',    faction: 'Verdant Pact',         startingLocation: 'Greenreach',   funFact: 'Ash once revived a forest after a wildfire, overnight.' },
    { name: 'Vex',    gender: 'Other',  class: 'Rogue',   faction: 'Silver Daggers',       startingLocation: 'Rivenshade',   funFact: 'Vex can vanish in a crowd without moving a step.' },
    { name: 'Edda',   gender: 'Female', class: 'Warrior', faction: 'Frostguard',           startingLocation: 'Wintermere',   funFact: 'Edda swims in glacial lakes before every battle.' },
  ];
}

