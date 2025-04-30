
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OmbdService {
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzczNzk5NDllMDY1ZjJiNDVjNjczZTJiOWMwNGJiNSIsIm5iZiI6MS43NDU5NjU4OTM4NDYwMDAyZSs5LCJzdWIiOiI2ODExNTM0NTJjZTkyMGQwYmQ4MGRkOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZtZ2Rta4owcvoeLhrRNR4_EMIrYJo_dTmKLV1JNUQRU';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Buscar filmes em cartaz
  getNowPlaying(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(`${this.apiUrl}/movie/now_playing?language=pt-BR&region=BR`, { headers });
  }

  // Buscar filmes por nome (pesquisa)
  searchMovie(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(`${this.apiUrl}/search/movie?language=pt-BR&query=${query}`, { headers });
  }
}
