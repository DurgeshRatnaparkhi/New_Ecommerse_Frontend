import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product-service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list-component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading = true;
  error = '';

  keyword = '';
page = 0;
size = 5;

totalPages = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

loadProducts() {
  this.loading = true;

  this.productService.getProductsPaginated(this.keyword, this.page, this.size)
    .subscribe({
      next: (res: any) => {
        this.products = res.content;        // Page content
        this.totalPages = res.totalPages;   // Total pages
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
}


  search() {
  this.page = 0;
  this.loadProducts();
}

nextPage() {
  if (this.page + 1 < this.totalPages) {
    this.page++;
    this.loadProducts();
  }
}

prevPage() {
  if (this.page > 0) {
    this.page--;
    this.loadProducts();
  }
}

  getImageUrl(id?: number) {
    if (!id) return 'assets/no-image.png';
    return this.productService.getProductImageUrl(id);
  }

onImageError(event: any) {
  if (!event.target.dataset.failed) {
    event.target.dataset.failed = "true";
    event.target.src = 'assets/no-image.png';
  }
}

 
  goToAdd() {
    // ✔ You are inside "admin" child routes
    this.router.navigate(['/admin/add-product']);
  }

  // ✅ UPDATE PRODUCT (Navigate to Edit Component)
  editProduct(id: number) {
    this.router.navigate(['/admin/edit-product', id]);
  }

  // ✅ DELETE PRODUCT
  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
          Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        },
        error: () => alert("Error deleting product")
      });
    }

}

selectedImage: string | null = null;

openImage(imgUrl: string) {
  this.selectedImage = imgUrl;
}

closeImage() {
  this.selectedImage = null;
}

}
