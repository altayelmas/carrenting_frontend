import {useEffect, useState} from "react";
import Reservation from "../../models/Reservation";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {ListReservation} from "./components/ListReservation";
import {Link} from "react-router-dom";
import {Pagination} from "../Utils/Pagination";

export const ListReservationsPage = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reservationsPerPage] = useState(10);
    const [totalAmountOfReservations, setTotalAmountOfReservations] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            const baseUrl: string = "http://localhost:8080/reservation";

            let url: string = ``;

            if (searchUrl === '') {
                url = `${baseUrl}/getAll?page=${currentPage - 1}&size=${reservationsPerPage}&username=`;
            } else {
                let searchWithPage = searchUrl.replace(`<pageNumber>`, `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

            const requestOptions = {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson.customerReservationDto;

            setTotalAmountOfReservations(responseJson.size);
            setTotalPages(Math.floor(responseJson.size / reservationsPerPage) + 1);

            const loadedReservations: Reservation[] = [];

            for (const key in responseData) {
                loadedReservations.push({
                    reservationId: responseData[key].reservationId,
                    beginDate: responseData[key].beginDate,
                    endDate: responseData[key].endDate,
                    isValid: responseData[key].isValid,
                    username: responseData[key].username,
                    licencePlate: responseData[key].licencePlate,
                })
            }

            setReservations(loadedReservations);
            setIsLoading(false);
        }
        fetchReservations().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search !== '') {
            setSearchUrl(`/getAll?page=<pageNumber>&size=${reservationsPerPage}&username=${search}`);
            console.log(searchUrl);
        } else {
            setSearchUrl(`/getAll?page=<pageNumber>&size=${reservationsPerPage}&username=`);
        }
    }

    const indexOfLastReservation: number = currentPage * reservationsPerPage;
    const indexOfFirstReservation: number = indexOfLastReservation - reservationsPerPage;
    let lastItem = reservationsPerPage * currentPage <= totalAmountOfReservations ? reservationsPerPage * currentPage : totalAmountOfReservations;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <input className='form-control me-2' type='search'
                                   placeholder='Search' aria-labelledby='Search'
                                   onChange={e => setSearch(e.target.value)}/>
                            <button className='btn btn-outline-success'
                                    onClick={searchHandleChange}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {totalAmountOfReservations > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfReservations})</h5>
                            </div>
                            <p>
                                {indexOfFirstReservation + 1} to {lastItem} of {totalAmountOfReservations} items:
                            </p>
                            <table className='table table-hover'>
                                <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Reservation Id</th>
                                    <th scope='col'>Begin Date</th>
                                    <th scope='col'>End Date</th>
                                    <th scope='col'>Is Valid</th>
                                    <th scope='col'>Username</th>
                                    <th scope='col'>Licence Plate</th>
                                    <th scope='col'></th>
                                </tr>
                                </thead>
                                <tbody>
                                {reservations.map(reservation => (
                                    <ListReservation reservation={reservation} key={reservation.reservationId}/>
                                ))}
                                </tbody>
                            </table>
                        </>
                        :
                        <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <Link type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                                  to='/home'>Return Home</Link>
                        </div>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}