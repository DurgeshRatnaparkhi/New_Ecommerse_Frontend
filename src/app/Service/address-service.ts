import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

   private baseUrl = 'http://localhost:8081/api/user/addresses';

  constructor(private http: HttpClient) {}

  getUserAddresses(newAddress: { fullName: string; mobile: string; street: string; city: string; state: string; pincode: string; }) {
    return this.http.get<Address[]>(this.baseUrl);
  } 
  
  saveAddress(address: Address): Observable<Address> {
  return this.http.post<Address>(`${this.baseUrl}`, address);
}
}
