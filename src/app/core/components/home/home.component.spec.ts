import { registerLocaleData } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyApiService } from 'src/app/service/currency-api.service';
import { HomeComponent } from './home.component';

registerLocaleData(localePt);
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: CurrencyApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyApiService, { provide: LOCALE_ID, useValue: 'en-US' }],
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent]
    });
    service = TestBed.inject(CurrencyApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o nome da moeda', () => {
    component.getCurrencies = [
      { nome: 'Dólar', valorAtual: 5.55, variação: 0.05, horaConsulta: '2023-10-05' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-header').textContent).toContain('Dólar');
  });

  it('deve exibir o simbolo da moeda', () => {
    component.getCurrencies = [
      { nome: 'Dólar', valorAtual: 5.55, variação: 0.05, horaConsulta: '2023-10-05' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-content').textContent).toContain('R$');
  });
  
});
