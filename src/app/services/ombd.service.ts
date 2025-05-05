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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  // Séries populares
  getPopularSeries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }

  // Filmes populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }

  // Filmes em cartaz
  getNowPlaying(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?language=pt-BR&region=BR`, {
      headers: this.getHeaders(),
    });
  }

  // Buscar filmes
  searchMovie(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }

  // Buscar séries
  searchTVShow(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/tv?language=pt-BR&query=${query}`, {
      headers: this.getHeaders(),
    });
  }
}
