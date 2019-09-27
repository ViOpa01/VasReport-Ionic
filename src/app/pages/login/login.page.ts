import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';


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
  isChecked: any = localStorage.getItem('rememberMe');
  username: any = localStorage.getItem('username');

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public loader: LoaderService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
    
  }


  ngOnInit() {
    // this.hideShowPassword();
  }
  checkBox(ev) {
    this.isChecked = ev.detail.checked;
    if (this.isChecked) {
      localStorage.setItem('remeberMe', ev.detail.checked);
      // console.log('i will save the value', this.isChecked);
    } else {
      localStorage.removeItem('remeberMe');
      // console.log('I will remove the value', this.isChecked);
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
        // console.log(JSON.stringify(user));
        //hide loader and navigate to dash board Page
        this.user = user;
        // localStorage.setItem('username', this.loginForm.value.email);
        this.loader.hideLoader();
        this.router.navigate(['/tabs/tab1']);

      }, error => {
        // console.log('Error: ' + JSON.stringify(error.error.error));
        this.loader.presentToast(error.error.error);
        this.loader.hideLoader();

      });
  }


}
