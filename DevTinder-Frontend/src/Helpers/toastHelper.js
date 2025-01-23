import { toast } from "react-toastify";

// Implement a toast method that takes rest api response and displays the message based on the response status.
export const toastHelper = async (responseStatus, response) => {
  // Check the response based on the status and display the message
  if (responseStatus) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
