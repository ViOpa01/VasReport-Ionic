import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitAttempt: boolean;
  user: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  backButtonSubscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public loader: LoaderService,
    private navController: NavController) {
    this.checkAuth();
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });

  }

  checkAuth() {
    let state = this.authService.isAuthenticated();
    if (state) {
      this.navController.navigateRoot(['/tabs/tab1']);
    } else {
      this.navController.navigateRoot('login')
    }
  }

  ngOnInit() {
    // this.hideShowPassword();
  }
  ngOnDestroy() {
    navigator['app'].exitApp();
  }

  ionViewWillEnter() {
    if (localStorage.getItem('firstTime')) {
      if (this.authService.isAuthenticated()) {
        navigator['app'].exitApp();
      }
    } else {
      this.router.navigate(['tabs/tab1']);
    }

  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
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
    this.loader.showLoader();
    this.authService.signIn(
      {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe(user => {
        localStorage.setItem('firstTime', 'true')
        // console.log(JSON.stringify(user));
        //hide loader and navigate to dash board Page
        this.user = user;
        this.loader.hideLoader();
        this.router.navigate(['/tabs/tab1']);

      }, error => {
        this.loader.hideLoader();
        console.log('Error: ' + JSON.stringify(error.error.error));
        this.loader.presentToast(error.error.error);
      });
  }


}
