import { AsyncPipe } from '@angular/common';
import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'awd-bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BgComponent implements OnInit {
  public key_a$ = new BehaviorSubject(false);
  public key_w$ = new BehaviorSubject(false);
  public key_d$ = new BehaviorSubject(false);

  private readonly $timer_a = new Subject<void>();
  private readonly $timer_w = new Subject<void>();
  private readonly $timer_d = new Subject<void>();

  private readonly timer_a = this.$timer_a.asObservable();
  private readonly timer_w = this.$timer_w.asObservable();
  private readonly timer_d = this.$timer_d.asObservable();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const focusedElem = document.activeElement;
    if (focusedElem) {
      if ((focusedElem as HTMLInputElement).type === 'password') {
        return;
      }
    }

    const key = event.key;
    switch (key) {
      case 'a':
        this.key_a$.next(true);
        this.$timer_a.next();
        break;
      case 'w':
        this.key_w$.next(true);
        this.$timer_w.next();
        break;
      case 'd':
        this.key_d$.next(true);
        this.$timer_d.next();
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.timer_a.pipe(debounceTime(500)).subscribe(() => this.key_a$.next(false));
    this.timer_w.pipe(debounceTime(500)).subscribe(() => this.key_w$.next(false));
    this.timer_d.pipe(debounceTime(500)).subscribe(() => this.key_d$.next(false));
  }
}
