import { animate, group, query, style, transition, trigger } from '@angular/animations';

const slideUpDown = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateY(calc({{dir}} * 100%))', opacity: '0' }),
        animate(
          '300ms cubic-bezier(0.970, -0.080, 0.555, 1.160)',
          style({ transform: 'translateY(0)', opacity: '1' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '300ms cubic-bezier(0.970, -0.080, 0.555, 1.160)',
          style({ transform: 'translateY(calc({{dir}} * -100%))', opacity: '0' })
        ),
      ],
      { optional: true }
    ),
  ]),
];
const fadeIn = [
  query(':enter, :leave', style({ position: 'fixed' }), { optional: true }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(0px) scale(1.2)', opacity: '0' }),
        group([
          animate(
            '500ms 400ms cubic-bezier(0,.5,.2,1)',
            style({ transform: 'translateX(0) scale(1)' })
          ),
          animate('1s 400ms cubic-bezier(0,.5,.2,1)', style({ opacity: '1' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
];

export const slideInAnimation = trigger('routeAnimations', [
  transition('initial => *', fadeIn),
  transition('* <=> *', slideUpDown),
]);
