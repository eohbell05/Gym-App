import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  name = '';
  age = '';
  gender = '';
  goal = '';
  fitnessLevel = '';
  weight = '';
  height = '';
  daysPerWeek = '';

  saveProfile(data: Partial<UserProfileService>) {
    Object.assign(this, data);
  }
}