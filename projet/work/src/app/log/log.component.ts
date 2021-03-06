import { HttpClient, HttpErrorResponse,  HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadFileService } from '../service/upload-file.service';
import { saveAs } from 'file-saver';
import { User } from '../classe/user';
import { LogService } from '../service/log.service';



@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']

})
export class LogComponent implements OnInit{
  
  title = 'SendMail';
  dataset: Details = {
    nom:'',
    prenom:'',
    activite:'',
    adresse:'',
    bibliographie:'',
    email:'',
    password:'',
  };

  user:User = new User();

  filenames : string[]  = []  ;
  fileStatus = { status: '', requestType: '', percent: 0 };

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}


    
    
  ];

  constructor(private fb: FormBuilder,
    private fileService: UploadFileService,
    private logService: LogService,
    private https: HttpClient
 ) {}


 



    // define a function to upload files
    onUploadFiles(files: File[] ): void {
      const formData = new FormData();
      for (const file of files  ) { formData.append('files', file, file.name); }
      this.fileService.upload(formData).subscribe({
        complete: () => { },
       error: ( error:HttpErrorResponse) => { 
          console.log(error);
         },    
        next: (event) => {
          console.log(event);
          this.resportProgress(event);
         }     
    });
  }
      /*this.fileService.upload(formData).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }*/
  
    // define a function to download files
    
    
    onDownloadFiles(filename: string): void {
      this.fileService.download(filename).subscribe({
        complete: () => { 
  
         },
        error: (error:HttpErrorResponse) => {  console.log(error); },    
        next: (event ) => { 
          console.log(event);
          this.resportProgress(event);
         }     
    }
    );
  }
  
   /* onDownloadFile(filename: string): void {
      this.fileService.download(filename).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }*/
  
    private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
      switch(httpEvent.type) {
        case HttpEventType.UploadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
          break;
        case HttpEventType.DownloadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Header returned', httpEvent);
          break;
        case HttpEventType.Response:
          if (httpEvent.body instanceof Array) {
            this.fileStatus.status = 'done';
            for (const filename of httpEvent.body) {
              this.filenames.unshift(filename);
            }
          } else {
            saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                    {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
            // saveAs(new Blob([httpEvent.body!], 
            //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
            //    httpEvent.headers.get('File-Name'));
          }
          this.fileStatus.status = 'done';
          break;
          default:
            console.log(httpEvent);
            break;
        
      }
    }
  
    private updateStatus(loaded: number, total: number, requestType: string): void {
      this.fileStatus.status = 'progress';
      this.fileStatus.requestType = requestType;
      this.fileStatus.percent = Math.round(100 * loaded / total);
    }
  
  
   ngOnInit(): void {

   }
   userLog() {
    console.log(this.user);
    this.logService.users(this.user).subscribe({
    
      error: (error) => { "Sorry user not register" },    
      next: (data ) => {  alert("successfully user is register")  }, 
     
  }
  );

  /* userLog() {
     console.log(this.user);
     this.logService.registerUser(this.user).subscribe(
       data=> {
         alert("successfully user is register")

       }, error=>alert("Sorry user not register")
      
      );*/
   }
  


   onSubmit(): void {
    alert('Thanks!');
  
    this.https.post<Details>('http://localhost:8080/testapp/getdetails', this.dataset).subscribe(
      res => {
        this.dataset = res;
        console.log(this.dataset);
        alert('Email Sent successfully');
        this.dataset.nom ='';
        this.dataset.prenom ='';
        this.dataset.bibliographie ='';
        this.dataset.activite ='';
        this.dataset.adresse ='';
        this.dataset.email ='';
        this.dataset.password ='';

       
      });
  }
  }
  
  interface Details{
    nom:string;
    prenom:String;
    bibliographie:String;
    activite:String;
    adresse:String;
    password:String;
    email:string;
    }
  

    
  



