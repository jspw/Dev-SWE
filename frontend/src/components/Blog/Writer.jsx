import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

export default function Writer({
  firstName,
  lastName,
  bio,
  address,
  joinAt,
  username,
  userId,
  image,
  followers,
}) {
  const [user, setUser] = useContext(GlobalContext);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    followers.map((follower) => {
      if (follower.user.id === user.id) setIsFollowing(true);
    });
  }, []);

  function follow() {
    console.log(userId, user.id);
    axios({
      method: "POST",
      url: "follower/create",
      data: {
        userId,
        followerId: user.id,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Followed") setIsFollowing(true);
        if (response.data.message === "Unfollowed") setIsFollowing(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div className="col-span-1 bg-white p-4 shadow-md rounded ">
      <div className="h-4 bg-black"></div>
      <div className="flex flex-col justify-center space-y-2">
        <div className="flex">
          <div>
            <img
              height="30px"
              width="30px"
              className="rounded-full m-2"
              src={image}
            />
          </div>
          <div className="m-2 font-medium text-lg">
            {firstName} {lastName}
          </div>
        </div>
        <button
          disabled={userId === user.id ? true : false}
          onClick={follow}
          className="btn-dark rounded p-2 font-mono font-semibold text-gray-100 hover:text-white"
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
        <p>{bio}</p>
        <div>
          <p className="text-gray-500">LOCATION</p>
          <p className="">{address}</p>
        </div>
        <div>
          <p className="text-gray-500">JOINTED</p>
          <p className="">{joinAt}</p>
        </div>
      </div>
    </div>
  );
}
