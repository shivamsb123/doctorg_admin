import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'admin-theme';
  title = 'DocWeb-UI';
  scrolled: boolean = false;

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 50;
    }
}
