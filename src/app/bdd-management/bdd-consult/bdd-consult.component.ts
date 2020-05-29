import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../shared/project-model';
import {FormControl} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {ProjectService} from '../../shared/project.service';
import {RoleService} from '../../shared/role.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bdd-consult',
  templateUrl: './bdd-consult.component.html',
  styleUrls: ['./bdd-consult.component.sass']
})
export class BddConsultComponent implements OnInit {

  projects: ProjectModel[];
  numbers: number[] = [1, 2, 5, 6];
  projectUrl: string = null;
  packages: pkTest[] = [
    {id: '1', nom: 'login'},
    {id: '2', nom: 'register'},
    {id: '4', nom: 'payement'},
    {id: '5', nom: 'ajouter au panier'},
    {id: '6', nom: 'filter'}
  ];
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
}

interface pkTest {
  id: string;
  nom: string;
}

