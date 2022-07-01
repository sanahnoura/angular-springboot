import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';
import { UsersService } from '../service/users.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isAuth = false;

  isDarkTheme: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,  public loaderService: LoaderService,
               private userService: UsersService) { } 


ngOnInit() {
  this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;
}

  storeThemeSelection(){
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light")
  }
  logout(){
    this.userService.logout();
    this.isAuth = this.userService.isAuth;
  }

}

