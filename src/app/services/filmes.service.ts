import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  /**
   * Serviço para consumo da API de filmes (TMDb)
   * 
   * Métodos disponíveis:
   * getters
   * 
   * getGeneros(): Observable<any>
   * - Busca a lista completa de gêneros de filmes
   * - Retorna um Observable com o array de gêneros
   * - Requer autenticação via token no header
   * 
   * buscarFilmesPorGenero(idGenero: number): Observable<any>
   * - Busca filmes filtrados por ID de gênero
   * - Parâmetros:
   *   - idGenero: número ID do gênero (ex: 28 para Ação)
   * - Configurações:
   *   - Idioma: pt-BR (português do Brasil)
   *   - Autenticação via token no header
   * - Retorna Observable com array de filmes correspondentes
   * 
   * Exemplo de uso no componente:
   * this.filmesService.getGeneros().subscribe(generos => {...});
   * this.filmesService.buscarFilmesPorGenero(28).subscribe(filmes => {...});
   */

  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzczNzk5NDllMDY1ZjJiNDVjNjczZTJiOWMwNGJiNSIsIm5iZiI6MS43NDU5NjU4OTM4NDYwMDAyZSs5LCJzdWIiOiI2ODExNTM0NTJjZTkyMGQwYmQ4MGRkOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZtZ2Rta4owcvoeLhrRNR4_EMIrYJo_dTmKLV1JNUQRU'; // seu token completo
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}
   //metodos get:
  
  // Busca lista de gêneros: metodos que busca os filmes da api e retorna na pagina
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
