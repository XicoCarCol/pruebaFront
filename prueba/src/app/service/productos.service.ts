import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private sToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ';
  private sUrl = 'https://eshop-deve.herokuapp.com/api/v2/orders';
  private _headerParam!: HttpHeaders;


  constructor(
    private httpClient: HttpClient
  ) { }

  /* Funcion para crear los headers y pasar el token */
  private get headerParam() {
    const sToken = this.sToken;
    this._headerParam = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sToken
    });
    return this._headerParam;
  }

  /* Funcion que trae los productos */
  public fnGetProductos() {
    return this.httpClient.get<any>(this.sUrl, { headers: this.headerParam })
  }
}
