import PropTypes from "prop-types";
import { baseUrl } from "../Helpers/restHelper";
const UserCard = ({ user = {}, readOnly = false }) => {
  const { firstName, lastName, gender, photoUrl, skills, about, age, emailId } =
    user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={baseUrl + "/" + photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {age} {gender} {emailId}
          </p>
          <p>{skills}</p>
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button disabled={readOnly} className="btn btn-primary btn-sm">
              Ignore
            </button>
            <button disabled={readOnly} className="btn btn-secondary btn-sm">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
UserCard.propTypes = {
  readOnly: PropTypes.bool,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    about: PropTypes.string,
    age: PropTypes.number,
    emailId: PropTypes.string,
  }),
};

export default UserCard;
