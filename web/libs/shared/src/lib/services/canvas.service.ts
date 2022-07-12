import { Injectable } from '@angular/core';
import { Particle } from '../models/particle.model';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private readonly _particles: Particle[] = [];

  private init() {
    if (!this._canvas) {
      this._canvas = document.createElement('canvas');
      this._canvas.style.position = 'fixed';
      this._canvas.style.top = '0';
      this._canvas.style.left = '0';
      this._canvas.style.pointerEvents = 'none';
      this._canvas.style.zIndex = '100';
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
      document.body.appendChild(this._canvas);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._ctx = this._canvas.getContext('2d')!;

      window.requestAnimationFrame(() => this.draw());
    }
  }

  public startDraw(x: number, y: number) {
    this.init();
    this._particles.push({ x, y, startTime: Date.now(), xDrift: Math.random() - 0.5 });
  }

  private draw() {
    if (!this._ctx || !this._canvas) {
      throw new Error('Context is not initialized');
    }
    const ctx = this._ctx;

    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas
    this._particles.forEach(particle => {
      const timeDelta = Date.now() - particle.startTime;

      const speed = 1;
      const rotationScale = 100;
      const rotation = ((timeDelta / 4) % (rotationScale * 2)) - rotationScale;
      const rotationPercent = Math.abs(rotation / rotationScale);

      const centerX = (timeDelta / (speed * 2)) * particle.xDrift + particle.x;
      const centerY = timeDelta / speed + particle.y;
      const radius = 8;

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * rotationPercent, radius, 0, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffd500';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#d99400';
      ctx.stroke();
    });
    window.requestAnimationFrame(() => this.draw());
  }
}
