class Car {
    licencePlate: string;
    carType: string;
    carBrand: string;
    carModel: string;
    gearType: string;
    price: number;
    seats: number;
    img?: string;
    isAvailable: boolean;

    constructor(licencePlate: string, carType: string, carBrand: string, carModel: string, gearType: string, price: number, seats: number, img: string, isAvailable: boolean) {
        this.licencePlate = licencePlate;
        this.carType = carType;
        this.carBrand = carBrand;
        this.carModel = carModel;
        this.gearType = gearType;
        this.price = price;
        this.seats = seats;
        this.img = img;
        this.isAvailable = isAvailable;
    }
}

export default Car;