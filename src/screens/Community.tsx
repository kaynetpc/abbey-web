import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./Community.css";
import { BASE_URL } from "../config/endpoints";

type Props = {};

const Community = (props: Props) => {
  const { setIsLoading, user, autoLogin } = useAuth();
  const token = localStorage.getItem("accesstoken");
  const [active, setActive] = useState(-1);

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const url = BASE_URL + "/users?limit=10&offset=0";
      setIsLoading(true);
      const response = await (
        await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      const { data, hasError } = response;
      if (hasError) {
        setIsLoading(false);
        return;
      }
      setUsers(data);
      setIsLoading(false);
    })();
  }, []);

  const handleAddAsFriend = async (id: string) => {
    setIsLoading(true);
    const url = BASE_URL + `/profile/addfriend?friendId=${id}`;
    const { hasError, message } = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    if (hasError) {
      alert(message);
      setIsLoading(false);
      return;
    }
    autoLogin();
    alert(message);
    setIsLoading(false);
  };

  const handleFollow = async (id: string) => {
    setIsLoading(true);
    const url = BASE_URL + `/profile/follow?followingUserId=${id}`;
    const { data, hasError, message } = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    if (hasError) {
      alert(message);
      setIsLoading(false);
      return;
    }
    autoLogin();
    alert(message);
    setIsLoading(false);
  };

  const handleUnFollow = async (id: string) => {
    setIsLoading(true);
    const url = BASE_URL + `/profile/unfollow?followingUserId=${id}`;
    const { data, hasError, message } = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();

    if (hasError) {
      alert(message);
      setIsLoading(false);
      return;
    }
    autoLogin();
    alert(message);
    setIsLoading(false);
  };

  const trackIfFollow = (id: string) => {
    if (user?.following.find((x: any) => x.id === id)) {
      return true;
    }
    return false;
  };
  const trackIfIsFriend = (id: string) => {
    if (user?.friends.find((x: any) => x.id === id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="community-container">
      <h2>Community</h2>

      <div className="community-stats">
        <span> {user?.stats?.totalFriends} friends </span>
        <span>{user?.stats?.totalFollowers} Follower</span>
        <span>{user?.stats?.totalFollowing} Following</span>
      </div>

      <div className="community-list">
        {users.map((x: any, index: number) => {
          return (
            <div key={index} className="community-item">
              <div className="community-item-image">
                <img src="" alt="user-profile" />
              </div>
              <div>
                <h3>
                  {x?.firstName} {x?.lastName}
                </h3>
                <h4>Gender {`(${x?.gender || " - "})`}</h4>
              </div>
              <div className="community-item-details">
                <span
                  className="community-add-friend"
                  onClick={() => {
                    const isFriend = trackIfIsFriend(x?.id);
                    !isFriend && handleAddAsFriend(x?.id);
                    setActive(index);
                  }}
                >
                  {trackIfIsFriend(x?.id) ? "friend" : "add as friend"}
                </span>
                <span
                  className="community-follow"
                  onClick={() => {
                    const followStatus = trackIfFollow(x?.id);

                    if (!followStatus) {
                      handleFollow(x?.id);
                    } else {
                      handleUnFollow(x?.id);
                    }
                    setActive(index);
                  }}
                >
                  {trackIfFollow(x?.id) ? "unfollow" : "follow"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
