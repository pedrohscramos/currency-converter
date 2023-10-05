import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CurrencyApiService } from 'src/app/service/currency-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public getCurrencies: any[] = [];

  constructor(
    private currencyApiService: CurrencyApiService,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.getCurrencyData();
  }

  getCurrencyData(): void{
  this.currencyApiService.getCurrencyConversion().subscribe((data: any[]) => {
    this.getCurrencies = data.map(currencyObj => {
      const key = Object.keys(currencyObj)[0];

      const currencyInfo = currencyObj[key];

      const data = new Date(currencyInfo.timestamp * 1000);
      const horas = data.getHours();
      const minutos = data.getMinutes();
      const segundos = data.getSeconds();

      const horaFormatada = `${horas}:${minutos}:${segundos}`;
    
      return {
        nome: currencyInfo.name.replace('/Real Brasileiro', ''),
        valorAtual: currencyInfo.bid,
        variacao: currencyInfo.pctChange,
        horaConsulta: currencyInfo.create_date,
        horaAtualizacao: horaFormatada,
        isLoading: false
      };
    }
  );
})
 }

 isLoading(index:number): boolean {
   this.currencyApiService.isLoading();
   return this.getCurrencies[index].isLoading;
 }

}
