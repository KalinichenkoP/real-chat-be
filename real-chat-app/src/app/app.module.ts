import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import { ROUTES} from './app-routing.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import {MessageService} from './services/message.service';
import {LandingModule} from "./landing/landing.module";
import {ChatModule} from "./chat/chat.module";
import {RouterModule} from "@angular/router";
// import {AuthGuardService} from './services/auth-guarg.service';
// import {StorageService} from './services/storage.service';
// import {SessionService} from './services/session.service';
// import {AuthInterceptorService} from './services/auth-interceptor.service';
// import {InfoInterceptorService} from './services/info-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule.forRoot(),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    HttpClient,
    // AuthGuardService,
    // AuthInterceptorService,
    UserService,
    MessageService,
    // SessionService,
    // StorageService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InfoInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]

})

export class AppModule {
}
