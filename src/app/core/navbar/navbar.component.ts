import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../seguranca/oauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: OauthService) { }

  ngOnInit() {}

}
