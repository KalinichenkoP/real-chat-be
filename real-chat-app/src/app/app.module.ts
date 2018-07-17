import {NgModule} from '@angular/core';
// import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {ROUTES} from './app-routing.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './services/user.service';
import {MessageService} from './services/message.service';
import {LandingModule} from './landing/landing.module';
import {ChatModule} from './chat/chat.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from './google-auth/auth.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
// import {AuthGuardService} from './services/auth-guarg.service';
// import {StorageService} from './services/storage.service';
// import {SessionService} from './services/session.service';
// import {AuthInterceptorService} from './services/auth-interceptor.service';
// import {InfoInterceptorService} from './services/info-interceptor.service';
import {HttpClient} from './extra-services/http-client.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {NotifierService} from './notifier/notifier.service';
import {SpinnerService} from './extra-services/loading-spinner.service';
import {ChatService} from './services/chat.service';
import {AccessInterceptorService} from './services/access.interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    AuthService,
    HttpClient,
    NotifierService,
    SpinnerService,
    ChatService,
    // AuthGuardService,
    // AuthInterceptorService,
    UserService,
    MessageService,

    // SessionService,
    // StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessInterceptorService,
      multi: true
    },
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
