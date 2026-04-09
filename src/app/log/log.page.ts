import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule]
})
export class LogPage implements OnInit {

  workoutHistory: any[] = [];

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.loadHistory();
  }

  async loadHistory() {
    this.workoutHistory = await this.storageService.getWorkoutHistory();
  }

  async clearHistory() {
    await this.storageService.clearHistory();
    this.workoutHistory = [];
  }

  goBack() {
    this.router.navigate(['/workout']);
  }
}