import {useEffect, useState} from "react";
import Car from "../../models/Car";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {SearchCar} from "./components/SearchCar";
import {Pagination} from "../Utils/Pagination";
import {Link} from "react-router-dom";

export const SearchCarsPage = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(5);
    const [totalAmountOfCars, setTotalAmountOfCars] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [brandSelection, setBrandSelection] = useState('All');

    useEffect(() => {
        const fetchCars = async () => {
            const baseUrl: string = "http://localhost:8080/vehicle";

            let url: string = ``;

            if (searchUrl === '' && brandSelection === 'All') {
                url = `${baseUrl}/getAllAvailableCars?page=${currentPage - 1}&size=${carsPerPage}&carBrand=&carModel=`;
            } else {
                let searchWithPage = searchUrl.replace(`<pageNumber>`, `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson.vehicleDtoList;

            setTotalAmountOfCars(responseJson.vehicleAmount);
            setTotalPages(Math.floor(responseJson.vehicleAmount / carsPerPage) + 1);

            const loadedCars: Car[] = [];

            for (const key in responseData) {
                loadedCars.push({
                    licencePlate: responseData[key].licencePlate,
                    carType: responseData[key].carType,
                    carBrand: responseData[key].carBrand,
                    carModel: responseData[key].carModel,
                    gearType: responseData[key].gearType,
                    price: responseData[key].price,
                    seats: responseData[key].seats,
                    img: responseData[key].img,
                    isAvailable: responseData[key].available,
                })
            }

            setCars(loadedCars);
            setIsLoading(false);
        }
        fetchCars().catch((error: any) => {
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
        if ((brandSelection === 'Audi' ||
            brandSelection === 'Mercedes' ||
            brandSelection === 'Peugeot' ||
            brandSelection === 'Renault' ||
            brandSelection === 'Volkswagen') && search === '') {
            setBrandSelection(brandSelection);
            setSearchUrl(`/getAllAvailableCars?page=<pageNumber>&size=${carsPerPage}&carBrand=${brandSelection}&carModel=${search}`);
        } else if ((brandSelection=== 'Audi' ||
            brandSelection === 'Mercedes' ||
            brandSelection === 'Peugeot' ||
            brandSelection === 'Renault' ||
            brandSelection === 'Volkswagen') && search !== ''){
            setSearchUrl(`/getAllAvailableCars?page=<pageNumber>&size=${carsPerPage}&carBrand=${brandSelection}&carModel=${search}`)
        } else if (!((brandSelection === 'Audi' ||
            brandSelection === 'Mercedes' ||
            brandSelection === 'Peugeot' ||
            brandSelection === 'Renault' ||
            brandSelection === 'Volkswagen')) && search !== '') {
            setSearchUrl(`/getAllAvailableCars?page=<pageNumber>&size=${carsPerPage}&carBrand=&carModel=${search}`);
        } else {
            setSearchUrl('');
        }
    }

    const brandField = (value: string) => {
        setCurrentPage(1);
        if (value === 'Audi' ||
            value === 'Mercedes' ||
            value === 'Peugeot' ||
            value === 'Renault' ||
            value === 'Volkswagen') {
            setBrandSelection(value);
        } else {
            setBrandSelection('All');
        }
    }

    const indexOfLastCar: number = currentPage * carsPerPage;
    const indexOfFirstCar: number = indexOfLastCar - carsPerPage;
    let lastItem = carsPerPage * currentPage <= totalAmountOfCars ? carsPerPage * currentPage : totalAmountOfCars;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                       placeholder='Search' aria-labelledby='Search'
                                       onChange={e => setSearch(e.target.value)}/>
                                <button className='btn btn-outline-success'
                                        onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {brandSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => brandField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Audi')}>
                                        <a className='dropdown-item' href='#'>
                                            Audi
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Mercedes')}>
                                        <a className='dropdown-item' href='#'>
                                            Mercedes
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Peugeot')}>
                                        <a className='dropdown-item' href='#'>
                                            Peugeot
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Renault')}>
                                        <a className='dropdown-item' href='#'>
                                            Renault
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Volkswagen')}>
                                        <a className='dropdown-item' href='#'>
                                            Volkswagen
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfCars > 0 ?
                        <>
                            <div className='mt-3'>
                                <h5>Number of results: ({totalAmountOfCars})</h5>
                            </div>
                            <p>
                                {indexOfFirstCar + 1} to {lastItem} of {totalAmountOfCars} items:
                            </p>
                            {cars.map(car => (
                                <SearchCar car={car} key={car.licencePlate}/>
                            ))}
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