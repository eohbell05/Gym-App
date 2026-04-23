import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner, IonModal, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { UserProfileService } from '../services/user-profile.service';
import { ExerciseService } from '../services/exercise.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonSpinner, IonModal, IonSearchbar, IonList, IonItem, IonLabel, CommonModule, FormsModule]
})
export class WorkoutPage implements OnInit {

  exercises: any[] = [];
  allExercises: any[] = [];
  filteredExercises: any[] = [];
  searchTerm = '';
  swapIndex = -1;
  isModalOpen = false;
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
        this.allExercises = data.sort((a: any, b: any) =>
          a.name.localeCompare(b.name)
        );
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

  openSwapModal(index: number) {
    this.swapIndex = index;
    this.searchTerm = '';
    this.filteredExercises = this.allExercises;
    this.isModalOpen = true;
  }

  filterExercises() {
    const term = this.searchTerm.toLowerCase();
    this.filteredExercises = this.allExercises.filter((ex: any) =>
      ex.name.toLowerCase().includes(term)
    );
  }

  swapExercise(exercise: any) {
    this.exercises[this.swapIndex] = exercise;
    this.isModalOpen = false;
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