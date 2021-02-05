import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    token: string = null;

    constructor(
        private http: HttpClient, 
        private router: Router){}
    
    signup(email: string, password: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAz5r8s6k-DKg_VFIsJGOdtm9M4pEKM6Lc',
        {email: email,
        password: password,
        returnSecureToken: true}
        ).pipe(catchError(this.handleError), tap(errorRes => {
            this.handleAuthentication(resData.email, resData.localId, resData.expiresIn, resData.idToken);
        })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAz5r8s6k-DKg_VFIsJGOdtm9M4pEKM6Lc',
        {email: email,
        password: password,
        returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(errorRes => {
            this.handleAuthentication(resData.email, resData.localId, resData.expiresIn, resData.idToken);
        }));
    }

    autoLogin(){
        const userData: {
            email:string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = 
            new Date(userData._tokenExpirationDate).getTime() - 
            new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
       this.tokenExpirationTimer = setTimeout(()=> {
            this.logout();
        }, 2000
        );
    }

    private handleAuthentication (email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
            const user = new User(email, userId, idToken, expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        if (errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
            
        }
        switch (errorRes.error.message){
            case 'Email Exists':
            errorMessage = 'This email exists already';
            break;
            case 'EMAIL NOT FOUND':
            errorMessage = 'This email does not exist'
            break;
            case 'INVALID PASSWORD':
            errorMessage = 'This password is invalid'

        }
        return throwError(errorMessage);
    }

    ));
    }
}