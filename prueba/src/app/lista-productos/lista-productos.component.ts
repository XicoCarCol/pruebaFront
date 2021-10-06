import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../service/productos.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleProductoComponent, nuevoProducto, producto } from '../modal/detalle-producto/detalle-producto.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("PaginatorPro", { static: false }) vcPaginatoP!: MatPaginator;
  @ViewChildren('id') vcInputs!: any[];

  public mtdProductos!: MatTableDataSource<any>;
  public columns = ['id', 'nombre', 'numero', 'accion'];
  public lsProducto: [] | any;

  public arrayObjetos: any = [];
  public arrayProducto!: producto;
  public matDialogConfig!: MatDialogConfig<producto>;
  public formGroup = new FormArray([]);
  public lista!: nuevoProducto[];
  public hide: boolean = true;
  public mostrar: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sProductoService: ProductosService,
    private matDialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.lsProducto = []
    this.fnGetProductos();
    this.mtdProductos = new MatTableDataSource((this.formGroup as FormArray).controls);
  }

  ngAfterViewInit() {
    this.mtdProductos = new MatTableDataSource((this.formGroup as FormArray).controls);
    this.mtdProductos.paginator = this.vcPaginatoP;
  }

  public fnRegresar() {
    this.router.navigate(['/navbar'], { relativeTo: this.activatedRoute })

  }

  /* Funcion que agrega registros */
  public fnAddTabla() {
    this.hide = false
    this.mostrar = true;

    this.formGroup.insert(
      0, this.fb.group({
        id: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        numero: ['', [Validators.required]],
      }
      ));
    this.mtdProductos = new MatTableDataSource((this.formGroup as FormArray).controls);
    setTimeout(() => {
      this.vcInputs.forEach(element => {
        element.nativeElement.focus()
      })
    })
  }


  /* Funcion que trae los productos */
  public fnGetProductos() {
    this.sProductoService.fnGetProductos().subscribe(productos => {
      this.lsProducto = productos.orders;
      this.mtdProductos = new MatTableDataSource(this.lsProducto);
      this.mtdProductos.paginator = this.paginator;
      this.mtdProductos.sort = this.sort;

    });
  }

  /* Funcion que abre una modal para ver el detalle del producto */
  public fnDetalleProducto(elementos: any) {
    this.matDialogConfig = new MatDialogConfig();
    this.matDialogConfig.width = '40%';
    this.matDialogConfig.data = elementos.items;
    const modal = this.matDialog.open(DetalleProductoComponent, this.matDialogConfig);
    modal.afterClosed().subscribe(result => {
      result = elementos.items;

    });
  }

  /* Funcion que cancela el registro a llenar */
  public fnCancelar(valor: any, index: number) {
    this.formGroup.removeAt(index);
    this.router.navigate(['/navbar'], { relativeTo: this.activatedRoute })
  }

  /* Funcion que agrega registro a la tabla */
  public fnAdd(elemento: any) {
    this.mtdProductos = new MatTableDataSource(this.formGroup.value);
    this.mtdProductos.paginator = this.paginator;
    this.mtdProductos.sort = this.sort;
  }
}


