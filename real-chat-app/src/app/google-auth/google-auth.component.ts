import { SpinnerService } from "../extra-services/loading-spinner.service";
import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { NotifierService } from "../notifier/notifier.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

// same as for 'auth.service'
declare const gapi: any;

/**
 * Component that deals with authorization.
 * Allows to sign in, handles errors, redirects further if user is valid.
 */
@Component({
  selector: "app-google-auth",
  templateUrl: "./google-auth.component.html",
  styleUrls: ["./google-auth.component.css"]
})
export class GoogleAuthComponent implements OnInit, OnDestroy {
  // subscription for 'GAPI ready' event
  private gapiSubscription: Subscription;

  constructor (
    private gaService: AuthService,
    private notify: NotifierService,
    private router: Router,
    private zone: NgZone,
    private spinner: SpinnerService
  ) { }

  /**
   * Try to sign in with Google.
   * User has to specify Google account; his email will be used to authorize him.
   * If signed in already, will proceed to the next stage.
   */
  public async signIn () : Promise<void> {
    this.spinner.start();

    const isSignedIn = gapi.auth2
      .getAuthInstance()
      .isSignedIn.get();

    if (isSignedIn) {
      return this.proceedWhenSignedIn();
    }

    // options of how to interact with user:
    // display popup with proposal of choosing an account
    const signInOptions = {
      "ux_mode": "popup",
      "prompt": "select_account"
    };

    // perform actual sign in attempt
    gapi.auth2
      .getAuthInstance()
      .signIn(signInOptions)
      .then (
        this.proceedWhenSignedIn.bind(this),
        this.processAuthFailure.bind(this)
      );
  }

  /**
   * Success callback for Google sign in.
   * Verifies user; then, if everything is correct, redirects him to 'Staff' page;
   * otherwise, displays error and logs him out.
   */
  private async proceedWhenSignedIn () : Promise<void> {
    // getting auth response from Google
    const authResponse = gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse(true);

    try {
      // verifying user
      console.log(authResponse);
      await this.gaService.verifyGAToken(authResponse["id_token"]);
      // since this method is used as a callback for an action,
      // that takes place outside of Angular scope,
      // we have to use 'zone' to make 'router' actually work
      this.zone.run(() => { this.router.navigateByUrl(""); });
      this.spinner.stop();
    } catch (err) {
      // failing token verification means that
      // user with specified email is absent in employees' database
      this.notify.failure("There was an error: probably, user not found. Make sure you use corporate email.");

      this.notify.debug(err);

      // in this case we sign user out from Google
      // in order to give him possibility to choose other account
      gapi.auth2.getAuthInstance().signOut();
    }
  }

  /**
   * Failure callback for Google sign in.
   * Displays message according to failure reason.
   */
  private processAuthFailure (reason: { error: string }) : void {
    this.spinner.stop();
    switch (reason.error) {
      case "popup_closed_by_user":
        this.notify.failure("You have to specify account!");
        break;
      case "access_denied":
        this.notify.failure("You have to give requested permissions!");
        break;
      default:
      case "immediate_failed":
        this.notify.failure("Failed to auth immediately");
        break;
    }
  }

  ngOnInit() {
    // on component init, check: is user is already signed in,
    // bring him to the next stage
    this.gapiSubscription = this.gaService.gapiReady
      .subscribe((isGAPIReady: boolean) => {
        if (isGAPIReady) {
          const isSignedIn = gapi.auth2
            .getAuthInstance()
            .isSignedIn.get();

          if (isSignedIn) {
            this.spinner.start();
            this.proceedWhenSignedIn();
          }
        }
      });
  }

  ngOnDestroy() {
    this.gapiSubscription.unsubscribe();
  }
}
