import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModalModule} from '@ng-bootstrap';
import {UserService} from './services/user.service';
import {MessageService} from './services/message.service';
import {AuthGuardService} from './services/auth-guarg.service';
import {StorageService} from './services/storage.service';
import {SessionService} from './services/session.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {InfoInterceptorService} from './services/info-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    HttpClient,
    AuthGuardService,
    AuthInterceptorService,
    UserService,
    MessageService,
    SessionService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InfoInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})

export class AppModule {
}
