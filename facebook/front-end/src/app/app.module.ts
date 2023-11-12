import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/user/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './store/user/user.effects';
import { CoreModule } from './core/core.module';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FileUploadService } from './core/services/file.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AngularFireModule.initializeApp({
      projectId: 'facebook-c4d8b',
      appId: '1:850090759577:web:2c91d546ae187f49deef08',
      storageBucket: 'facebook-c4d8b.appspot.com',
      apiKey: 'AIzaSyCbOAU012VQPG4aiDgcHsM20S2vSLBHk-I',
      authDomain: 'facebook-c4d8b.firebaseapp.com',
      messagingSenderId: '850090759577',
    }),
    AngularFireStorageModule
  ],
  providers: [UserService, AuthService, FileUploadService],
  bootstrap: [AppComponent],
})
export class AppModule {}
//provideFirebaseApp(() => initializeApp({"projectId":"facebook-c4d8b","appId":"1:850090759577:web:2c91d546ae187f49deef08","storageBucket":"facebook-c4d8b.appspot.com","locationId":"us-central","apiKey":"AIzaSyCbOAU012VQPG4aiDgcHsM20S2vSLBHk-I","authDomain":"facebook-c4d8b.firebaseapp.com","messagingSenderId":"850090759577"})),
