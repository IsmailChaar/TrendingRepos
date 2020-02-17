import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import {PageEvent} from '@angular/material/paginator';



@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  items = [];

  // MatPaginator Inputs
  length = 300;
  pageSize = 30;
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();



  constructor(private apiService: ApiService, private datePipe: DatePipe, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
    'star',
    sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/star.svg'));

    iconRegistry.addSvgIcon(
    'flag',
    sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/flag.svg'));

    iconRegistry.addSvgIcon(
    'person',
    sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/person.svg'));
  }

  ngOnInit(pageIndex : number) {
    var oneMonthAgo = new Date(new Date().getFullYear(),new Date().getMonth() - 1, new Date().getDate());
    console.log(oneMonthAgo);
    console.log(this.datePipe.transform(oneMonthAgo,"yyyy-MM-dd"));
    console.log(typeof this.datePipe.transform(oneMonthAgo,"yyyy-MM-dd"));

    this.apiService.getRepos(this.datePipe.transform(oneMonthAgo,"yyyy-MM-dd"),pageIndex + 1).subscribe((data)=>{

      console.log(typeof this.items);
      console.log(data);
      this.items = data['items'];
      console.log(this.items[0].created_at);
      console.log(daysAgo(this.items[0].created_at));

    });

  }
  onPaginateChange(event){
    this.ngOnInit(event.pageIndex);
    window.scroll(0,0);
  }

}
