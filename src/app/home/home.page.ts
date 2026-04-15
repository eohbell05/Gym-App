import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../services/user-profile.service';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, FormsModule, CommonModule],
})
export class HomePage {

  currentStep = 0;

  name = '';
  age = '';
  gender = '';
  goal = '';
  fitnessLevel = '';
  weight = '';
  height = '';
  daysPerWeek = '';

  constructor(private router: Router, private userProfile: UserProfileService) {}

async selectOption(field: string, value: string) {
  (this as any)[field] = value;
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch (e) {}
  this.currentStep++;
}

  nextStep() {
    this.currentStep++;
  }

  goToWorkout() {
    this.userProfile.saveProfile({
      name: this.name,
      age: this.age,
      gender: this.gender,
      goal: this.goal,
      fitnessLevel: this.fitnessLevel,
      weight: this.weight,
      height: this.height,
      daysPerWeek: this.daysPerWeek
    });
    this.router.navigate(['/workout']);
  }

  ionViewWillEnter() {
  this.currentStep = 0;
}
}