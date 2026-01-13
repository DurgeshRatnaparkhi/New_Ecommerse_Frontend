import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth-service';
import { ProductService } from '../../Service/product-service';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../Service/cart-service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class User implements OnInit {

  currentPage = 1;
itemsPerPage = 6; // show 6 products at a time


  allProducts: Product[] = [];

  searchText = '';


  cartCount = 0;
selectedCategory = '';
sortOption = '';

  name = localStorage.getItem('name');
  products: Product[] = [];
  loading = true;
  error = "";
  showMenu = false;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService

  ) {}

  ngOnInit(): void {
    this.loadProducts();
     this.cartService.getCart().subscribe(); // load cart

  // subscribe to live cart count updates
  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });
  }

  toggleMenu() {
  this.showMenu = !this.showMenu;
}

 loadProducts() {
  this.productService.getAllProductsForUser().subscribe({
    next: (res) => {
      this.allProducts = res; // keep original list
      this.products = res;    // UI list
      this.loading = false;
    },
    error: () => {
      this.error = "Failed to load products";
      this.loading = false;
    }
  });
}


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

orderNow(p: Product) {
  this.cartService.addToCart(p.id, 1).subscribe({
    next: () => {
      alert("Added to cart!");
    },
    error: (err) => {
      console.log("Error adding to cart", err);
      alert("Failed to add to cart");
    }
  });
}


  goToCart() {
  this.router.navigate(['/cart']);
}

  getImage(id: number) {
  return this.productService.getProductImageUrl(id);
}


filterProducts() {
  if (!this.selectedCategory) {
    this.products = this.allProducts; // reset
    return;
  }

  this.products = this.allProducts.filter(p =>
    p.category?.toLowerCase() === this.selectedCategory.toLowerCase()
  );
}


sortProducts() {
  if (this.sortOption === 'low') {
    this.products = [...this.products].sort((a, b) => a.price - b.price);
  } 
  else if (this.sortOption === 'high') {
    this.products = [...this.products].sort((a, b) => b.price - a.price);
  }
}


searchProducts() {
  const text = this.searchText.toLowerCase();

  if (!text) {
    this.products = this.allProducts; // reset
    return;
  }

  this.products = this.allProducts.filter(p =>
    (p.name?.toLowerCase().includes(text) ?? false) ||
    (p.brand?.toLowerCase().includes(text) ?? false) ||
    (p.description?.toLowerCase().includes(text) ?? false)
  );
}

get paginatedProducts() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.products.slice(start, end);
}

get totalPages() {
  return Math.ceil(this.products.length / this.itemsPerPage);
}



}
