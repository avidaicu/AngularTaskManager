import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "./project";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    // Note POST call will point to api/projects when working wite a real database
    return this.httpClient.get<Project[]>("http://localhost:3000/projects", { responseType: "json",
    }).pipe(map(
      (data: Project[]) => {
        for(var i = 0; i< data.length; i++) {
          // data[i].teamSize = data[i].teamSize * 100;
        }
        return data;
      }
    ))
  }

  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>(
      "http://localhost:3000/projects",
      newProject,
      { responseType: "json" }
    );
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(
      "http://localhost:3000/projects/" + existingProject.projectID,
      existingProject,
      { responseType: "json" }
    );
  }

  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>(
      "http://localhost:3000/projects/" + ProjectID
    );
  }
}
