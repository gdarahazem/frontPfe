import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {ProjectService} from '../../shared/project.service';
import {ProjectModel} from '../../shared/project-model';
import {RoleService} from '../../shared/role.service';
import {DynamicScriptLoaderService} from '../../services/dynamic-script-loader.service';
import {FormControl} from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-test-steps',
  templateUrl: './test-steps.component.html',
  styleUrls: ['./test-steps.component.sass']
})

export class TestStepsComponent implements OnInit {
   ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, nom: 'login', update: 'update', delete: 'delete'},
    {id: 2, nom: 'register', update: 'update', delete: 'delete'},
    {id: 3, nom: 'payement', update: 'update', delete: 'delete'},
    {id: 4, nom: 'ajouter au panier', update: 'update', delete: 'delete'},
    {id: 5, nom: 'filter', update: 'update', delete: 'delete'}
  ];
projects: ProjectModel[];
  numbers: number[] = [1, 2, 5, 6];
  projectUrl: string = null;

  pakageSelected = new FormControl();
  packageList: string[] = ['Login', 'Register', 'payement', 'ajouter au panier', 'filter'];


  displayedColumns: string[] = ['id', 'nom', 'delete', 'update'];
  dataSource = this.ELEMENT_DATA;

roleId: number = +localStorage.getItem('roleId');
  constructor(private userService: UserService,
              private projectService: ProjectService,
              private roleService: RoleService,
              private router: Router
  ) { }

  ngOnInit() {
    // console.log('roleId', this.roleId);
    this.roleService.getRole(this.roleId).subscribe((data) => {
      this.projects = data.projets;
      console.log('project come ', this.projects);
    });
  }

  openIntelig() {
    const WshShell = WScript.CreateObject('WScript.Shell');
    WshShell.Run('C:\\Program Files\\Notepad++\\notepad++.exe', 1, true);
    console.log('hello');
    console.log('hello');
    // window.open('C:\\\\Program Files\\\\Notepad++\\\\notepad++.exe');
  }
  onSubmit() {
    console.log('project url', this.projectUrl);
  }
  openDashbord() {
    this.router.navigate(['/rapport', 'rapports']);
  }
  changeProject(data) {
    this.projectUrl = data;
    console.log('geloooooooo ' + data);
  }
}

export interface PeriodicElement {
  nom: string;
  id: number;
  delete: string;
  update: string;
}

