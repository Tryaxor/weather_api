import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
})
export class WeatherDisplayComponent implements OnInit {
  _weatherInfo: any = null;
  imgURL: any = null;

  get weatherInfo(): any {
    return this._weatherInfo;
  }

  @Input() set weatherInfo(value: any) {
    this._weatherInfo = value;
    let iconcode = this._weatherInfo?.weather?.[0]?.icon;
    this.imgURL = iconcode ? 'http://openweathermap.org/img/w/' + iconcode + '.png' : null;
  }

  constructor() {}

  ngOnInit(): void {}
}
