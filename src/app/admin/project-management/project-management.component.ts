import {Component, OnInit, ViewChild, TemplateRef, AfterViewChecked, OnDestroy} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { DynamicScriptLoaderService } from './../../services/dynamic-script-loader.service';
import {UserService} from '../../shared/user.service';
import {UserModel} from '../../shared/user-model';
import {map} from 'rxjs/operators';
import {RoleModel} from '../../shared/role-model';
import {Observable, Subscription} from 'rxjs';
import {RoleService} from '../../shared/role.service';
import {ProjectService} from '../../shared/project.service';
import {ProjectModel} from '../../shared/project-model';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.sass']
})
export class ProjectManagementComponent implements OnInit {
  numbers: number[] = [1, 2, 5, 6];

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
  projects: ProjectModel[] = [];
  projectsTab: ProjectModel[] = [];
  columns = [
    { name: 'Id' }, { name: 'Nom' }, { name: 'prenom' }, { name: 'login' }, { name: 'mdp' }, { name: 'role' }
  ];

  users: UserModel[];
  filteredData = [];
  basicForm: FormGroup;
  addProjectForm: FormGroup;
  deleteProjectForm: FormGroup;
  addRowForm: FormGroup;


  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
              private fb: FormBuilder,
              private userService: UserService,
              private roleService: RoleService,
              private projectService: ProjectService) {

    this.gu = this.userService.getUsers();
    this.basicForm = this.fb.group({
      roleId: new FormControl(),
      roleNom: new FormControl(),
      project: new FormControl()
    });

    this.addRowForm = this.fb.group({
      roleId: new FormControl(),
      roleNom: new FormControl(),
      project: new FormControl()
    });
    this.addProjectForm = this.fb.group({
      id: new FormControl(),
      nom: new FormControl(),
      url: new FormControl()
    });
    this.deleteProjectForm = this.fb.group({
      project: new FormControl()
    });
  }

  ngOnInit() {

    // this.clean = this.gu.subscribe(data => {
    //   this.users = data;
    // });
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
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

  onChargeRoles() {
   this.projectService.getAllProjects().subscribe((data) => {
     this.projects = data;
     // console.log('all projects ', data);
   });
   M.updateTextFields();
  }


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



  // ***************AJOUTER/SUPPRIMER UN PROJET*******

  // Ajouter un projet

  onAddSaveProject(form: FormGroup) {
    // console.log('nom : ', form.value.nom);
    // console.log('url : ', form.value.url);
    const project: ProjectModel = new  ProjectModel(+form.value.id, form.value.nom, form.value.url);
    this.projectService.addProject(project).subscribe((data) => {
      console.log('project: ', data);
    });
    form.reset();
    $('#addProject').modal('hide');
    this.showNotification('bg-green', 'le Project a été ajouter avec succée', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }

  // supprimer un projet

  deleteProject() {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
    this.deleteProjectForm.patchValue({
      project: 'All'
    });
  }

  onDeleteProject(form: FormGroup) {
    const projectId: number = +form.value.project;
    let projectTab: ProjectModel[] = [];

    // console.log('prooooooo', form.value.project);
    this.roleService.getRoles().subscribe((roles) => {
      for (const role of roles) {
        projectTab = [];
        for (const project of role.projets) {
          if (projectId !== project.id) {
            projectTab.push(project);
          }
        }
        const newRole: RoleModel = new RoleModel(role.id, role.nom, role.users, projectTab);
        this.roleService.updateRole(+role.id, newRole).subscribe(() => {
          console.log('updated');
        });
     }
   }, () => {

    }, () => {
      this.projectService.deleteProject(projectId).subscribe(() => {
        this.roleService.getRoles().subscribe((data) => {
          this.roles = data;
        });
      });
    });

    $('#deleteProject').modal('hide');
    this.showNotification('bg-red', 'le projet a été effacer avec succée', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }

  // ajouter un projet à un role

  addProjectToRole(row) {
      const oldProjectTab: ProjectModel[] = row.projets;
      const newPOrojectTab: ProjectModel[] = [];
      this.addRowForm.patchValue({
        roleId: row.id,
        roleNom: row.nom,
        project: 'All'
      });
      this.projectService.getAllProjects().subscribe((data) => {
        // console.log('data', data);
        // console.log('ols tab projects', oldProjectTab);
        for (const pro1 of data ) {
          let ok = false;
          for (const pro2 of oldProjectTab) {
            if ( pro1.id === pro2.id ) {
              ok = true;
              // console.log('egale ', ok);
            }
          }
          if ( !ok ) {
              newPOrojectTab.push(pro1);
          }
        }
        this.projects = newPOrojectTab;
      });

  }

  onSaveProjectR(form: FormGroup) {
    // console.log('id, nom, project ', form.value.roleId, form.value.roleNom, form.value.project);
    let newProjectTab: ProjectModel[] = [];
    const roleId: number = +form.value.roleId;
    const projectId: number = +form.value.project;
    this.roleService.getRole(+form.value.roleId).subscribe((oldRole) => {
      const projectCome: ProjectModel = new ProjectModel(projectId);
      newProjectTab = oldRole.projets;
      newProjectTab[newProjectTab.length] = projectCome;
      const newRole: RoleModel = new RoleModel(oldRole.id, oldRole.nom, oldRole.users, newProjectTab);
      this.roleService.updateRole(roleId, newRole).subscribe((data) => {
          console.log('salut');
          this.roleService.getRoles().subscribe((data) => {
            this.roles = data;
          });
        });
    });
    form.reset();
    $('#addModal').modal('hide');
    this.showNotification('bg-green', 'le Project a été ajouter avec succée', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
  }

  // supprimer un projet à un role
  deleteProjectToRole(row) {
    this.basicForm.patchValue({
      roleId: row.id,
      roleNom: row.nom,
      project: 'All'
    });
    this.projects = row.projets;
  }

  onDeleteProjectR(form: FormGroup) {
    const newProjectTab: ProjectModel[] = [];
    const roleId: number = +form.value.roleId;
    const projectId: number = +form.value.project;
    this.roleService.getRole(+form.value.roleId).subscribe((oldRole) => {
      for (const project of oldRole.projets) {
        if (projectId !== +project.id) {
          newProjectTab.push(project);
        }
      }
      const newRole: RoleModel = new RoleModel(oldRole.id, oldRole.nom, oldRole.users, newProjectTab);
      this.roleService.updateRole(roleId, newRole).subscribe((data) => {
          console.log('salut');
          this.roleService.getRoles().subscribe((data) => {
            this.roles = data;
          });
        });
      });
    form.reset();
    $('#editModal').modal('hide');
    this.showNotification('bg-red', 'le projet a été effacer avec succée', 'bottom', 'right', 'animated fadeInRight', 'animated fadeOutRight');
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



}

export interface selectRowInterface {
  nom: String;
  prenom: String;
}
