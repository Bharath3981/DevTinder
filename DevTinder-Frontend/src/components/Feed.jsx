import { useEffect } from "react";
import { getFeed } from "../Helpers/restHelper";
import { toastHelper } from "../Helpers/toastHelper";
import { useDispatch } from "react-redux";
import { addFeed } from "../Helpers/Slices/feedSlice";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  //Implement feed fetch method
  const getUserFeed = async () => {
    try {
      if (feed) return;
      const response = await getFeed();
      const parseRes = await response.json();
      if (response.ok) {
        dispatch(addFeed(parseRes.data));
      }
    } catch (error) {
      toastHelper(false, error);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return (
    <>
      {feed?.length && (
        <div className="flex justify-center mt-28">
          <UserCard user={feed[0]}></UserCard>
        </div>
      )}
    </>
  );
};

export default Feed;
