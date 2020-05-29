import {Component, OnInit, ViewChild, TemplateRef, AfterViewChecked, OnDestroy} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import {UserService} from '../../shared/user.service';
import {UserModel} from '../../shared/user-model';
import {RoleModel} from '../../shared/role-model';
import {Observable, Subscription} from 'rxjs';
import {RoleService} from '../../shared/role.service';
import {AuthService} from '../../shared/auth.service';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.sass']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  data = [];
  rows = [];
  selectedName = '';
  formData = [];
  imgPath = '';
  selectedRowData: selectRowInterface;
  newUserImg = 'assets/images/user/user1.jpg';
  gu: Observable<UserModel[]>;
  clean: Subscription;
  roles: RoleModel[] = [];
  columns = [
    { name: 'Id' }, { name: 'Nom' }, { name: 'prenom' }, { name: 'login' }, { name: 'mdp' }, { name: 'role' }
  ];

  users: UserModel[];
  filteredData = [];
  basicForm: FormGroup;

  addRowForm: FormGroup;


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private fb: FormBuilder,
              private userService: UserService,
              private roleService: RoleService,
              private authService: AuthService) {
    console.log('all roles ', this.roles);
    this.gu = this.userService.getUsers();
    this.basicForm = this.fb.group({
      id: new FormControl(),
      nom: new FormControl(),
      prenom: new FormControl(),
      login: new FormControl(),
      mdp: new FormControl(),
      role: new FormControl()
    });

    this.addRowForm = this.fb.group({
      id: new FormControl(),
      nom: new FormControl(),
      prenom: new FormControl(),
      login: new FormControl(),
      mdp: new FormControl(),
      role: new FormControl()
    });
  }

  ngOnInit() {
    console.log('role stat = ', localStorage.getItem('role'));
    console.log('role stat = ', localStorage.getItem('id'));
    console.log('role stat = ', localStorage.getItem('username'));
    console.log('login yes ', localStorage.getItem('connected'));
    this.clean = this.gu.subscribe(data => {
      this.users = data;
    });
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
      console.log('data ', data);
    });
    $('select').formSelect();
    this.fetch((data) => {
      this.data = data;
      // copy over dataset to empty object
      // this.filteredData = data;
    });
  }

  fetch(cb) {
    // const req = new XMLHttpRequest();
    // req.open('GET', 'assets/data/adv-tbl-data.json');
    //
    // req.onload = () => {
    //   const data = JSON.parse(req.response);
    //   cb(data);
    // };
    //
    // req.send();
  }

  editRow(row) {
    this.basicForm.patchValue({
      id: row.id,
      nom: row.nom,
      prenom: row.prenom,
      login: row.login,
      mdp: row.mdp,
      role: row.role.id,
    });
    console.log(row.role.id);
    this.selectedRowData = row;
    //
    M.updateTextFields();
  }

  addRow() {
    this.addRowForm.patchValue({
      role: 'All'
    });
    M.updateTextFields();
  }


  deleteRow(row) {
    // console.log('row id ', row.id);
    this.userService.deleteUser(row.id).subscribe(() => {
      console.log('user ', row.id, 'was deleted');
      this.gu.subscribe((data) => {
        this.users = data;
      });
    });
    this.showNotification('bg-red', 'utilisateur supprimé', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }

  // arrayRemove(array, id) {
  //   return array.filter(function(element) {
  //     return element.id != id;
  //   });
  //
  // }

  onEditSave(form: FormGroup) {
    // this.data = this.data.filter((value, key) => {
    //   if (value.id == form.value.id) {
    //     value.firstName = form.value.firstName;
    //     value.lastName = form.value.lastName;
    //     value.phone = form.value.phone;
    //     value.email = form.value.email;
    //     value.address = form.value.address;
    //   }
    const role: RoleModel = new RoleModel(+form.value.role);
    const user =  new UserModel(form.value.id, form.value.nom, form.value.prenom, form.value.login, form.value.mdp, role);
    this.userService.updateUser(+form.value.id, user).subscribe(() => {
      this.gu.subscribe((data) => {
        this.users = data;
      });
    });
    $('#editModal').modal('hide');

    //   return true;
    // });
    this.showNotification('bg-black', 'Edit Record Successfully', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }

  onAddRowSave(form: FormGroup) {

    const role: RoleModel = new RoleModel(+form.value.role);
    const user =  new UserModel(form.value.id, form.value.nom, form.value.prenom, form.value.login, form.value.mdp, role);
    console.log('new user', user);
    console.log('forrrrm ', form.value);
    this.userService.addUser(user).subscribe(() => {
      this.gu.subscribe((data) => {
        this.users = data;
      });
    });
    form.reset();
    $('#addModal').modal('hide');
    this.showNotification('bg-green', 'Add Record Successfully', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }


  //
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    // const keys = Object.keys(this.filteredData[0]);
    const keys = ['id', 'nom', 'prenom', 'login', 'mdp', 'role'];
    this.gu.subscribe((data) => {
      this.filteredData = data;
      this.table.rows = this.filteredData.filter(function(item) {
        // iterate through each row's column data
        for (let i = 0; i < colsAmt; i++) {
          // check for a match
          if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
    });

  }

  showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    const allowDismiss = true;

    $.notify({
        message: text
      },
      {
        type: colorName,
        allow_dismiss: allowDismiss,
        newest_on_top: true,
        timer: 1000,
        placement: {
          from: placementFrom,
          align: placementAlign
        },
        animate: {
          enter: animateEnter,
          exit: animateExit
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? 'p-r-35' : '') + '" role="alert">' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  ngOnDestroy() {
    this.clean.unsubscribe();
  }
}

export interface selectRowInterface {
  nom: String;
  prenom: String;
}
