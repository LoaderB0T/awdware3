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
    this._particles.push({ x, y, startTime: Date.now() });
  }

  private draw() {
    if (!this._ctx || !this._canvas) {
      throw new Error('Context is not initialized');
    }
    // this._ctx.globalCompositeOperation = 'destination-over';
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas
    this._particles.forEach(particle => {
      const timeDelta = Date.now() - particle.startTime;
      const pos = timeDelta / 100;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._ctx!.fillRect(pos + particle.x, pos + particle.y, 50, 50); // fill canvas with white
    });
    window.requestAnimationFrame(() => this.draw());
  }
}
