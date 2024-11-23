import { useRef, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ImageUploading from "react-images-uploading";
import uploadIcon from "@/assets/asset/upload.png";
import useGetProductCat from "@/Hooks/Apis/useGetProductCat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "/components/ui/select";
import Loader2 from "@/Utils/Loader2";
import Selects from "react-select";
import useGetTag from "@/Hooks/Apis/useGetTag";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";

const page = "";
const rows = "";

const AddProduct = () => {
    const [loader, setLoader] = useState(false)
  const axiosSecure = useAxiosSecure();
  const [productCat, productCatLoading] = useGetProductCat(page, rows);
  const [tag, tagLoading] = useGetTag(page, rows);
  const [cat, setCat] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const imgPreviewer = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!cat) return toast.error("Select Category");
    const name = e.target.name.value;
    const brand = e.target.brand.value;
    const price250 = e.target.price250.value;
    const price500 = e.target.price5000.value;
    const price1000 = e.target.price1000.value;
    const price5000 = e.target.price5000.value;
    const discount = e.target.discount.value;
    const tags = selectedTags.map((tag) => tag.value);
    const detailsMsg = editorRef.current.getContent();

    const priceArr = [
        {
            count: '250gm',
            countPrice: parseInt(price250)
        },
        {
            count: '500gm',
            countPrice: parseInt(price500)
        },
        {
            count: '1000gm',
            countPrice: parseInt(price1000)
        },
        {
            count: '5000gm',
            countPrice: parseInt(price5000)
        },
    ]

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", JSON.stringify(priceArr));
    formData.append("brand", brand);
    formData.append("category", cat);
    formData.append("discount", discount);
    formData.append("details", detailsMsg);
    tags.forEach((tags) => formData.append("tags", tags));
    images.forEach((file) => formData.append("images", file.file));

    try {
      const res = await axiosSecure.post("/api/create-product", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        e.target.reset();
        setLoader(false);
        setImages([]);
        navigate("/admin/productList");
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data);
    }
  };

  if (productCatLoading || tagLoading) return <Loader2 />;

  const options = tag.result.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  return (
    <>
      <div className="px-3 py-2">
        <div className="border py-1 w-full px-4 bg-gray-700 text-white">
          <h6 className="text-xl font-semibold text-center">Add Product</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-2 mt-2">
            <div className="col-span-12 lg:col-span-6">
              <label className="font-semibold">
                Product Name
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
            <div className="col-span-12 lg:col-span-6">
              <label className="font-semibold">
                Brand Name
                <span className="text-red-400 ml-1">(required)</span>{" "}
              </label>
              <input
                type="text"
                name="brand"
                defaultValue={"Ghuri"}
                className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                placeholder="Type Here"
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col lg:flex-row gap-2">
              <div className="lg:flex-1">
                <label className="font-semibold">
                  250gm Price
                  <span className="text-red-400 ml-1">(required)</span>{" "}
                </label>
                <input
                  type="number"
                  name="price250"
                  className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                  required
                />
              </div>
              <div className="lg:flex-1">
                <label className="font-semibold">
                  500gm Price
                </label>
                <input
                  type="number"
                  name="price500"
                  className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="font-semibold">
                Product Category
                <span className="text-red-400 ml-1">(required)</span>{" "}
              </label>
              <Select required onValueChange={(value) => setCat(value)}>
                <SelectTrigger className="bg-white focus:ring-0 px-2 focus:border w-full focus:outline-none border border-black rounded-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {productCat.result.map((item, idx) => (
                    <SelectItem key={idx} value={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="1">Daily</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-12 lg:col-span-6 flex flex-col lg:flex-row gap-2">
              <div className="lg:flex-1">
                <label className="font-semibold">
                  1000gm Price
                </label>
                <input
                  type="number"
                  name="price1000"
                  className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                />
              </div>
              <div className="lg:flex-1">
                <label className="font-semibold">
                  5000gm Price
                </label>
                <input
                  type="number"
                  name="price5000"
                  className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                  placeholder="Type Here"
                />
              </div>
            </div>
            <div className="col-span-12 lg:row-span-3 lg:col-span-6">
              <label className="font-semibold">
                Product Image
                <span className="text-red-400 ml-1">(required)</span>{" "}
              </label>
              <ImageUploading
                multiple
                value={images}
                onChange={imgPreviewer}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  // onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700 flex flex-wrap h-[89%] items-center justify-center">
                    {images.length === 0 && (
                      <button
                        className=""
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <img
                          src={uploadIcon}
                          className="w-12 md:w-1/5 object-cover mx-auto"
                          alt=""
                        />
                        Click or Drop here
                      </button>
                    )}
                    {imageList.map((image, index) => (
                      <div key={index} className="">
                        <div className="w-32 h-28 mx-auto">
                          <img
                            src={image["data_url"]}
                            alt="data"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-2 flex gap-2 items-center justify-center">
                          <button
                            className="bg-blue-500 text-white px-3 rounded-sm"
                            onClick={() => onImageUpdate(index)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-blue-500 text-white px-3 rounded-sm"
                            onClick={() => onImageRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* <button
                                        className="bg-blue-500 text-white px-3 rounded-sm"
                                        onClick={onImageRemoveAll}
                                      >
                                        Remove all images
                                      </button> */}
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="font-semibold">
                Tag
                <span className="text-red-400 ml-1"></span>{" "}
              </label>
              <Selects
                isMulti
                name="tags"
                options={options}
                onChange={(value) => setSelectedTags(value)}
                className="bg-white h-10 focus:ring-0 focus:border-0 w-full z-50 focus:outline-none border border-black basic-multi-select"
                classNamePrefix="select"
                required
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <label className="font-semibold">
                Product Discount
              </label>
              <input
                type="number"
                name="discount"
                className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                placeholder="Type Here"
              />
            </div>
            <div className="w-full col-span-12">
              <Editor
                apiKey={import.meta.env.VITE_TYNI_API}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                init={{
                  height: 400,

                  menubar: true,
                  plugins: [
                    // Core editing features
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "image",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    "table",
                    "visualblocks",
                    "wordcount",
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Nov 24, 2024:
                    "checklist",
                    "mediaembed",
                    "casechange",
                    "export",
                    "formatpainter",
                    "pageembed",
                    "a11ychecker",
                    "tinymcespellchecker",
                    "permanentpen",
                    "powerpaste",
                    "advtable",
                    "advcode",
                    "editimage",
                    "advtemplate",
                    "ai",
                    "mentions",
                    "tinycomments",
                    "tableofcontents",
                    "footnotes",
                    "mergetags",
                    "autocorrect",
                    "typography",
                    "inlinecss",
                    "markdown",
                    // Early access to document converters
                    "importword",
                    "exportword",
                    "exportpdf",
                  ],
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                  exportpdf_converter_options: {
                    format: "Letter",
                    margin_top: "1in",
                    margin_right: "1in",
                    margin_bottom: "1in",
                    margin_left: "1in",
                  },
                  exportword_converter_options: {
                    document: { size: "Letter" },
                  },
                  importword_converter_options: {
                    formatting: {
                      styles: "inline",
                      resets: "inline",
                      defaults: "inline",
                    },
                  },
                }}
                initialValue="Type Here"
              />
            </div>
          </div>
          <div className="mt-2">
            <button disabled={loader} type="submit" className="button_primary">
              {loader ? "loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
