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

  bgChangeSpeed = 3000;

  bgMoveSpeedModifier = 0.4;

  bgMooveDirection = 135;

  bgCoordinates = {
    x: 0,
    y: 0,
  };

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
      if (Math.random() > 0.5) {
        this.changeDirection();
      }
    }, 1000);

    this.moveBackground();
  }

  changeDirection() {
    this.bgMooveDirection = Math.random() * 360;
  }

  moveBackground() {
    requestAnimationFrame(() => {
      this.bgCoordinates.x = Math.min(
        Math.max(
          this.bgCoordinates.x +
            Math.cos(this.bgMooveDirection) * this.bgMoveSpeedModifier,
          0
        ),
        100
      );
      this.bgCoordinates.y = Math.min(
        Math.max(
          this.bgCoordinates.y +
            Math.sin(this.bgMooveDirection) * this.bgMoveSpeedModifier,
          0
        ),
        100
      );

      if (
        this.bgCoordinates.x === 0 ||
        this.bgCoordinates.x === 100 ||
        this.bgCoordinates.y === 0 ||
        this.bgCoordinates.y === 100
      ) {
        this.changeDirection();
      }

      this.container.nativeElement.style.setProperty(
        '--x',
        `${this.bgCoordinates.x}%`
      );
      this.container.nativeElement.style.setProperty(
        '--y',
        `${this.bgCoordinates.y}%`
      );

      this.moveBackground();
    });
  }
}
