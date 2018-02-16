import { Messages } from '../../messages/messages';
import { Photos } from '../../models/photos';
import { Place } from '../../models/place';
import { StepObject } from '../../models/step-object';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.sass']
})
export class PhotosComponent implements OnInit {
  blockTitleImd: any = '../../assets/imgs/reg-place/block-title-img.png';
  shapeMainImg: any = '../../assets/imgs/reg-place/photos/shape-main.png';
  shapeMiniatureImg: any = '../../assets/imgs/reg-place/photos/shape-miniature.png';
  shapeImagesButonsSep: any = '../../assets/imgs/reg-place/photos/shape-images-butons-sep.png';
  private id = 4;
  @Output() goNext: EventEmitter<StepObject>;
  @Output() goBack: EventEmitter<StepObject>;
  @Input() place: Place;

  cropperSettings: CropperSettings;

  @ViewChild('miniature', undefined)
  miniature: ImageCropperComponent;
  miniatureImg: any;

  @ViewChild('banner', undefined)
  banner: ImageCropperComponent;
  bannerImg: any;

  @ViewChild('galery', undefined)
  galery: ImageCropperComponent;
  galeryImg: any;

  constructor(public msgs: Messages, private ng2ImgMax: Ng2ImgMaxService, public sanitizer: DomSanitizer) {
    this.goNext = new EventEmitter();
    this.goBack = new EventEmitter();

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'back';
    this.cropperSettings.cropperDrawSettings.dragIconStrokeColor = 'back';
    this.cropperSettings.cropperDrawSettings.dragIconFillColor = 'back';
    this.cropperSettings.cropperClass = 'round';
    this.cropperSettings.noFileInput = true;
    this.miniatureImg = {};
    this.bannerImg = {};
    this.galeryImg = {};

  }

  fileChangeListener($event, cropper: string) {
    let file: File = $event.target.files[0];
    const image: any = new Image();
    file = this.resize(file);
    file = this.compress(file);
    const myReader: FileReader = new FileReader();
    const that = this;

    myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that[cropper].setImage(image);

    };

    myReader.readAsDataURL(file);
}

  compress (file: any): any {
    this.ng2ImgMax.compressImage(file, 1).subscribe(
      result => {
        file = new File([result], result.name);
      },
      error => {
        console.log('onCompress', error);
      }
    );
    return file;
  }

  resize(file: any): any {
    this.ng2ImgMax.resizeImage(file, 750, 452).subscribe(
      result => {
        file = new File([result], result.name);
      },
       error => {
          console.log('onResize', error);
       }
    );
    return file;
  }
  ngOnInit() {}

  onSubmit() {
    // this.place.photos.miniaturePath = this.placeService.savePhoto(this.miniatureImg.img);
    // this.place.photos.bannerPath = this.placeService.savePhoto((this.bannerImg.img);
    // this.place.photos.galeryPath = this.placeService.savePhoto((this.galeryImg.img);
    this.goNext.emit(new StepObject(this.id, this.place));
  }

  onRemove(remove: string) {
    const image: any = new Image();
    this[remove].setImage(image);
    this[remove + 'Img'] = {};
    this.place.photos[remove + 'Path'] = null;
  }

  onCancel() {
    this.miniatureImg = {};
    this.bannerImg = {};
    this.galeryImg = {};
    this.place.photos = new Photos();
  }

  onGoBack() {
    // this.place.photos.miniaturePath = this.placeService.savePhoto(this.miniatureImg.img);
    // this.place.photos.bannerPath = this.placeService.savePhoto(this.bannerImg.img);
    // this.place.photos.galeryPath = this.placeService.savePhoto(this.galeryImg.img);
    this.goBack.emit(new StepObject(this.id, this.place));
  }
}
