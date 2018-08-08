import { AfterViewChecked, Component } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  highlighted = false;


  ngAfterViewChecked() {
    if (!this.highlighted) {
      Prism.highlightAll();
    }
  }
}
