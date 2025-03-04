import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";

function AsideYourProfile({ id }) {
  const { getUser } = useChatStore();
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      setSelectedUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <aside className="w-full lg:w-1/4 flex flex-col dark:text-white items-center rounded-lg gap-10 justify-between">
        <div className="group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-emerald-300 via-emerald-600 to-emerald-900 before:absolute before:top-0 w-full h-72 relative flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div
            className="w-28 h-28 mt-8 rounded-full border-4 border-neutral-100 dark:border-zinc-900 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 cursor-pointer"
            style={{
              backgroundImage: `url(${
                selectedUser.profileImageUrl ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
            <span className="text-2xl font-semibold text-zinc-800 dark:text-slate-100">{`${selectedUser.name} ${selectedUser.lastname}`}</span>
            <p className="text-zinc-600 dark:text-zinc-500">
              {selectedUser.email}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AsideYourProfile;
