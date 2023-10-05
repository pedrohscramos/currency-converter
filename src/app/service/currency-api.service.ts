import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, shareReplay, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  private url: string = 'https://economia.awesomeapi.com.br/last/';
  private currencyData$: Observable<any> | undefined;
  private loading = false;

  constructor(
    private http: HttpClient
  ) { }


  getCurrencyConversion():Observable<any> {
    if(!this.currencyData$){
      this.loading = true;

      const currencies = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
      const requests = currencies.map(currency => this.http.get(`${this.url}${currency}`));
      this.currencyData$ = forkJoin(requests).pipe(
        shareReplay(1),
        switchMap(() =>
        timer(0, 3 * 60 * 1000).pipe(
          switchMap(() => {
            this.loading = true;
            return forkJoin(requests)
          }),
          switchMap(data => {
            this.loading = false;
            return forkJoin(requests);
          })
        )
        )
      );
    }
    return this.currencyData$;
    
  }

 /* getCurrencyConversion():Observable<any> {
    if(!this.currencyData$){
      this.loading = true;
    
    const currencies = ['CAD-BRL', 'ARS-BRL', 'GBP-BRL'];
    const requests = currencies.map(currency => this.http.get(`${this.url}${currency}`));

    this.currencyData$ = forkJoin(requests).pipe(
      shareReplay(1), // Cache com capacidade para um item
        switchMap(() =>
          timer(0, 3 * 60 * 1000).pipe( // Atualiza a cada 3 minutos
            switchMap(() => {
              this.loading = true; // Ativar o indicador de carregamento
              return forkJoin(currencies.map(currency => this.http.get(`${this.url}${currency}`)));
            }),
            // Desativar o indicador de carregamento quando os dados estiverem prontos
            switchMap(data => {
              this.loading = false;
              return data;
            })
            )
            )
          );
        }
  return this.currencyData$;
}*/

isLoading(): boolean {
  return this.loading;
}

}
