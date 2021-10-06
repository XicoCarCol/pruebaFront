import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: MatTableDataSource<producto>;
  public columns = ['sku', 'name', 'quantity', 'price'];
  public lsProducto: producto[] | any;
  public title = 'Detalle del producto';



  constructor(
    public matDialogRef: MatDialogRef<DetalleProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: producto[]) {
  }

  ngOnInit() {
    this.fnSetData();
  }


  /* Funcion que agrega datos a la modal de detalle producto */
  public fnSetData() {
    this.lsProducto = this.data;
    this.dataSource = new MatTableDataSource(this.lsProducto);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* Funcion que cierra la modal  */
  public fnCerrar() {
    this.matDialogRef.close();
  }
}

export interface producto {
  sku: string,
  name: string,
  quantity: string,
  price: string
}


export interface nuevoProducto {
  id: string,
  nombre: string,
  numero: string,
  accio: string
}

