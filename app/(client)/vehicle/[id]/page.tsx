"use client";
import { usePathname } from "next/navigation";
import get from "@/app/actions/vehicle/get";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Vehicle } from "@/lib/types";
import { InputFile } from "@/components/input-file";

export default function VehicleWithId() {
  const path = usePathname();
  const id = parseInt(path.split("/").pop() as string, 10);

  const [loading, setLoading] = useState<boolean>(true);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await get(id);
        if (response.success) {
          const vehicle = response.data;
          setVehicle(vehicle as Vehicle);
        } else {
          toast({
            title: response.message,
            description: response.description,
          });
        }
      } catch (e) {
        console.error(e);
        toast({
          title: "Error",
          description: "An error occurred while fetching the vehicle.",
        });
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading || !vehicle) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <div className="flex justify-center h-full">
      <div className="h-1/4 flex justify-center items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {vehicle.name}
        </h2>
        <InputFile />
      </div>
    </div>
  );
}
