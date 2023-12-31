import {ExploreTopCars} from "./components/ExploreTopCars";
import {Carousel} from "./components/Carousel";
import {Heros} from "./components/Heros";
import {CarServices} from "./components/CarServices";
import React from "react";

export const HomePage = () => {
    return (
        <>
            <ExploreTopCars/>
            <Carousel/>
            <Heros/>
            <CarServices/>
        </>
    );
}