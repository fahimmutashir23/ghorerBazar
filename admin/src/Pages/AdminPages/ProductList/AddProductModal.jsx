import { useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
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

const page = "";
const rows = "";

const AddProductModal = ({ fetchData, setLoader, collectionFetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [productCat, productCatLoading] = useGetProductCat(page, rows);
  const [tag, tagLoading] = useGetTag(page, rows);
  const [cat, setCat] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const editorRef = useRef(null);

  const imgPreviewer = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const name = e.target.name.value;
    const brand = e.target.brand.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;
    const discount = e.target.discount.value;
    // const details = e.target.details.value;
    const tags = selectedTags.map((tag) => tag.value);
    const detailsMsg = editorRef.current.getContent();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", cat);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("details", detailsMsg);
    tags.forEach((tags) => formData.append("tags", tags));
    formData.append("images", images[0].file);

    try {
      const res = await axiosSecure.post("/api/create-product", formData);
      if (res.data.success) {
        setIsOpen(false);
        fetchData();
        collectionFetch();
        toast.success(res.data.message);
        e.target.reset();
        setLoader(false);
      }
    } catch (error) {
      fetchData();
      toast.error(error.response.data);
      setLoader(false);
    }
  };

  if (productCatLoading || tagLoading) return <Loader2 />;

  const options = tag.result.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="text-text_lg bg-gray-700 text-white px-5 py-2 font-bold duration-500 flex items-center gap-2"
        >
          <IoAddCircleOutline className="text-2xl font-bold" />
          <span className="mt-1">Add Product</span>
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className={`relative z-50`} onClose={handleAnimate}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            <div
              className={`fixed inset-0 overflow-y-auto ${
                animate ? "scale-animation" : ""
              }`}
            >
              <div className="flex min-h-full items-center justify-center text-center border">
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="w-[96%] md:w-[90%] lg:w-[75%] xl:w-[910px] max-w-md:w-[60%] transform rounded-md text-left align-middle shadow-xl transition-all my-10 pb-0 bg-white">
                    <Dialog.Title
                      as="h3"
                      className="border px-4 text-xl bg-gray-700 text-white flex items-center justify-between h-14"
                    >
                      <h6 className="py-2 text-2xl font-semibold">
                        Add Product
                      </h6>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text_color close-button "
                      >
                        <IoMdClose />
                      </button>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div className="m-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Product Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Brand Name
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="text"
                            name="brand"
                            className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Product Price
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="price"
                            className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Product Category
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <Select
                            required
                            onValueChange={(value) => setCat(value)}
                          >
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
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Product Stock
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="stock"
                            className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        <div className="row-span-3">
                          <label className="font-semibold">
                            Product Image
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <ImageUploading
                            value={images}
                            onChange={imgPreviewer}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                            }) => (
                              <div className="p-2 border border-gray-700 rounded-sm focus:outline-none focus:border-2 focus:border-gray-700 flex h-[89%] items-center justify-center">
                                {images.length === 0 && (
                                  <button
                                    className=""
                                    style={
                                      isDragging ? { color: "red" } : undefined
                                    }
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
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Tag
                            <span className="text-red-400 ml-1"></span>{" "}
                          </label>
                          <Selects
                            isMulti
                            name="tags"
                            options={options}
                            onChange={(value) => setSelectedTags(value)}
                            className="bg-white h-10 focus:ring-0 focus:border-0 w-full focus:outline-none border border-black basic-multi-select"
                            classNamePrefix="select"
                            required
                          />
                        </div>
                        <div className="row-span-1">
                          <label className="font-semibold">
                            Product Discount
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </label>
                          <input
                            type="number"
                            name="discount"
                            className="bg-white h-10 focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                          />
                        </div>
                        {/* <div className="col-span-2">
                          <div className="font-semibold">
                            Product Details
                            <span className="text-red-400 ml-1">
                              (required)
                            </span>{" "}
                          </div>
                          <textarea
                            name="details"
                            className="bg-white focus:ring-0 px-4 focus:border w-full focus:outline-none border border-black"
                            placeholder="Type Here"
                            required
                            rows="5"
                          ></textarea>
                        </div> */}
                        <div className="w-full col-span-2">
                          <Editor
                            apiKey="o3o68zojm5jurxvnyz70j6b405p78660x8irfa1ctpqmz1cv"
                            onInit={(_evt, editor) =>
                              (editorRef.current = editor)
                            }
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
                                  Promise.reject(
                                    "See docs to implement AI Assistant"
                                  )
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
                      <div className="border text-xl bg-gray-700 flex items-center justify-between">
                        <button type="submit" className="button_primary">
                          Save
                        </button>
                        <button
                          type="button"
                          className="button_secondary"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>{" "}
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default AddProductModal;
