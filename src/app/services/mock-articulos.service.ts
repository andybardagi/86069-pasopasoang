import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Articulo, Articulos } from "../models/articulo";

@Injectable({
  providedIn: "root",
})
export class MockArticulosService {
  constructor() {}
  get(
    Nombre: string,
    Activo: boolean | null,
    pagina: number
  ): Observable<{ Items: Articulo[]; RegistrosTotal: number }> {
    var Items = Articulos.filter(
      // Nombre == null  chequea por null y undefined
      // Nombre === null  chequea solo por null
      (item) =>
        (Nombre == null ||
          item.Nombre.toUpperCase().includes(Nombre.toUpperCase())) &&
        (Activo == null || item.Activo == Activo)
    );
    //ordenar
    Items = Items.sort((a, b) =>
      a.Nombre.toUpperCase() > b.Nombre.toUpperCase() ? 1 : -1
    );
    // paginar con slice
    var RegistrosTotal = Items.length;
    var RegistroDesde = (pagina - 1) * 10;
    Items = Items.slice(RegistroDesde, RegistroDesde + 10);
    return of({ Items: Items, RegistrosTotal: RegistrosTotal });
  }
  // no usamos get con parametros porque javascript no soporta sobrecarga de metodos!
  getById(Id: number) {
    var item: Articulo = Articulos.filter((x) => x.IdArticulo === Id)[0];
    return of(item);
  }

  post(obj: Articulo) {
    obj.IdArticulo = new Date().getTime();

    obj.IdArticuloFamilia = +obj.IdArticuloFamilia; // convierto a numero, cuando se envia al servidor se hace automaticamente al enlazar las propiedades del modelo definido en el  backend
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos.push(obj);
    return of(obj);
  }

  put(Id: number, obj: Articulo) {
    let indice: number = 0;
    var items = Articulos.filter(function (item, index) {
      if (item.IdArticulo === Id) {
        indice = index;
      }
    });

    obj.IdArticuloFamilia = +obj.IdArticuloFamilia; // convierto a número, cuando se envia al servidor se hace automáticamente al enlazar las propiedades del modelo definido en el  backend
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos[indice] = obj;
    return of(obj);
  }

  delete(Id: number) {
    var items = Articulos.filter((x) => x.IdArticulo === Id);
    items[0].Activo = !items[0].Activo;
    return of(items[0]);
  }
}
