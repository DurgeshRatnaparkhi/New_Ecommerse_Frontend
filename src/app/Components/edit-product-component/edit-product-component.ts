import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-component',
  standalone: false,
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
})
export class EditProductComponent implements OnInit {

  id!: number;
  product: any = {};
  selectedImage: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(this.id).subscribe({
      next: (res) => this.product = res,
      error: () => alert("Unable to load product")
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  updateProduct() {
    this.productService.updateProduct(this.id, this.product, this.selectedImage!)
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Product updated successfully', 'success');
          this.router.navigate(['/admin/products']);
        },
        error: () => alert("Failed to update product")
      });
  }
}
