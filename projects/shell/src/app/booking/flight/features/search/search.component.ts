import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, WritableSignal, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { injectBookingFeature } from '../../../+state/booking.state';
import { CardComponent } from '../../ui/card.component';
import { FlightFilterComponent } from "../../ui/flight-filter/flight-filter.component";


@Component({
  selector: 'app-flight-search',
  standalone: true,
  // template: '<h2>No Reactive View active!</h2>',
  templateUrl: './search.component.html',
  imports: [
    NgIf, NgFor, DatePipe, JsonPipe, AsyncPipe,
    RouterLink,
    FormsModule,
    CardComponent,
    FlightFilterComponent
  ]
})
export class SearchComponent {
  protected bookingFeature = injectBookingFeature();

  protected from = signal('Paris');
  protected to = signal('London');
  protected urgent = false;
  protected basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  protected flightRoute = computed(
    () => 'From ' + this.from() + ' to ' + this.to() + '.'
  );

  constructor() {
    effect(
      () => console.log(this.flightRoute())
    );

    // this.microtaskDemo();
    // this.taskDemo();
  }

  private microtaskDemo(): void {
    queueMicrotask(() => {
      console.log('%c MicroTask 1: Set From to "Basel"', 'color: yellow')
      this.from.set('Basel');

      console.log('%c MicroTask 1: Set From to "London"', 'color: yellow')
      this.from.set('London');

      queueMicrotask(() => {
        console.log('%c MicroTask 2: Set From to "Rome"', 'color: yellow')
        this.from.set('Rome');
      });
    });
  }

  private taskDemo(): void {
    setTimeout(() => {
      console.log('%c 3s: Set From to "Barcelona"', 'color: green')
      this.from.set('Barcelona');
    }, 3_000);

    setTimeout(() => {
      console.log('%c 5s: Set From to "Madrid"', 'color: green')
      this.from.set('Madrid')
    }, 5_000);

    setTimeout(() => {
      console.log('%c 8s: Set FlightRoute Signal to null', 'color: green')
      this.flightRoute = null as any as WritableSignal<string>;
    }, 8_000);

    setTimeout(() => {
      console.log('%c 11s: Set FlightRoute to Signal w/ value "Hacked! >:-("', 'color: green')
      this.flightRoute = signal('Hacked! >:-(');
    }, 11_000);

    setTimeout(() => {
      console.log('%c 14s: Define a new unrelated Signal"', 'color: green')
      signal('Unrelated Signal');
    }, 14_000);

    setTimeout(() => {
      console.log('%c 17s: Set From to "Oslo"', 'color: green')
      this.from.set('Set From to "Oslo"');
    }, 17_000);
  }
}
