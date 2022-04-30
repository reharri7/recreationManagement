import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import IUser from '../models/user.model';
import {delay, filter, map, switchMap} from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private usersCollection: AngularFirestoreCollection<IUser>;
  private redirect = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthenticated$ = afAuth.user.pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
    this.router.events.pipe(
      filter( e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      // eslint-disable-next-line @typescript-eslint/no-shadow
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.redirect = data.authOnly ?? false;
    });
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided');
    }
    const userCred = await this.afAuth.createUserWithEmailAndPassword(
      userData.email, userData.password
    );
    if (!userCred.user) {
      throw new Error('User can\'t be found');
    }
    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
    });
  }

  // Firebase SignInWithPopup
  public async oAuthProvider(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((res) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      }).catch((error) => {
        window.alert(error);
      });
  }
  // Firebase Google Sign-in
  public async signInWithGoogle() {
    return this.oAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        console.log('Successfully logged in!');
      }).catch(error => {
        console.log(error);
      });
  }

  public async logout($event?: Event) {
    if($event){
      $event.preventDefault();
    }
    await this.afAuth.signOut();
    if(this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }

}
