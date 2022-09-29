import { Component, OnInit } from "@angular/core";
import { ArticuloFamilia } from "../../models/articulo-familia";
import { ArticulosFamiliasService } from "../../services/articulos-familias.service";

@Component({
  selector: "app-articulos-familias",
  templateUrl: "./articulos-familias.component.html",
  styleUrls: ["./articulos-familias.component.css"],
})
export class ArticulosFamiliasComponent implements OnInit {
  Titulo = "Articulos Familias";
  Items: ArticuloFamilia[] = [];

  constructor(private articulosFamiliasService: ArticulosFamiliasService) {}

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Items = res;
    });
  }

  ngOnInit() {
    this.GetFamiliasArticulos();
  }
}
