import { animate, group, query, style, transition, trigger } from '@angular/animations';

const slideAmount = '150%';
const scaleAmount = '0.1';
const blurAmount = '500px';

const slideUpDown = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
    query(
      ':enter',
      [
        style({
          transform: `translateY(calc({{dir}} * ${slideAmount})) scale(${scaleAmount})`,
          filter: `blur(${blurAmount})`,
        }),
        animate('300ms ease', style({ transform: 'translateY(0) scale(1)', filter: 'blur(0)' })),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateY(0) scale(1)', filter: 'blur(0)' }),
        animate(
          '300ms ease',
          style({
            transform: `translateY(calc({{dir}} * -${slideAmount})) scale(${scaleAmount})`,
            filter: `blur(${blurAmount})`,
          })
        ),
      ],
      { optional: true }
    ),
  ]),
];

export const slideInAnimation = trigger('routeAnimations', [transition('* <=> *', slideUpDown)]);
