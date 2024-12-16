import React from "react";
import { setColors, setContacts } from "../../redux/AuthSlice";
import { getOrWatchUserPosition } from "../../utils/helpers/location";
import socket from "../../utils/Socket";
import { useDispatch, useSelector } from "react-redux";

export function InitialFetch() {
  const dispatch = useDispatch();
  const { rider_id, userAppOpenLocation } = useSelector((store) => store.auth);
  const { latitude, longitude } = userAppOpenLocation;

  // Fetch Colors By Restaurant
  

  // Watch Position and Update Store
  React.useEffect(() => {
    getOrWatchUserPosition(dispatch);
  }, [dispatch]);

  // Handle Socket Connection and Events
  React.useEffect(() => {
    // Attach permanent listeners only on mount
    const handleContacts = (contactsData) => {
      dispatch(setContacts(contactsData));
    };

    const handleError = (error) => {
      console.error("Socket Error:", error.message);
    };

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("getContacts", { rider_id });
    });

    socket.on("contacts", handleContacts);
    socket.on("error", handleError);

    // Cleanup on unmount
    return () => {
      console.log("Cleaning up socket listeners...");
      socket.off("connect");
      socket.off("contacts", handleContacts);
      socket.off("error", handleError);
    };
  }, [dispatch, rider_id]);

  // Emit Location Updates
  React.useEffect(() => {
    if (latitude && longitude) {
    //   console.log("Updating rider location to socket:", { latitude, longitude });
      socket.emit("updateRiderLocation", {
        rider_id,
        latitude,
        longitude,
      });
    }
  }, [latitude, longitude, rider_id]);

  // Fetch Colors by Restaurant
  // React.useEffect(() => {
  //   getColorsByRestaurant("res_4074614");
  // }, []);

  return null; // Safe return for React components
}
