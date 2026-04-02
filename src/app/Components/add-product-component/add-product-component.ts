import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product-service';

import Swal from 'sweetalert2';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent {

  productForm!: FormGroup;
  selectedImage!: File;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      sku: ['', Validators.required],
      isActive: [true]
    });
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  submit() {
    if (this.productForm.invalid) {
      Swal.fire('Missing Fields', 'Please fill all fields', 'warning');
      return;
    }

    if (!this.selectedImage) {
      Swal.fire('Image Required', 'Please select an image', 'info');
      return;
    }

    const product: Product = this.productForm.value;

    this.productService.addProduct(product, this.selectedImage).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Product added successfully', 'success');
        this.router.navigate(['/admin/products']);

        this.productForm.reset();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to add product', 'error');
      }
    });
  }

  
}
