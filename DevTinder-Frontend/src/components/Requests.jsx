import { useDispatch, useSelector } from "react-redux";
import { receivedConnectionRequests } from "../Helpers/restHelper";
import { toastHelper } from "../Helpers/toastHelper";
import { addRequest } from "../Helpers/Slices/requestsSlice";
import { useEffect } from "react";
import { reviewRequestsReceived } from "../Helpers/restHelper";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  //Implement method to fetch all received requests
  const getUserRequests = async () => {
    //Call getConnections method from restHelper
    try {
      let responseStatus = false;
      const response = await receivedConnectionRequests();
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        dispatch(addRequest(parseRes.data));
      }
      //toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  //Implement method to review requests received
  const reviewUserRequestsReceived = async (action, id) => {
    //Call getConnections method from restHelper
    try {
      let responseStatus = false;
      const response = await reviewRequestsReceived(action, id);
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        removeRequest(id);
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  //Implement method to remove current reqquest from state requests
  const removeRequest = (id) => {
    const newRequests = requests.filter((request) => request._id !== id);
    dispatch(addRequest(newRequests));
  };

  useEffect(() => {
    getUserRequests();
  }, []);

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-bold text-2xl">Requests</h1>
        <div className="flex justify-center flex-wrap">
          {requests &&
            requests.map((request) => {
              const { firstName, lastName, about, photoUrl, age, gender } =
                request.sender;
              return (
                <div
                  className="m-4 p-4 flex rounded-lg bg-base-300 w-1/2"
                  key={request._id}
                >
                  <div>
                    <img
                      src={photoUrl}
                      className="w-50 h-20 rounded-lg"
                      alt="Photo"
                    />
                  </div>
                  <div className="text-left ml-4">
                    <h2 className="text-bold text-xl">
                      {firstName} {lastName}
                    </h2>
                    <p>
                      {age} {gender}
                    </p>
                    <p>{about}</p>
                  </div>
                  <div className="ml-auto flex flex-col gap-3">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        reviewUserRequestsReceived("rejected", request._id)
                      }
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() =>
                        reviewUserRequestsReceived("accepted", request._id)
                      }
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
