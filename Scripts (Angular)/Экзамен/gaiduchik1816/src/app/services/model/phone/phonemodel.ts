export class Phone {
    public id: number;
    public artic: string;
    public name: string;
    public manufacture: string;
    public date: number;
    public size: string;
    public camera: number;
    public price: number;
    public buy: number;
  
  
    constructor(artic: string , name: string, manufacture: string, 
        date: number, size: string, camera: number, price: number, buy: number, id?: number) {
      this.id = id;
      this.artic = artic;
      this.name = name;
      this.manufacture = manufacture;
      this.date = date;
      this.size = size;
      this.camera = camera;
      this.price = price;
      this.buy = buy;
    }
  }
  

  // id артикул название производитель год_выпуска разрешение_экрана камера цена колво_заказов