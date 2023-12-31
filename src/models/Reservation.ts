class Reservation {
    reservationId: number;
    beginDate: Date;
    endDate: Date;
    isValid: boolean;
    username: string;
    licencePlate: string;


    constructor(reservationId: number, beginDate: Date, endDate: Date, isValid: boolean, username: string, licencePlate: string) {
        this.reservationId = reservationId;
        this.beginDate = beginDate;
        this.endDate = endDate;
        this.isValid = isValid;
        this.username = username;
        this.licencePlate = licencePlate;
    }
}

export default Reservation;