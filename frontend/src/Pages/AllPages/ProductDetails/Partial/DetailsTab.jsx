import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReviewRating from "./ReviewRating";
import { imgUrl } from "@/Utils/imageUrl";

const DetailsTab = ({ singleProduct }) => {
  return (
    <div>
      <div className="mb-10 mt-5 border-2 border-color_2 p-4">
        <Tabs>
          <TabList>
            <Tab>
              <h2 className="font-bold text-text_large">Description</h2>
            </Tab>
            <Tab>
              <h2 className="font-bold text-text_large ">Review</h2>
            </Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              {singleProduct.imgDetails.map((item) => (
                <div key={item._id} className="border p-2 rounded-md">
                  <div className="h-40 w-full overflow-hidden mb-3">
                    <img
                      src={`${imgUrl.product}${item.img}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p>
                    <span className="text-color_1 font-semibold">{item.details.split(/\.(.*)/s)[0]}</span>{" "}
                    <span>{item.details.split(/\.(.*)/s)[1]}</span>
                  </p>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <ReviewRating id={singleProduct._id} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default DetailsTab;
