import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sch-appointmemtmemo',
  templateUrl: './sch-appointmemtmemo.component.html',
  styleUrls: ['./sch-appointmemtmemo.component.scss']
})
export class SchAppointmemtmemoComponent implements OnInit {


  TagMember = false;
  MembersDisp = false;
  table = false;
  taggedMembers_Cont = false;

  TagMemArray: TagMembers[];
  tagged_Members=[];

  TagMem_Form :FormGroup;

  TagMemData: TagMembers[] = [
    new TagMembers(1, 'Surgery Team', '', '', 'Hema', '54 Dean'),
    new TagMembers(2, 'Testing Team', '', '', 'Hema', '54 Dean'),
    new TagMembers(3, 'Consultation Team', '', '', 'Hema', '54 Dean'),
    new TagMembers(4, 'care Team', '', '', 'Hema', '54 Dean'),
    new TagMembers(5, 'Office visit', '', '', 'Hema', '54 Dean'),
    new TagMembers(6, 'Yourdrs', '', '', 'Englewood Hospital', 'Englewood Hospital @ Englewood Hospital'),
    new TagMembers(7, 'Kyriakides Christopher', 'Englewood', 'NJ', 'Hema', 'West NY'),
    new TagMembers(8, 'Nieves Cynthia', 'Englewood', 'NJ', 'Health East Ambulatory Surgical Center', 'HEASC @ 54 Dean'),
    new TagMembers(9, 'testdr', '', '', 'Hema', '54 Dean'),
    new TagMembers(10, 'Lora Arlene', 'Englewood', 'NJ', 'Health East Ambulatory Surgical Center', '54 Dean')
 ];




  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.TagMem_Form = this.fb.group({
      searchMem : new FormControl(null),
      selectTagMem : new FormControl(null)

    });



  }

  OnTagMemberClick() {
    this.TagMember = true;
}
OnCloseTagMember() {
    this.TagMember = false;
}

onSearchtagClick(){
  this.TagMemArray = this.TagMemData;
  this.MembersDisp = true;
  this.table = true;
}

selectedtagcheck(event,item){
  if(event==true){
    this.tagged_Members.push(item);
    this.taggedMembers_Cont = true;
  }
  else{
    this.tagged_Members.splice(item.name,1);
    if(this.tagged_Members.length === 0){
      this.taggedMembers_Cont = false;
    }else{
      true;

    }

  }

}

closetagnote(value){
  this.tagged_Members.splice(value.name,1);
  if(this.tagged_Members.length === 0){
    this.taggedMembers_Cont = false;
  }else{
    true;

  }
  }


}

export class TagMembers {
  public constructor(
    public displayid: number,
    public name: string,
    public city: string,
    public state: string,
    public practice: string,
    public location: string

  ) {}
}
