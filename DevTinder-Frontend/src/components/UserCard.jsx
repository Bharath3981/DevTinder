import React from "react";

const UserCard = (props) => {
  const { firstName, lastName, gender, photoUrl, skills, about, age, emailId } =
    props?.user;
  console.log(props.user);
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>
            {age} {gender} {emailId}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary btn-sm">Ignore</button>
            <button className="btn btn-secondary btn-sm">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
