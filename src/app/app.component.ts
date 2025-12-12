import { Component, OnInit, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit{
  title = 'Password generator';

  size = 12;
  password = '';


  toastSrv = inject(NzMessageService);

  ngOnInit(): void {
    this.generate();
  }


  generate(ev:any = null){
    console.log(ev);
    if(ev){
      this.size = ev;
    }
    this.password = this.generarStringRandom(this.size);
  }

  marks = {
    8: 'Good',
    12: 'Prety good',
    16:'Much?'
  };

  copy(){
    navigator.clipboard.writeText(this.password);
    this.toastSrv.success('Password copied to clipboard!',{nzDuration:5000});
  }

  generarStringRandom(largo:number) {
    const caracteres = 'qwertyuiopasdfghjklñzxcvbnm0123456789';
    const caracteresLength = caracteres.length;
  
    let resultado = '';
    const array = new Uint8Array(largo);
    window.crypto.getRandomValues(array);

    let even = true;
    if(largo%4 != 0) even = false;
  
    for (let i = 0; i < largo; i++) {
      if(i>0){
        if(even && i%4 == 0){
          resultado+='-';
        }else if(!even && i%3 == 0){
          resultado+='-';
        }
      }
      resultado += caracteres.charAt(array[i] % caracteresLength);
    }

  
    return resultado;
  }
}
