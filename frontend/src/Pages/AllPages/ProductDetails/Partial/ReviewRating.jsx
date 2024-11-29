import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetReviews from "@/Hooks/useGetReviews";
import Loader2 from "@/Utils/Loader2";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { toast } from "react-toastify";

const ReviewRating = ({ id }) => {
  const [reviews, isLoading, reviewFetch] = useGetReviews(id);
  const axiosPublic = useAxiosPublic();
  const [value, setValue] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.message.value;
    const userName = e.target.name.value;
    if(!value) return toast.error('select ratings')
    const reviewInfo = {
      userName,
      comment,
      productId: id,
      rating: value,
    };
    const res = await axiosPublic.post("/api/save-review", reviewInfo);
    if (res.data.status_code === 200) {
      reviewFetch();
      toast.success(res.data.message);
      setValue(null);
      e.target.reset();
    }
  };

  if (isLoading) return <Loader2 />;

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-4/12">
        <h1 className="text-lg font-medium text-color_1">Give your feedback</h1>
        <form onSubmit={handleSubmit} className="mt-2 space-y-2">
          <div className="">
            <label className="font-semibold">
              Name
              <span className="text-red-400 ml-1">(required)</span>{" "}
            </label>
            <input
              type="text"
              name="name"
              className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
              placeholder="Type Here"
              required
            />
          </div>
          <div className="">
            <label className="font-semibold">
              Message
              <span className="text-red-400 ml-1">(required)</span>{" "}
            </label>
            <textarea
              className="bg-white focus:ring-0 px-4 py-2 focus:border w-full focus:outline-none border border-black -mb-2"
              name="message"
              required
              rows="4"
              placeholder="Write your message"
            ></textarea>
          </div>
          <Rating
            value={value}
            onChange={(e) => setValue(e.value)}
            cancel={false}
            required
          />
          <button type="submit" className="button_primary w-full">
            Submit
          </button>
        </form>
      </div>
      <div className="lg:w-8/12">
        <h1 className="text-xl font-medium text-color_1 flex justify-between items-center">
          <span>Product Review</span>{" "}
          <span>
            <Rating
              value={reviews?.avgReview?.averageRating}
              readOnly
              cancel={false}
            />
          </span>
        </h1>
        <div className="mt-4">
          {reviews.result.map((review) => (
            <div key={review._id}>
              <h1 className="font-medium text-lg flex items-center gap-1 border-b border-color_3">
                <div className="h-3 w-3 rounded-full bg-color_1"></div>{" "}
                {review.userName}
              </h1>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewRating;
