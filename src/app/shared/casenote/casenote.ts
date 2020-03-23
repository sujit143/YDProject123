export class Case {
    public constructor(
    // public id: number,
    public universalcheck: string,
    public surgicalcheck: string,
    public Generalepisode: string,
    public targetrole: string,
    public comment: string,
    public searchmember: string
    ) { }
  }
  export class CaseNotesDisplay {
    public constructor(
    public id: number,
    public general: string,
    public who: string,
    public when: string,
    public Role: string,
    public targetroledisplay: string,
    public Notes: string,
    public taggedmembers: string
    ) { }
  }
  export class SearchDisplay {
    public constructor(
      public displayid:number,
      public name: string,
      public city: string,
      public state: string,
      public practice: string,
      public location: string

    ){}
  }
  export class Searchepisode {
    public constructor(
      public episodeid:number,
      public episodename: string,
      public DOB: string,
      public Gender: string,
      public Contact_No: string,
      public casemanager: string,
      public primarylocation: string,
      public episodecase_no: string,
      public Source:string,
      public status: string,
      public episodeage:string,



    ){}
  }
  export class TaskClass {
    public constructor(
      public Assignto:string,
      public episodetask: string,
      public Subject: string,
      public taskdescription: string,
      public taskduedate: string,
      public tasktype: string,
      public taskstatus: string,
      public taskfileupload: string,
      public taskdocumentcat:string,
      public taskdocumenttype: string,
      public taskprovider:string,
      public taskterminatedate:string,



    ){}
  }
  export class ReminderClass {
    public constructor(
      public Reminder:string,
      public reminderdate: string,
      public remindertime: string,
      public remindersearch: string,
    ){}
  }