"use client"

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { Trip } from "@/lib/types";
import getAllTrips from "@/app/actions/trip/getAll";
import { useRecoilState } from "recoil";
import { tripsAtom } from "@/atoms/trip";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/loading";

export default function GetTrips() {
    const data = [
        { id: 1, from: "New York", to: "Boston", driver: "John Doe", fare: 120.50 },
        { id: 2, from: "San Francisco", to: "Los Angeles", driver: "Jane Smith", fare: 150.00 },
        { id: 3, from: "Chicago", to: "Detroit", driver: "Bob Johnson", fare: 95.75 },
        { id: 4, from: "Miami", to: "Orlando", driver: "Alice Brown", fare: 80.20 },
        { id: 5, from: "Seattle", to: "Portland", driver: "Chris Davis", fare: 110.00 },
        { id: 6, from: "Houston", to: "Dallas", driver: "Pat Taylor", fare: 105.30 },
        { id: 7, from: "Denver", to: "Salt Lake City", driver: "Kim Lee", fare: 130.45 },
        { id: 8, from: "Las Vegas", to: "Phoenix", driver: "Sam Wilson", fare: 140.25 },
        { id: 9, from: "Philadelphia", to: "Pittsburgh", driver: "Kelly Martinez", fare: 85.90 },
        { id: 10, from: "Atlanta", to: "Nashville", driver: "Alex White", fare: 115.00 }
    ];

    const [trips, setTrips] = useState<Trip[]>([]);
    // const [trips, setTrips] = useRecoilState(tripsAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const shouldRun = trips ? false : true;

    // useFetchData(shouldRun, setTrips, getAllTrips, setLoading);

    useEffect(() => {
        const fetch = async () => {
            const response = await getAllTrips();
            // console.log(response);
            setTrips(response.data);
        }

        fetch();
    }, [setTrips]);

    // console.log(trips)

    if(loading) return <Loading />

    return (
        <>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={trips!} />
            </div>
        </>
    )
}