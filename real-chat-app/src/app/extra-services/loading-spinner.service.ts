import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service allows to control rendering of loading spinner.
 * It exposes methods to start and stop spinning,
 * and emits socket when they are called (AppComponent listens to them
 * and shows or hides spinner overlay).
 */
@Injectable()
export class SpinnerService {
    // amount of spinners started
    private spinnersAmount: number = 0;

    // behaviour subject firing true / false
    // depending on if spinner should be displayed
    private loadingBehaviourSubject = new BehaviorSubject<boolean>(false);

    // observable for 'is loading' event
    public isSpinning = this.loadingBehaviourSubject.asObservable();

    constructor () {}

    /**
     * Start spinner (show spinner overlay).
     */
    public start () : void {
        // more than one loading processes can be started at the same time
        this.spinnersAmount++;
        this.loadingBehaviourSubject.next(true);
    }

    /**
     * Stop spinner (hide spinner overlay).
     */
    public stop () : void {
        // we actually should hide overlay only if there are none spinners left;
        // look below for details
        if (!--this.spinnersAmount) {
            this.loadingBehaviourSubject.next(false);
        }
    }

    // explaining reasons of calculating amount of spinners; let's think of situation like following:
    // loading process #1 starts, loading process #2 starts, loading process #1 ends, loading process #2 ends;
    // we receive signal that loading process #1 ended and hide spinner, even though process #2 is still in progress;
    // hiding overlay only when all loading processes are finished prevents us from such situations
}
