import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IceGateService } from '../ice-gate.service';
import { LayoutComponent } from '../layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
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
    CommonModule,
    FormsModule ,
    MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['requestorId', 'modeOfTransport', 'vesselCode', 'portCode', 'status', 'actions'];
  dataSource: any;

  constructor(private dialog: MatDialog,
    private service: IceGateService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.list().subscribe(data => {
      this.dataSource = data;
    });
  }

  addData() {
    var dialogRef = this.dialog.open(LayoutComponent, {
      width: '800px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

  edit(element: any): void {
    var id = element.integrationRequestId;
    const dialogRef = this.dialog.open(LayoutComponent, {
      data: id,
      width: '800px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.load();
    });
  }

  delete(element: any) {
    this.service.delete(element.integrationRequestId).subscribe(data => {
      this.load();
    });
  }

  getStatusClass(stateId: string): string {
    switch (stateId) {
      case 'Created':
        return 'status-created';
      case 'Submitted':
        return 'status-submitted';
      case 'Acknowledged':
        return 'status-acknowledged';
      default:
        return 'status-default';
    }
  }

}
