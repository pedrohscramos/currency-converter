import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyApiService } from './currency-api.service';

describe('CurrencyApiService', () => {
  let service: CurrencyApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyApiService]
    });
    service = TestBed.inject(CurrencyApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCurrencyConversion should return real currency', () => {
    const mockResponse = [
      {
        "CADBRL": {
          "code": "CAD",
          "codein": "BRL",
          "name": "Dólar Canadense/Real Brasileiro",
          "high": "3.7736",
          "low": "3.7405",
          "varBid": "0.0195",
          "pctChange": "0.52",
          "bid": "3.7654",
          "ask": "3.771",
          "timestamp": "1696519818",
          "create_date": "2023-10-05 12:30:18"
        }
      },
      {
        "ARSBRL": {
          "code": "ARS",
          "codein": "BRL",
          "name": "Peso Argentino/Real Brasileiro",
          "high": "0.0148",
          "low": "0.0147",
          "varBid": "0.0001",
          "pctChange": "0.68",
          "bid": "0.0148",
          "ask": "0.0148",
          "timestamp": "1696519809",
          "create_date": "2023-10-05 12:30:09"
        }
      },
      {
        "GBPBRL": {
          "code": "GBP",
          "codein": "BRL",
          "name": "Libra Esterlina/Real Brasileiro",
          "high": "6.3039",
          "low": "6.2461",
          "varBid": "0.0352",
          "pctChange": "0.56",
          "bid": "6.2924",
          "ask": "6.2961",
          "timestamp": "1696519818",
          "create_date": "2023-10-05 12:30:18"
        }
      }
    ];

    service.getCurrencyConversion().subscribe(data => {
      expect(data).toEqual(mockResponse);
      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual('Dólar Canadense/Real Brasileiro');
    });

    const reqCad = httpTestingController.expectOne('https://economia.awesomeapi.com.br/last/CAD-BRL');
    expect(reqCad.request.method).toEqual('GET');
    expect(reqCad.cancelled).toBeFalsy();
    expect(reqCad.request.responseType).toEqual('json');
    
    const reqArs = httpTestingController.expectOne('https://economia.awesomeapi.com.br/last/ARS-BRL');
    expect(reqArs.request.method).toEqual('GET');
    expect(reqArs.cancelled).toBeFalsy();
    expect(reqArs.request.responseType).toEqual('json');

    const reqGbp = httpTestingController.expectOne('https://economia.awesomeapi.com.br/last/GBP-BRL');
    expect(reqGbp.request.method).toEqual('GET');
    expect(reqGbp.cancelled).toBeFalsy();
    expect(reqGbp.request.responseType).toEqual('json');

    


    
    
    reqGbp.flush(mockResponse);
  });
});
