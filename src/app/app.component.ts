import { Component } from '@angular/core';
import { DownloadService } from './services/download.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular7Project';
  fileURL: string;
  error: string;

  constructor(
    private downloads: DownloadService,
  ) {
  }

  downloadPdf() {
    this.error = '';
    let fileName = '';
    let messageSuccess = '';

    // Error
    // this.fileURL = 'https://emision-qa.vivirseguros.pe/POLIZAS/Poliza_0000001644/Poliza0000001644_BARREDA_PONCE_ROSA%20INES_20230810_174616.pdf';
    // this.fileURL = 'https://emision-qa.vivirseguros.pe/POLIZAS/Poliza_0000001644/Póliza0000001644_BARREDA_PONCE_ROSA%20INES_20230810_174616.pdf';

    // Bien
    // this.fileURL = 'https://soatapi.vivirseguros.pe/Resources/Files/1000046708/0/SoatVivirSeguros.pdf';
    try {
      const subDownload = this.downloads
        .download(this.fileURL)
        .pipe(finalize(() => subDownload.unsubscribe()))
        .subscribe(blob => {
          console.log("🚀 ~ file: app.component.ts:36 ~ AppComponent ~ downloadPdf ~ blob:", blob)
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = '' + fileName + '.pdf';
          a.click();
          URL.revokeObjectURL(objectUrl);

          console.log('Se ha descargado la póliza',);
        }, error => {
          this.error = error;
        });
    } catch (error) {
      this.error = error;
    }
  }
}
