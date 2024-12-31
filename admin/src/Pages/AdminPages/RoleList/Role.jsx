import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../../../Utils/Loader";
import { IoAddCircleOutline } from "react-icons/io5";
import { button } from "@/Utils/Class/button";

const Role = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all_role_list"],
    queryFn: async () => {
      const res = await axiosSecure("/api/get-role");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/api/delete-role/${id}`);
      if (res.data) {
        toast.success("Role Deleted Successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mx-2 py-4 space-y-2">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 bg-gray-100 mb-2 w-full ">
          <div className="flex">
            <button
              className={button.tableButton}
            >
              All Role
            </button>
          </div>
          {
          (
            <Link
              to="/admin/createRole"
              className={`${button.tableButton} flex gap-2 items-center`}
            >
              <IoAddCircleOutline className="text-2xl font-bold" />
              <span>New Role</span>
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-500">
          {/* head */}
          <thead className="h-[40px] bg-bg_slate text-_white">
            <tr className="uppercase text-center py-2 font-bold">
              <th className="text-text_sm table_border border uppercase w-2/12">
                Role Name
              </th>
              <th className="text-text_sm table_border border uppercase">
                Permissions
              </th>
              <th className="text-text_sm table_border border  uppercase w-2/12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" text-center">
            {data.result.map((data) => {
              return (
                <tr key={data._id}>
                  <td
                    className={`text-xl whitespace-nowrap text-center border font-semibold border-gray-500 text-black `}
                  >
                    {data.roleName.charAt(0).toUpperCase() + data.roleName.slice(1)}
                  </td>
                  <td
                    className={`px-6 pt-2 text-text_sm whitespace-nowrap text-center border border-gray-500 text-black `}
                  >
                    <div className="flex flex-wrap gap-2">
                      {data.permissions.map((name, idx) => (
                        <span
                          className="bg-gradient-to-r from-orange-800 to-gray-700 text-_white px-2 py-1"
                          key={idx}
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    className={`px-6 pt-2 text-text_sm border-gray-500 whitespace-nowrap  text-center border text-black `}
                  >
                    {data.roleName !== 'super admin' && <div className="flex gap-2 justify-center">
                      {
                       (
                        <Link
                          to={`/admin/editRole`}
                          state={data}
                          className="button_primary"
                        >
                          Edit
                        </Link>
                      )
                      }
                      {
                      (
                        <button
                          className="button_delete"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete
                        </button>
                      )
                      }
                    </div>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Role;
