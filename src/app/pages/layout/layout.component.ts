import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IceGateService } from '../ice-gate.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  isCreate = true;
  isSumbit = false;
  isAcknowledge = false;
  voyageForm: FormGroup | any;
  voyageResponseForm : FormGroup | any;
  ackId: any;
  state = false;
  acksate = false

  constructor(private fb: FormBuilder,
    private service: IceGateService,
    private dialog: MatDialogRef<LayoutComponent>,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.load(this.data);
    }
    this.voyageForm = this.fb.group({
      requestorId: [null, Validators.required],
      recordType: [null, Validators.required],
      voyageCallNumber: [null, Validators.required],
      modeOfTransport: [null, Validators.required],
      typeOfTransportMeans: [null, Validators.required],
      identityOfTransportMeans: [null, Validators.required],
      vesselCode: [null],
      voyageNumber: [null, Validators.required],
      typeOfVessel: [null, Validators.required],
      purposeOfCall: [null],
      shippingAgentCode: [null],
      lineCode: [null, Validators.required],
      terminalOperatorCode: [null, Validators.required],
      portCode: [null, Validators.required],
      expectedDateTimeOfArrival: [null, Validators.required],
      expectedDateTimeOfDeparture: [null, Validators.required],
      serviceName: [null],
      allotmentDate: [null, Validators.required],
      manifestNumberOrRotationNumber: [null],
      manifestDateOrRotationDate: [null],
      requestePostedDate: [null],
      stateId: ['']
    });
    this.voyageResponseForm = this.fb.group({
      ackId: [null],
      commonRefNumber: [null],
      errorCode: [null],
      manifestDateOrRotationDate: [null],
      manifestNumberOrRotationNumber: [null],
      message: [null],
      requestorId: [null],
      responseRecivedDate: [null],
      status: [null]
    });
  }

  load(id: number) {
    this.service.select(id).subscribe(data => {
      this.ackId = data.ackId;
      this.voyageForm.patchValue(data);
      if (data.stateId === "Created") {
        this.isCreate = false;
        this.isSumbit = true;
        this.isAcknowledge = false;
      } else if (data.stateId === "Submitted") {
        this.state = true;
        this.isSumbit = false;
        this.isCreate = false;
        this.isAcknowledge = true;
      } else if (data.stateId === "Acknowledged") {
        this.state = true;
        this.acksate = true;
        this.isSumbit = false;
        this.isCreate = false;
        this.isAcknowledge = false;
      }
    });
  }

  onCreate(action: string) {
    if (!this.voyageForm.valid) {
      return;
    }

    const model = { text: this.voyageForm.value };
    if (action === "Created") {
      model.text.stateId = "Created";
      this.service.add(model).
        subscribe((res: any) => {
          if (res) {
            this.snackBar.open('Integration Details Created Successfully.', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
            this.dialog.close();
          }
        })
    } else if (action === "Submitted") {
      model.text.requestePostedDate = new Date();
      this.service.demoSubmit(model).
        subscribe((res: any) => {
          if (res) {
            this.voyageForm.value.ackId = res.ackId;
            var updatemodel = { text: this.voyageForm.value };
            model.text.stateId = "Submitted";
            this.service.update(this.data, updatemodel).
              subscribe((res: any) => {
                if (res) {
                  this.snackBar.open('Integration Details Submitted Successfully.', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                  });
                  this.dialog.close();
                }
              })
          }
        })
    } else if (action === "Acknowledged") {
      this.service.demoSelect(this.ackId).
        subscribe((res: any) => {
          if (res) {
            this.voyageResponseForm.value.ackId = res.ackId;
            this.voyageResponseForm.value.commonRefNumber = res.commonRefNumber;
            this.voyageResponseForm.value.errorCode = res.errorCode;
            this.voyageResponseForm.value.manifestDateOrRotationDate = res.manifestDateOrRotationDate;
            this.voyageResponseForm.value.manifestNumberOrRotationNumber = res.manifestNumberOrRotationNumber;
            this.voyageResponseForm.value.message = res.message;
            this.voyageResponseForm.value.requestorId = res.requestorId;
            this.voyageResponseForm.value.status = res.status;
            this.voyageResponseForm.value.responseRecivedDate = new Date();
           
            const addResponse = this.voyageResponseForm.value;
            this.service.addResponse(addResponse).
              subscribe((res: any) => {
                if (res) {
                  this.snackBar.open('Integration Details Acknowledged Successfully.', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                  });
                  // this.dialog.close();
                }
              })
              model.text.ackId = res.ackId;
              model.text.stateId = "Acknowledged";
              model.text.manifestDateOrRotationDate = res.manifestDateOrRotationDate;
              model.text.manifestNumberOrRotationNumber = res.manifestNumberOrRotationNumber;
              this.service.update(this.data, model).
              subscribe((res: any) => {
                if (res) {
                  this.dialog.close();
                }
              })
          }
        })
    }
  }


}
