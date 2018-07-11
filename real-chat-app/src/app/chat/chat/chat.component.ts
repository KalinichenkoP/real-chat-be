import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

 private name: string;

  constructor( private route: ActivatedRoute,) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    console.log(this.name);
  }

}
