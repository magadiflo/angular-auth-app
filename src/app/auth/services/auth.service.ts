import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, tap, throwError, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url: string = environment.baseUrl;
  private _usuario!: Usuario;

  public get usuario(): Usuario {
    return { ...this._usuario }; //*retoramos una copia y evitamos problemas de referencia (si ocurre el caso) al hacer manipulación de esta propiedad (opcional)
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.url}/auth`, { email, password })
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => throwError(() => err.error)),
      );
  }

  logout(): void {
    localStorage.removeItem('token');//* Solo eliminará el token del localStorage
    localStorage.clear(); //* Nos aseguramos y eliminamos cualquier cosa que esté en el localstorage (eso incluía el token, aunque lo eliminamos en la línea anterior)
  }

  validarToken(): Observable<boolean> {
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(`${this.url}/auth/renew`, { headers })
      .pipe(
        map(res => {
          localStorage.setItem('token', res.token!);
          this._usuario = {
            name: res.name!,
            uid: res.uid!,
          }
          return res.ok;
        }),
        catchError(err => of(false))
      );
  }

}
