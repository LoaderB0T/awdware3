import { Injectable } from '@angular/core';
import { CircleParticle } from 'confetti.ts';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private readonly _rndmColors = ['#eb4034', '#65eb34', '#34ebcd', '#1c61d9', '#7a1cd9', '#ed09d3', '#ed093e'];

  public startDraw(x: number, y: number, power: number, colorful: boolean) {
    const color = colorful ? this._rndmColors[Math.floor(Math.random() * this._rndmColors.length)] : '#ffd500';
    CircleParticle.draw({
      x,
      y,
      movement: 'xy',
      color,
      rotationY: 4 + Math.random() * 2,
      radius: 8,
      gravity: 0.2,
      velocityY: -5 - (power / 75) * 6,
      velocityX: Math.random() - 0.5,
      borderColor: color === '#ffd500' ? '#d99400' : color
    });
  }
}
