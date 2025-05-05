import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzczNzk5NDllMDY1ZjJiNDVjNjczZTJiOWMwNGJiNSIsIm5iZiI6MS43NDU5NjU4OTM4NDYwMDAyZSs5LCJzdWIiOiI2ODExNTM0NTJjZTkyMGQwYmQ4MGRkOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZtZ2Rta4owcvoeLhrRNR4_EMIrYJo_dTmKLV1JNUQRU'; // seu token completo
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Busca lista de gêneros
  getGeneros(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/genre/movie/list`, { headers });
  }

  // Busca filmes por gênero
  buscarFilmesPorGenero(idGenero: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(`${this.apiUrl}/discover/movie`, {
      headers,
      params: {
        with_genres: idGenero.toString(),
        language: 'pt-BR'
      }
    });
  }
}
