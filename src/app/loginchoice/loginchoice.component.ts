import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-loginchoice',
  templateUrl: './loginchoice.component.html',
  styleUrls: ['./loginchoice.component.css']
})
export class LoginchoiceComponent {
  
  constructor(private router:Router){};
  
  gotologin(){
    this.router.navigate(['/login']);
  }
}
