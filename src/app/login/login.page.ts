import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitAttempt: boolean;
  user: any;

  constructor(private toast: ToastController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.checkLogin();
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  checkLogin() {
    let user = this.authService.isAuthenticated();
    if (user) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  };

  signIn() {
    this.submitAttempt = true;
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    this.authService.signIn(
      {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe(user => {
        // console.log(JSON.stringify(user));
        this.user = user;
        // this.presentToast(JSON.stringify(user));
        this.router.navigate(['/tabs/tab1'])
      }, error => {
        console.log('Error: ' + error)
        this.presentToast(JSON.stringify(error));
      });
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
