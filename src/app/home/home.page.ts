import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;

  text = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['text']) {
        this.text = params['text'];
      }
    });

    this.animateBackground();
  }

  animateBackground() {
    setInterval(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      this.container.nativeElement.style.setProperty('--x', `${x}%`);
      this.container.nativeElement.style.setProperty('--y', `${y}%`);
    }, 5000);
  }
}
