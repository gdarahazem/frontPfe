import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../shared/project-model';
import {FormControl} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {ProjectService} from '../../shared/project.service';
import {RoleService} from '../../shared/role.service';
import {Router} from '@angular/router';
import {PkTestService} from '../../shared/pk-test.service';

@Component({
  selector: 'app-bdd-consult',
  templateUrl: './bdd-consult.component.html',
  styleUrls: ['./bdd-consult.component.sass']
})
export class BddConsultComponent implements OnInit {

  projects: ProjectModel[];
  numbers: number[] = [1, 2, 5, 6];
  projectUrl: string = null;
  pmo: {id: string, nom: string};
  packages: pkTest[] = [];
  roleId: number = +localStorage.getItem('roleId');
  private nomProject: string;
  constructor(private userService: UserService,
              private projectService: ProjectService,
              private pkService: PkTestService,
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
  onLoadPk() {
    const idp = +localStorage.getItem('idProject');
    this.projectService.getProject(idp).subscribe((pro) => {
      this.nomProject = pro.nom;
      console.log('nomm p', this.nomProject);
      this.pkService.pkList().subscribe(
        (listpk) => {
          for (const pk of listpk) {
            console.log('pk project name', pk.projets[0].nom);
            if ( pk.projets[0].nom === this.nomProject ) {
              const namePP = pk.nom.substring(0, pk.nom.indexOf('.'));
              this.packages.push({id: String(pk.id), nom: namePP});
            }
          }
        });
    });
    console.log(this.packages);
  }
  openIntelig() {
    const WshShell = WScript.CreateObject('WScript.Shell');
    WshShell.Run('C:\\Program Files\\Notepad++\\notepad++.exe', 1, true);
    console.log('hello');
    console.log('hello');
    // window.open('C:\\\\Program Files\\\\Notepad++\\\\notepad++.exe');
  }

  changeProject(data) {
    // this.projectUrl = data;
    console.log('geloooooooo ' + data);
    this.projectService.getProject(+data).subscribe((project) => {
      console.log('geloooooooo222 ', project);
      this.projectUrl = project.url;
      localStorage.setItem('idProject', String(project.id));
    });
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

