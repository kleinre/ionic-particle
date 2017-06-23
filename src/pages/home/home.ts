import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public rgb: any;
  public red: any;
  public green: any;
  public blue: any;
  private subscription: any = null;
  
  constructor(public navCtrl: NavController, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    this.login()
  }

  cancelSubscription() {
    if (this.subscription) {
        this.subscription.cancel();
    }
    this.subscription = null;
  }

  ionViewDidEnter() {
    if (this.particle.device) {
        this.cancelSubscription();
        this.particle.pollVariable("rgb").subscribe(
            (value) => { 
              this.rgb = value; 
              this.red = parseInt( this.rgb.substr (1,2), 16);
              this.green = parseInt( this.rgb.substr (3,2), 16);
              this.blue = parseInt( this.rgb.substr (5,2), 16);
            },
            (error) => { console.log("Error reading rgb"); },
            () => { console.log("Stopped polling rgb"); }
        );
    }
  }

  login() {
    this.navCtrl.push( LoginPage );
  }
}
