import { useEffect } from "react";
import { getConnections } from "../Helpers/restHelper";
import { toastHelper } from "../Helpers/toastHelper";
import { useDispatch } from "react-redux";
import { addConnections } from "../Helpers/Slices/connectionSlice";
import { useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  //Implement method to fetch all connections
  const getUserConnections = async () => {
    //Call getConnections method from restHelper
    try {
      let responseStatus = false;
      const response = await getConnections();
      responseStatus = response.ok;
      const parseRes = await response.json();
      if (responseStatus) {
        console.log(parseRes.data);
        dispatch(addConnections(parseRes.data));
      }
      toastHelper(responseStatus, parseRes);
    } catch (error) {
      toastHelper(false, error);
    }
  };

  useEffect(() => {
    getUserConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-bold text-2xl">No Connections</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      <div className="flex justify-center flex-wrap">
        {connections.map((connection) => {
          const { firstName, lastName, about, _id, photoUrl, age, gender } =
            connection;
          return (
            <div
              className="m-4 p-4 flex rounded-lg bg-base-300 w-1/2"
              key={_id}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
