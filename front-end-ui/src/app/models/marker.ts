export class Marker {
  private latitude: number;
  private longitude: number;
  private zoom: number;

  constructor(latitude?: number, longitude?: number, zoom?: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
  }

  setLatitude(lat: number): void {
    this.latitude = lat;
  }

  getLatitude(): number {
    return this.latitude;
  }

  setLongitude(lon: number): void {
    this.longitude = lon;
  }

  getLongitude(): number {
    return this.longitude;
  }

  setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  getZoom(): number {
    return this.zoom;
  }
}
