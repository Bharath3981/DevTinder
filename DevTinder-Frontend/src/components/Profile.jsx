import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

const EditProfile = lazy(() => import("./EditProfile"));

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      {user && (
        <Suspense fallback={<div>Loading...</div>}>
          <EditProfile user={user} />
        </Suspense>
      )}
    </div>
  );
};

export default Profile;
