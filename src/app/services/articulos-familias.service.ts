import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { ArticuloFamilia } from "../models/articulo-familia";

@Injectable({
  providedIn: "root",
})
export class ArticulosFamiliasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = "https://pav2.azurewebsites.net/api/ArticulosFamilias/";
  }

  get() {
    return this.httpClient.get<ArticuloFamilia[]>(this.resourceUrl);
  }
}
