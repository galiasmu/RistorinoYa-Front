import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoaderIcon} from './core/layouts/loader-icon/loader-icon';
import {SidenavComponent} from './shared/components/sidenav/sidenav';
import {FooterComponent} from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
  LoaderIcon,
  SidenavComponent,
  FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RistorinoYa-Front');
}
