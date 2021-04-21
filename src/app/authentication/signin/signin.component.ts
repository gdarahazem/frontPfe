import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../../shared/user.service';
import {NgForm} from "@angular/forms";
import {UserModel} from "../../shared/user-model";
import {AuthService} from "../../shared/auth.service";

declare const jQuery: any;

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  un = '';
  pass = '';
  submitted = false;
  verify = true;
  user: UserModel = null;
    constructor(private router: Router,
                private r: ActivatedRoute,
                private userService: UserService,
                private authService: AuthService) { }


    ngOnInit() {
  localStorage.setItem('id', '');
  localStorage.setItem('username', '');
  localStorage.setItem('role', '');
  localStorage.setItem('connected', 'false');
  console.log('login yes ', localStorage.getItem('connected'));

      (function ($) {
            "use strict";
            /*==================================================================
            [ Focus input ]*/
            $('.input100').each(function () {
                $(this).on('blur', function () {
                    if ($(this).val().trim() != "") {
                        $(this).addClass('has-val');
                    }
                    else {
                        $(this).removeClass('has-val');
                    }
                })
            })


            /*==================================================================
            [ Validate ]*/
            var input = $('.validate-input .input100');

            $('.validate-form').on('submit', function () {
                var check = true;

                for (var i = 0; i < input.length; i++) {
                    if (validate(input[i]) == false) {
                        showValidate(input[i]);
                        check = false;
                    }
                }

                return check;
            });


            $('.validate-form .input100').each(function () {
                $(this).focus(function () {
                    hideValidate(this);
                });
            });

            function validate(input) {
                if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                    if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                        return false;
                    }
                }
                else {
                    if ($(input).val().trim() == '') {
                        return false;
                    }
                }
            }

            function showValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).addClass('alert-validate');
                $(".erroe_dis").remove();
                $(".alert-validate").append('<i class="material-icons erroe_dis">error</i>');
            }

            function hideValidate(input) {
                var thisAlert = $(input).parent();

                $(thisAlert).removeClass('alert-validate');
                $(".erroe_dis").remove();
            }

            /*==================================================================
            [ Show pass ]*/
            var showPass = 0;
            $('.btn-show-pass').on('click', function () {
                if (showPass == 0) {
                    $(this).next('input').attr('type', 'text');
                    $(this).addClass('active');
                    showPass = 1;
                }
                else {
                    $(this).next('input').attr('type', 'password');
                    $(this).removeClass('active');
                    showPass = 0;
                }

            });


        })(jQuery);

    }

  onSubmit(form: NgForm) {

    this.un = form.value.username;
    this.pass = form.value.password;
    console.log('username = ', this.un);
    console.log('password = ', this.pass);
    if (this.un === '' && this.pass === '') {
      this.verify = false;
    }
    this.userService.verifyRole(this.un, this.pass).subscribe(data => {
      this.user = data;
      console.log('dataa ', this.user);
      if (this.user == null) {
        this.verify = false;
      } else {
        this.authService.isLoginIn();
        this.verify = true;
        localStorage.setItem('id', String(this.user.id));
        localStorage.setItem('username', this.user.nom);
        localStorage.setItem('username2', this.user.prenom);
        localStorage.setItem('role', this.user.role.nom);
        localStorage.setItem('roleId', String(this.user.role.id));
        localStorage.setItem('connected', 'true');

        if ( data.role.nom === 'admin') {
        this.router.navigate(['/admin/users-management']);
        } else if ( data.role.nom === 'Équipe qualité' ) {
        this.router.navigate(['/test/test-steps']);
        } else if ( data.role.nom === 'Équipe software' ) {
        this.router.navigate(['/bdd/consult']);
        } else {
        this.router.navigate(['/dashboard/main']);
        }
      }
    });

  }


}
