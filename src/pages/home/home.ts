import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(  public navCtrl: NavController,
                public nativeAudio: NativeAudio , 
                public backgroundMode : BackgroundMode,
                public platf:Platform) {
    this.platf.ready().then(()=>{
      this.CallServices();
    })
        
  }

  CallServices(){
    this.nativeAudio.preloadSimple('audio1', 'assets/audio/1.mp3').then((msg)=>{
      console.log("message: " + msg);
    }, (error)=>{
      console.log("error: " + error);
    });
  }


  playAudio(){
    this.backgroundMode.enable();
    this.backgroundMode.on("activate").subscribe(()=>{
      this.nativeAudio.play("audio1");  
    });
    this.nativeAudio.play("audio1"),() => console.log('audio1 is done playing');
  }


  stopAudio(){
    this.backgroundMode.on("deactivate").subscribe(()=>{
      this.nativeAudio.stop("audio1");  
    });
    this.nativeAudio.stop("audio1"),() => console.log('audio1 is stop playing');
  }
}
