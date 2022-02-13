import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public text: string = ''
  public menu: any
  public menuArray: any

  constructor(private router: Router) { }

  ngOnInit(): void {
    let htmlMenu = ''
    let menuOptions: Array<string> = []
    let menu = JSON.parse(sessionStorage.getItem('menu') as string)
    menu.shift()
    menu.forEach( function(val){
      let menuItem = val.substring(1)
      menuOptions.push(menuItem)
      // htmlMenu += '<li class="nav-item">'
      // htmlMenu += '  <a class="nav-link" href="/'+menuItem+'">'+menuItem.toUpperCase()+'</a>'
      // htmlMenu += '</li>'
    } )


    this.menuArray = menuOptions
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    
    this.router.navigate(['/login']);
  }

}
