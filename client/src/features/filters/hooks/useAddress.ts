import { useLocations } from "./useLocations.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { Location } from "../types.ts";

export function useAddress() {
  const [{ data: locations, isLoading }, setQueryParams] = useLocations();
  const [processedLocations, setProcessedLocations] = useState<Location[]>([]);
  const [addressFilter, setAddressFilter] = useState("");
  const [showAddressDropDown, setShowAddressDropDown] = useState(false);
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    const addressFilter = event.target.value;
    if (addressFilter) {
      setQueryParams((prevQueryParams) => ({
        ...prevQueryParams,
        filters: {
          address: addressFilter,
        },
      }));
    }
    setAddressFilter(addressFilter);
    setShowAddressDropDown(true);
  };

  useEffect(() => {
    const processLocationsBuffer = [];
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(addressFilter.trim())) {
      setProcessedLocations(locations);
    } else {
      locations?.forEach((location) => {
        if (location.streetNumber.startsWith(addressFilter.trim())) {
          processLocationsBuffer.push(location);
        }
        if (
          location.streetName
            .toLowerCase()
            .startsWith(addressFilter.trim().toLowerCase())
        ) {
          const exists = processLocationsBuffer.findIndex(
            (prevProcessedLocation) =>
              prevProcessedLocation.streetNumber === "" &&
              prevProcessedLocation.streetName === location.streetName &&
              prevProcessedLocation.city === location.city &&
              prevProcessedLocation.state === location.state &&
              prevProcessedLocation.country === location.country,
          );
          if (exists === -1) {
            processLocationsBuffer.push({
              id: location.id,
              streetNumber: "",
              streetName: location.streetName,
              city: location.city,
              state: location.state,
              country: location.country,
              postalCode: location.postalCode,
            });
          }
        }
        if (
          location.city
            .toLowerCase()
            .startsWith(addressFilter.trim().toLowerCase())
        ) {
          const exists = processLocationsBuffer.findIndex(
            (prevProcessedLocation) =>
              prevProcessedLocation.streetNumber === "" &&
              prevProcessedLocation.streetName === "" &&
              prevProcessedLocation.city === location.city &&
              prevProcessedLocation.state === location.state &&
              prevProcessedLocation.country === location.country,
          );
          if (exists === -1) {
            processLocationsBuffer.push({
              id: location.id,
              streetNumber: "",
              streetName: "",
              city: location.city,
              state: location.state,
              country: location.country,
              postalCode: location.postalCode,
            });
          }
        }
        if (
          location.state
            .toLowerCase()
            .startsWith(addressFilter.trim().toLowerCase())
        ) {
          const exists = processLocationsBuffer.findIndex(
            (prevProcessedLocation) =>
              prevProcessedLocation.streetNumber === "" &&
              prevProcessedLocation.streetName === "" &&
              prevProcessedLocation.city === "" &&
              prevProcessedLocation.state === location.state &&
              prevProcessedLocation.country === location.country,
          );
          if (exists === -1) {
            processLocationsBuffer.push({
              id: location.id,
              streetNumber: "",
              streetName: "",
              city: "",
              state: location.state,
              country: location.country,
              postalCode: location.postalCode,
            });
          }
        }
        if (
          location.country
            .toLowerCase()
            .startsWith(addressFilter.trim().toLowerCase())
        ) {
          const exists = processLocationsBuffer.findIndex(
            (prevProcessedLocation) =>
              prevProcessedLocation.streetNumber === "" &&
              prevProcessedLocation.streetName === "" &&
              prevProcessedLocation.city === "" &&
              prevProcessedLocation.state === "" &&
              prevProcessedLocation.country === location.country,
          );
          if (exists === -1) {
            processLocationsBuffer.push({
              id: location.id,
              streetNumber: "",
              streetName: "",
              city: "",
              state: "",
              country: location.country,
              postalCode: location.postalCode,
            });
          }
        }
      });
      setProcessedLocations(processLocationsBuffer);
    }
  }, [locations]);

  return {
    processedLocations,
    isLoading,
    addressFilter,
    setAddressFilter,
    handleAddressChange,
    showAddressDropDown,
    setShowAddressDropDown,
  };
}
