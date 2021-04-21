import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {ProjectService} from '../../shared/project.service';
import {ProjectModel} from '../../shared/project-model';
import {RoleService} from '../../shared/role.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {BddService} from '../../shared/bdd.service';
import {ScriptService} from '../../shared/script.service';
import {ScriptModel} from '../../shared/script-model';
import {BddModel} from '../../shared/BddModel';
import {PackageTestModel} from '../../shared/package-test-model';
import {PkTestService} from '../../shared/pk-test.service';
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
  bddfile: any = File;
  scriptfile: any = File;
  i: number;
  pkTestResultD: PackageTestModel[] = [];
  pakageSelected = new FormControl();
  packageList: string[] = ['Login', 'Register', 'payement', 'ajouter au panier', 'filter'];

  scriptO: ScriptModel;
  bddO: BddModel;

  scriptT: ScriptModel[] = [];
  bddT: BddModel[] = [];
  pkTestT: PackageTestModel[] = [];
  rapportValue: string;

  displayedColumns: string[] = ['id', 'nom', 'delete', 'update'];
  dataSource = this.ELEMENT_DATA;

roleId: number = +localStorage.getItem('roleId');
  private nomProject: string;
  constructor(private userService: UserService,
              private projectService: ProjectService,
              private roleService: RoleService,
              private bddService: BddService,
              private scriptService: ScriptService,
              private pkService: PkTestService,
              private router: Router
  ) { }

  ngOnInit() {
    // console.log('roleId', this.roleId);
    this.roleService.getRole(this.roleId).subscribe((data) => {
      this.projects = data.projets;
      console.log('project come ', this.projects);
    });
    // this.bddService.getBddList().subscribe((data) => {
    //   console.log('dara', data);
    // });


  }

  onLoadBdd(event) {
    const file = event.target.files[0];
    this.bddfile = file;
    console.log('on load bdd ', file);
    localStorage.setItem('bddName', this.bddfile.name);
  }
  onloadScript(event) {
    const file = event.target.files[0];
    this.scriptfile = file;
    console.log('on load script ', file);
    localStorage.setItem('scriptName', this.scriptfile.name);
  }

  onUploadFile() {

    const projectT: ProjectModel[] = [];
    const formData1 = new FormData();
    const formData = new FormData();
      console.log('rapp val', this.rapportValue);

    formData1.append('file', this.bddfile);
    this.bddService.addBdd(formData1).subscribe((data) => {
      console.log(data);
      formData.append('file', this.scriptfile);
      this.scriptService.addScript(formData).subscribe((data) => {
        console.log(data);
        this.scriptService.getScriptByName(localStorage.getItem('scriptName')).subscribe((script) => {
          console.log('script object ', script);
          this.scriptT[this.scriptT.length] = script;
          this.bddService.getBddByName(localStorage.getItem('bddName')).subscribe((bdd) => {
            console.log('bdd object ', bdd);

            const idProject = localStorage.getItem('idProject');
            const project = new ProjectModel(+idProject);
            // this.projectT[this.projectT.length] = project;
            projectT.push(project);
            console.log('project tab', projectT);
            // const namePP = this.scriptfile.name.substring(0, this.scriptfile.name.indexOf('.'));
            const pk = new PackageTestModel(this.scriptfile.name, projectT, this.rapportValue);
            console.log('pl pl pl', pk);
            this.pkService.addPk(pk).subscribe((pktestN) => {
              console.log('pktest', pktestN);
              localStorage.setItem('pkId', String(pktestN.id));
              console.log('bdd nom', bdd.nomFicher);
              const bddu = new BddModel(bdd.id, bdd.nomFicher, bdd.fichier, pktestN);
              console.log('bddu', bddu);
              this.bddService.updateBdd(+bdd.id, bddu).subscribe(() => {
                console.log('bdd updated');
              });

              const scriptu = new ScriptModel(script.id, script.nomFichier, script.fichier, pktestN);
              this.scriptService.updateScript(+script.id, scriptu).subscribe(() => {
                console.log('script updated');

                this.projectService.getProject(+idProject).subscribe((pro) => {
                  this.nomProject = pro.nom;
                  this.pkService.pkList().subscribe(
                    (listpk) => {
                      // for (const pk of listpk) {
                        //   console.log('pk project name', pk.projets[0]);
                      this.pkTestResultD = listpk;
                      console.log('pk test List', this.pkTestResultD);
                      // }
                    });
                });

              });
            });
          });
        });

      });
    });



  }
  onSubmit() {
    const idp = +localStorage.getItem('idProject');
    this.projectService.getProject(idp).subscribe((pro) => {
      this.nomProject = pro.nom;
      this.pkService.pkList().subscribe(
        (listpk) => {
          // for (const pk of listpk) {
          //   console.log('pk project name', pk.projets[0]);
          this.pkTestResultD = listpk;
          console.log('pk test List', this.pkTestResultD);
          // }
        });
    });
  }
  onChangeRapport(src) {
    console.log('rapport src', src);
    this.rapportValue = src;
  }
  // addRapport() {
  //   console.log('rapp val', this.rapportValue);
  //   console.log('pkValue', localStorage.getItem('pkId'));
  //
  //   this.pkService.getpk(42).subscribe((pk) => {
  //     console.log('hhh', pk);
  //     const pkk = new PackageTestModel(pk.nom, pk.projets, this.rapportValue, null, null, 42);
  //     console.log('pkkk before', pkk);
  //     // this.pkService.updatePk(35, pkk).subscribe(() => {
  //     //   console.log('pkk updated');
  //     // });
  //   });

  // }
  openDashbord() {
    this.router.navigate(['/rapport', 'rapports']);
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
}

export interface PeriodicElement {
  nom: string;
  id: number;
  delete: string;
  update: string;
}

