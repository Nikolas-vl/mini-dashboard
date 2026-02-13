import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should perform a typed GET request', () => {
    interface TestResponse { id: number; name: string; }

    const mockResponse: TestResponse = { id: 1, name: 'Test User' };
    let result: TestResponse | undefined;

    service.get<TestResponse>('/api/test').subscribe(res => (result = res));

    const req = httpMock.expectOne('/api/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);
  });
});
