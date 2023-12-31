import Reservation from "../../../models/Reservation";
import reservation from "../../../models/Reservation";
import {useNavigate} from "react-router-dom";

export const ListReservation: React.FC<{ reservation: Reservation }> = (props) => {
    const navigate = useNavigate();
    const onButtonClick = () => {
        validate();
    }
    const validate = async () => {
        const url = `http://localhost:8080/reservation/validateReservation?reservationId=${props.reservation.reservationId}`;
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }

        }
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            console.log('An error has occured');
        } else {
            navigate("/listReservations")
        }
    }
    return (
        <tr>
            <th scope="row"></th>
            <td>{props.reservation.reservationId}</td>
            <td>{props.reservation.beginDate.toString()}</td>
            <td>{props.reservation.endDate.toString()}</td>
            <td>{props.reservation.isValid && "true"}
                {!props.reservation.isValid && "false"}</td>
            <td>{props.reservation.username}</td>
            <td>{props.reservation.licencePlate}</td>
            <td>{!props.reservation.isValid &&
                <button className="btn main-color btn-sml text-white" onClick={onButtonClick}>Validate</button>
            }
            </td>
        </tr>
    );
}