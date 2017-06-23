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
            (value) => { this.rgb = value; },
            (error) => { console.log("Error reading rgb"); },
            () => { console.log("Stopped polling rgb"); }
        );
    }
  }

  login() {
    this.navCtrl.push( LoginPage );
  }
}
