import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from 'src/app/shared/model/fileupload';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  file: File | null = null;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  fileUploads: any[];

  displayedColumns: string[] = ['position', 'name', 'actions'];

  constructor(
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.uploadService.getFileUploads().subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  onClickFileInputButton(): void {

    this.percentage = 0;

    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.file;
    this.file = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushUpload(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if(this.percentage === 100) {
          this.toastr.success('Successfully uploaded file!', 'Notification');
          this.getFiles();
        }
      },
      error => {
        console.log(error);
        this.toastr.error('Failed to upload file!', 'Error');
      }
    );
  }

  deleteFile(file){
    this.uploadService.deleteFileUpload(file.payload.doc.id, file.payload.doc.data().name)
      .then(() => {
        this.toastr.success('Removed file!', "Notification");
        this.getFiles();
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('Failed to remove file!', 'Error');
      });
  }

}
