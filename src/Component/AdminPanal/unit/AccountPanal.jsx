//import { useEffect, useState } from "react";
//import axios from "axios";

import { useState } from "react";

export function AccountPanal() {
  const [user] = useState(null);
  const [error] = useState(null);
 // const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  {/*useEffect(() => {
    axios
      .get()
      .then((res) => {
        const allUsers = res?.data?.users || [];
        
        setUser(allUsers[0] || null);
      })
      .catch((err) => {
        console.error("Error fetching users", err);
        setError("Failed to fetch users.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
*/}
  return (
    <div className="border-b mb-4 mt-2 p-4">
      {error && <p className="text-red-500">{error}</p>}
      <>
        <button
          className="flex p-2 hover:bg-gray-700 rounded transition-colors relative gap-2 w-full items-center"
        >
          <div className="size-8 rounded-full text-white" />
          <div className="text-start text-white">
            <span className="text-sm font-bold block">
                      {user ? `${user.firstName} ${user.lastName}` : "No user found"}
                    </span>
                    <span className="text-xs text-stone-400">
                      {user ? user.email : ""}
                    </span>
                  </div>
                  <div className="absolute right-2 top-1/2 translate-y-[-50%] text-xs text-white" />
                </button>
              </>
            </div>
          );
        }
