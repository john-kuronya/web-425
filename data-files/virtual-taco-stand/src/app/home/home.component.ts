import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Virtual Taco Stand</h1>
      <h2>The Virtual Taco Stand is located in the heart of downtown!</h2>

      <p>
        We specialize in good ol’ home cooking. Our menu ranges from Tacos al Pastor
        to our famous Birria Tacos. We also have a variety of daily specials that are
        sure to please your taste buds. We are open 24 hours a day, 7 days a week. Come
        on down and see us!
      </p>

      <p>
        Having a party? We cater! Give us a call and we will be happy to help you with
        your catering needs.
      </p>

      <div class="highlights-container">
        <div class="highlight">
          <img src="assets/Downtown.png" alt="image of downtown with buildings and cars" />
          <p>
            Discover the heart of downtown flavor at our taco stand! Fresh, vibrant, and
            bursting with authentic Mexican cuisine, our tacos are a downtown must-try.
            Every bite tells a story of tradition and taste.
          </p>
        </div>

        <div class="highlight">
          <img src="assets/Stand.png" alt="taco stand with vendor serving a customer" />
          <p>
            Welcome to our vibrant taco stand, where every bite is a fiesta! Join
            us for an unforgettable culinary journey crafted by our passionate taco artisans.
            Fresh flavors meet tradition in every taco—your taste adventure starts here!
          </p>
        </div>

        <div class="highlight">
          <img src="assets/Tacos.png" alt="three tacos side by side" />
          <p>
            Feast your eyes on our trio of tacos—carefully crafted with the freshest ingredients
            and bursting with flavor. Perfect for sharing (or indulging solo). Savor the essence of
            Mexican cuisine, one taco at a time.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .highlights-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 20px;
    }
    .highlight {
      text-align: center;
      flex: 0 1 calc(33.333% - 20px);
      box-sizing: border-box;
    }
    .highlight img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
    .highlight p {
      margin-top: 10px;
    }
    @media (max-width: 900px) {
      .highlight { flex: 1 1 100%; }
    }
  `]
})
export class HomeComponent {}

