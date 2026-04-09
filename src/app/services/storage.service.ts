import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async saveWorkout(workout: any) {
    const existing = await this.storage.get('workoutHistory') || [];
    existing.push(workout);
    await this.storage.set('workoutHistory', existing);
  }

  async getWorkoutHistory(): Promise<any[]> {
    return await this.storage.get('workoutHistory') || [];
  }

  async clearHistory() {
    await this.storage.remove('workoutHistory');
  }
}