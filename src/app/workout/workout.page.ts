import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { UserProfileService } from '../services/user-profile.service';
import { ExerciseService } from '../services/exercise.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner, CommonModule]
})
export class WorkoutPage implements OnInit {

  exercises: any[] = [];
  isLoading = true;
  errorMessage = '';
  workoutSaved = false;

  constructor(
    public userProfile: UserProfileService,
    private exerciseService: ExerciseService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises() {
    this.exerciseService.getExercises().subscribe({
      next: (data: any[]) => {
        const filtered = data.filter((ex: any) =>
          ex.category === this.getMuscleGroup()
        ).slice(0, 8);
        this.exercises = filtered;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load exercises. Please try again.';
        this.isLoading = false;
      }
    });
  }

  getMuscleGroup(): string {
    const goal = this.userProfile.goal;
    if (goal === 'Build Muscle') return 'strength';
    if (goal === 'Lose Weight') return 'cardio';
    return 'stretching';
  }

  async saveWorkout() {
    const workout = {
      date: new Date().toLocaleDateString(),
      goal: this.userProfile.goal,
      fitnessLevel: this.userProfile.fitnessLevel,
      exercises: this.exercises.map((ex: any) => ex.name)
    };
    await this.storageService.saveWorkout(workout);
    this.workoutSaved = true;
  }

  goToLog() {
    this.router.navigate(['/log']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}