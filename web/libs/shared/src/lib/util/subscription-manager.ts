import { Subscription } from 'rxjs';

export class SubscriptionManager {
  private readonly subscriptions = new Array<Subscription>();

  public add(sub: Subscription) {
    if (!this.subscriptions.some(x => x === sub)) {
      this.subscriptions.push(sub);
    }
  }

  public unsubscribeAll() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
