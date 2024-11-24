import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReviewRating from "./ReviewRating";

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
            <div
              dangerouslySetInnerHTML={{
                __html: singleProduct.details,
              }}
              className=" text-text_standard font-medium"
            ></div>
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
