import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081';

  // ADMIN APIs
  private adminUrl = `${this.baseUrl}/api/admin/products`;

  // PUBLIC APIs for User Dashboard
  private publicUrl = `${this.baseUrl}/api/public/products`;

  constructor(private http: HttpClient) {}

  // ---------------------------
  // ADMIN: ADD PRODUCT
  // ---------------------------
  addProduct(product: Product, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    if (image) {
      formData.append('image', image);
    }

    return this.http.post(`${this.adminUrl}/addProducts`, formData);
  }

  // ---------------------------
  // ADMIN: GET ALL PRODUCTS
  // ---------------------------
  getAllProductsAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.adminUrl}/getAllProducts`);
  }

  // ---------------------------
  // PUBLIC: GET ALL PRODUCTS FOR USER 
  // ---------------------------
  getAllProductsForUser(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.publicUrl}/all`);
  }

  // ---------------------------
  // PUBLIC: IMAGE URL (corrected)
  // ---------------------------
 getProductImageUrl(id: number): string {
  return `http://localhost:8081/api/public/products/image/${id}`;
}

  // ---------------------------
  // ADMIN: SEARCH PRODUCTS
  // ---------------------------
  getProductsPaginated(keyword: string, page: number, size: number) {
    return this.http.get(`${this.adminUrl}/search`, {
      params: { keyword, page, size }
    });
  }

  // ---------------------------
  // ADMIN: GET PRODUCT BY ID
  // ---------------------------
  getProductById(id: number) {
    return this.http.get(`${this.adminUrl}/getProductById/${id}`);
  }

  // ---------------------------
  // ADMIN: UPDATE PRODUCT
  // ---------------------------
  updateProduct(id: number, product: any, image?: File) {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    if (image) {
      formData.append('image', image);
    }

    return this.http.put(`${this.adminUrl}/updateProduct/${id}`, formData);
  }

  // ---------------------------
  // ADMIN: DELETE PRODUCT
  // ---------------------------
  deleteProduct(id: number) {
    return this.http.delete(`${this.adminUrl}/deleteProduct/${id}`);
  }
}
