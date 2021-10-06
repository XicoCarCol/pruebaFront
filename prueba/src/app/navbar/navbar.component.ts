import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public title: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  public onViewDash() {
    this.router.navigate(['/list-producto'], { relativeTo: this.activatedRoute })
  }

  public onViewPage() {
    this.router.navigate(['/crear-producto'], { relativeTo: this.activatedRoute })
  }

}
