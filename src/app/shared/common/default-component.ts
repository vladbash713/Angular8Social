export class DefaultComponent {
  constructor () {
    
  }
  getLocaleDate(date: any) {
    if(date.seconds) {
      const d = new Date(date.seconds*1000);
      return d.toLocaleDateString();
    } else {
      const d = new Date(date);
      return d.toLocaleDateString();
    }
  }
  getLocaleTime(date: any){
    if(date.seconds) {
      const d = new Date(date.seconds*1000);
      return d.toLocaleTimeString();
    } else {
      const d = new Date(date);
      return d.toLocaleTimeString();
    }
  }
  getLocaleDateTime(date: any) {
    if(date.seconds) {
      const d = new Date(date.seconds*1000);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    } else {
      const d = new Date(date);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
  }
}