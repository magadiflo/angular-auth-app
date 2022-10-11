import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, tap } from 'rxjs';

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
          console.log(resp);
          if (resp.ok) {
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(false)),
      );
  }

}
