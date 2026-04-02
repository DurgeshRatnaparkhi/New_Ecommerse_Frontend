import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Service/orderService';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})

export class AdminDashboard implements OnInit {

  stats: any;
  chart: any;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadChartData();   // 🔥 NEW
  }

  loadStats() {
    this.orderService.getDashboardStats().subscribe({
      next: (res) => {
        this.stats = res;
      }
    });
  }

  // 🔥 NEW METHOD
  loadChartData() {
    this.orderService.getOrdersChart().subscribe({
      next: (data: any) => {

        const labels = Object.keys(data);   // dates
        const values = Object.values(data); // counts

        this.createChart(labels, values);
      }
    });
  }

  createChart(labels: any, values: any) {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("ordersChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders per Day',
          data: values,
          backgroundColor: '#3b82f6'
        }]
      }
    });
  }
}
