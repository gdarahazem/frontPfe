import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {ProjectService} from '../../shared/project.service';
import {RoleService} from '../../shared/role.service';
import {ProjectModel} from '../../shared/project-model';
import {PkTestService} from '../../shared/pk-test.service';

@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.sass']
})
export class RapportsComponent implements OnInit {
  roleId: number = +localStorage.getItem('roleId');
  projects: ProjectModel[];

  rapportModel: {project: string, rapport: string}[] = [];

  private i: number;
  private src: string;
  constructor(private userService: UserService,
              private roleService: RoleService,
              private pkService: PkTestService,
              private projectService: ProjectService) { }

  ngOnInit() {
    // this.roleService.getRole(this.roleId).subscribe((data) => {
    //   this.projects = data.projets;
    //   console.log('project come ', this.projects);
    // });

    this.pkService.pkList().subscribe((pkTst) => {
      console.log('pk list', pkTst);
      this.roleService.getRole(this.roleId).subscribe((data) => {
        this.projects = data.projets;
        // console.log('project come ', this.projects);
        for (const project of this.projects) {
          this.i = 0;
          console.log('project name', project.nom);
          for (const pk of pkTst) {
            if ( pk.projets[0].nom === project.nom) {
              this.src = pk.rapport;
              this.i = 1;
            }
            }
          if ( this.i !== 0) {
              this.rapportModel.push({project: project.nom, rapport: this.src});
          }
        }
        console.log(this.rapportModel);
      });
    });

  }

}
