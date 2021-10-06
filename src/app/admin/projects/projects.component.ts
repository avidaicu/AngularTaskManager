import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../projects.service";
import { Project } from 'src/app/project';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationsService } from 'src/app/client-locations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  clientLocations: ClientLocation[] = [];
  // showLoading: boolean = true;

  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;

  constructor(
    private projectsService: ProjectsService,
    private clientLocationsService: ClientLocationsService) {
  }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        console.log('response', response);
        this.projects = response;
      },
      (error) => {
        console.log(error);
        alert('Authentication failed!');
      }
    );

    this.clientLocationsService.getClientLocations().subscribe(
      (response) => {
        this.clientLocations = response;
      },
      (error) => {
        console.log(error);
        alert('Authentication failed!');
      }
    );
  }

  onSaveClick() {
    this.newProject.clientLocation.clientLocationID = 0;
    this.projectsService.insertProject(this.newProject).subscribe((response) => {
      console.log('response', response.clientLocation.clientLocationName);
      //Add Project to Grid
      var p: Project = new Project();
      p.projectID = response.projectID;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      p.clientLocation = response.clientLocation;
      p.clientLocationID = response.clientLocationID;
      this.projects.push(p);
      console.log('this.project', this.projects);
      console.log('this.newProject.projectID', this.newProject.projectID);

      //Clear New Project Dialog - TextBoxes
      this.newProject.projectID = null;
      this.newProject.projectName = null;
      this.newProject.dateOfStart = null;
      this.newProject.teamSize = null;
      this.newProject.clientLocationID = null;
    }, (error) => {
      console.log(error);
    });
  }

  onEditClick(event, index: number) {
    console.log('this.projects:', this.projects)
    console.log('index:', index)
    console.log('this.projects[index]:', this.projects[index])
    this.editProject.projectID = this.projects[index].projectID;
    this.editProject.projectName = this.projects[index].projectName;
    this.editProject.dateOfStart = this.projects[index].dateOfStart;
    this.editProject.teamSize = this.projects[index].teamSize;
    this.editProject.clientLocation = this.projects[index].clientLocation;
    this.editProject.clientLocationID = this.projects[index].clientLocationID;
    this.editIndex = index;
    console.log('this.editIndex:', this.editIndex)
  }

  onUpdateClick() {
    this.projectsService.updateProject(this.editProject).subscribe((response: Project) => {
      var p: Project = new Project();
      p.projectID = response.projectID;
      p.projectName = response.projectName;
      p.dateOfStart = response.dateOfStart;
      p.teamSize = response.teamSize;
      this.projects[this.editIndex] = p;

      this.editProject.projectID = null;
      this.editProject.projectName = null;
      this.editProject.dateOfStart = null;
      this.editProject.teamSize = null;
    },
      (error) => {
        console.log(error);
      });
  }

  onDeleteClick(event, index: number) {
    this.deleteIndex = index;
    this.deleteProject.projectID = this.projects[index].projectID;
    this.deleteProject.projectName = this.projects[index].projectName;
    this.deleteProject.dateOfStart = this.projects[index].dateOfStart;
    this.deleteProject.teamSize = this.projects[index].teamSize;
  }

  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe(
      (response) => {
        this.projects.splice(this.deleteIndex, 1);
        this.deleteProject.projectID = null;
        this.deleteProject.projectName = null;
        this.deleteProject.teamSize = null;
        this.deleteProject.dateOfStart = null;
      },
      (error) => {
        console.log(error);
      });
  }
}
