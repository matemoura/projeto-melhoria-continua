import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = 'http://localhost:8080/api/audits';

  constructor(private http: HttpClient) {}

  submitAudit(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
