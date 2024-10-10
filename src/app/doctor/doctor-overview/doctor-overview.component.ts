import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { DoctorServiceService } from '../../services/doctor-details/doctor-service.service';

@Component({
  selector: 'app-doctor-overview',
  templateUrl: './doctor-overview.component.html',
  styleUrls: ['./doctor-overview.component.css']
})
export class DoctorOverviewComponent {
  constructor(private router: Router, private doctorService: DoctorServiceService) {}

  activeComponent: string = 'availability';
  isEditMode: boolean = false;

  newDoctor: Doctor = {
    name: '',
    qualification: '',
    departmentId: 0,
    departmentName: '',
    phone_number: '',
    email: '',
    availabilityDays: {
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
    },
    availableFrom: '',
    slotDuration: 20,
    availability: [],
  };

  showDoctorAvailability() {
    this.activeComponent = 'availability';
  }

  showDoctorDetails() {
    this.activeComponent = 'details';
  }

  showDoctorForm() {
    this.activeComponent = 'form';
  }

  // Save doctor (either add new or update existing)
  onSaveDoctor(doctor: Doctor): void {
    console.log('Doctor to save:', doctor);
    doctor.slotDuration = Number(doctor.slotDuration);
    if (!doctor.departmentName || !doctor.departmentId) {
      console.error('Department must be selected.');
      return;
    }
    // if (!doctor.name || !doctor.email || !doctor.phone_number || !doctor.departmentName || !doctor.qualification || !doctor.availableFrom || !doctor.slotDuration) {
    //   console.error('All fields are required.');
    //   return;
    // }
    if (this.activeComponent === 'form' && !this.isEditMode) {
      // Logic to add the new doctor
      this.doctorService.createDoctor(doctor).subscribe(
        () => {
          doctor.slotDuration = Number(doctor.slotDuration); // Convert slot duration to number
          console.log('New doctor saved successfully:', doctor);
          // Redirect or update UI after successful save
          this.activeComponent = ''; // Close the form after save

        },
        (error) => {
          console.error('Error saving new doctor:', error);
        }
      );
      
    } else if (this.isEditMode) {
      // Logic to update the existing doctor
      this.doctorService.updateDoctor(doctor).subscribe(
        () => {
          console.log('Doctor updated successfully:', doctor);
          // Redirect or update UI after successful update
          this.activeComponent = ''; // Close the form after update
        },
        (error) => {
          console.error('Error updating doctor:', error);
        }
      );
    }
  }

  // Cancel the form action
  onCancelForm(): void {
    this.activeComponent = ''; // Hide the form component on cancel
  }
}
