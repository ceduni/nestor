import { useEffect, useState } from "react";
import { QueryParams } from "../types.ts";
import { format } from "date-fns";

const toEn = {
  uni: "university",
  biblio: "library",
  café: "coffee",
  nature: "nature",
  labo: "laboratory",
  écran: "screen",
  tableau: "whiteboard",
  prise: "plug",
  projecteur: "projector",
  wifi: "wifi",
};

const toFr = {
  university: "uni",
  library: "biblio",
  coffee: "café",
  nature: "nature",
  laboratory: "labo",
  screen: "écran",
  whiteboard: "tableau",
  plug: "prise",
  projector: "projecteur",
  wifi: "wifi",
};

export function useFilter(setQueryParams, queryParams, setAddressFilter, setCapacity) {
  const [features, setFeatures] = useState<string[]>([]);
  const [tags, setTags] = useState([]);

  const handleCancelButtonClick = (cancelledTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== cancelledTag));
    if(features.includes(cancelledTag)) {
        setFeatures((prevFeatures) =>
            prevFeatures.filter((feature) => feature !== cancelledTag),
        );
    }
    else if (queryParams.filters.date.split('T')[0] === cancelledTag) {
        setQueryParams(({ pagination, filters = {} }: QueryParams) => {
            if(filters) delete filters.date
            return {
            pagination,
            filters: {
                ...filters
            },
        }});
    }
    else if (queryParams.filters.capacity === cancelledTag.split(' ')[1]) {
        setCapacity("")
        setQueryParams(({ pagination, filters = {} }: QueryParams) => {
            if(filters) delete filters.capacity
            return {
            pagination,
            filters: {
                ...filters,
                capacity: ""
            },
        }});
    }
    else if (queryParams.filters.address === cancelledTag) {
        setAddressFilter("")
        setQueryParams(({ pagination, filters = {} }: QueryParams) => {
            if(filters) delete filters.address
            return {
            pagination,
            filters: {
                ...filters,
                address: ""
            },
        }});
    }
  };

  const handleIconClick = (label: string) => {
    if (features.includes(label)) {
      setFeatures((prev) => prev.filter((item) => item !== label));
    } else {
      setFeatures((prev) => [...prev, label]);
    }
  };

  useEffect(() => {
    const featuresTranslated = features.map((feature: string) => toEn[feature]);
    setQueryParams(({ pagination, filters = {} }: QueryParams) => ({
      pagination,
      filters: {
        ...filters,
        features: featuresTranslated,
      },
    }));
  }, [features]);

  useEffect(() => {
    setTags([]);
    if (queryParams.filters) {
      const { date, address, capacity, features } = queryParams.filters;
      if (date) {
        setTags((prevTag) => [...prevTag, date.split('T')[0]]);
      }
      if (capacity) {
        setTags((prevTag) => [...prevTag, "capacité " + capacity]);
      }
      if (address) {
        setTags((prevTag) => [...prevTag, address]);
      }
      if (features.length !== 0) {
        features.forEach((feature: string) =>
          setTags((prevTag) => [...prevTag, toFr[feature]]),
        );
      }
    }
  }, [queryParams]);

  return {
    handleIconClick,
    handleCancelButtonClick,
    tags,
    features,
  };
}
