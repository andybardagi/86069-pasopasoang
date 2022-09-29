import { Component, OnInit } from "@angular/core";
import { Articulo } from "../../models/articulo";
import { ArticuloFamilia } from "../../models/articulo-familia";
import { MockArticulosService } from "../../services/mock-articulos.service";
import { MockArticulosFamiliasService } from "../../services/mock-articulos-familias.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-articulos",
  templateUrl: "./articulos.component.html",
  styleUrls: ["./articulos.component.css"],
})
export class ArticulosComponent implements OnInit {
  public Titulo = "Articulos";
  public TituloAccionABMC: { [index: string]: string } = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  public AccionABMC: string = "L"; // inicia en el listado de articulos (buscar con parametros)
  public Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados...",
  };
  public Items: Articulo[] | null = null;
  public RegistrosTotal: number = 1;
  public Familias: ArticuloFamilia[] | null = null;
  public Pagina = 1; // inicia pagina 1
  // opciones del combo activo
  public OpcionesActivo = [
    { Id: null, Nombre: "Todos" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" },
  ];
  public FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
    Activo: new FormControl(null),
  });
  public FormRegistro = new FormGroup({
    IdArticulo: new FormControl(0),
    Nombre: new FormControl(""),
    Precio: new FormControl(null),
    Stock: new FormControl(null),
    CodigoDeBarra: new FormControl(""),
    IdArticuloFamilia: new FormControl(""),
    FechaAlta: new FormControl(""),
    Activo: new FormControl(true),
  });

  constructor(
    private articulosService: MockArticulosService,
    private articulosFamiliasService: MockArticulosFamiliasService
  ) {}

  ngOnInit() {
    this.GetFamiliasArticulos();
  }

  GetFamiliasArticulos() {
    this.articulosFamiliasService.get().subscribe((res: ArticuloFamilia[]) => {
      this.Familias = res;
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormRegistro.reset({ Activo: true, IdArticulo: 0 });
  }

  // Buscar segun los filtros, establecidos en FormRegistro
  Buscar() {
    this.articulosService
      .get(
        this.FormBusqueda.value.Nombre || "",
        this.FormBusqueda.value.Activo || null,
        this.Pagina
      )
      .subscribe((res: any) => {
        this.Items = res.Items;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }

  // Obtengo un registro especifico según el Id
  BuscarPorId(Item: Articulo, AccionABMC: string) {
    window.scroll(0, 0); // ir al incio del scroll
    this.AccionABMC = AccionABMC;
  }

  Consultar(Item: Articulo) {
    this.BuscarPorId(Item, "C");
  }

  // comienza la modificacion, luego la confirma con el metodo Grabar
  Modificar(Item: Articulo) {
    if (!Item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    this.BuscarPorId(Item, "M");
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    alert("Registro Grabado!");
    this.Volver();
  }

  ActivarDesactivar(Item: Articulo) {
    var resp = confirm(
      "Esta seguro de " +
        (Item.Activo ? "desactivar" : "activar") +
        " este registro?"
    );
    if (resp === true) alert("registro activado/desactivado!");
  }

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

  ImprimirListado() {
    alert("Sin desarrollar...");
  }
}
