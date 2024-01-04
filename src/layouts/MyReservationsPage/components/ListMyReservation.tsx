import Reservation from "../../../models/Reservation";

export const ListMyReservation: React.FC<{ reservation: Reservation }> = (props) => {
    return (
        <tr>
            <th scope="row"></th>
            <td>{props.reservation.reservationId}</td>
            <td>{props.reservation.beginDate.toString()}</td>
            <td>{props.reservation.endDate.toString()}</td>
            <td>{props.reservation.isValid && "true"}
                {!props.reservation.isValid && "false"}</td>
            <td>{props.reservation.licencePlate}</td>
        </tr>
    );
}