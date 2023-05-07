import { useState, useEffect } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { getImages } from "services/getImages";
import { ImageGallery } from "components/ImageGallery/ImageGallery"
import { Searchbar } from "components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "components/Loader/Loader";
import { Button } from "components/Button/Button";
import { Modal } from "components/Modal/Modal"; 
import 'react-toastify/dist/ReactToastify.css';


export function App () {

const [images, setImages] = useState([]);
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [showModal, setShowModal] = useState(false);
const [largeImage, setLargeImage] = useState('');
const [tags, setTags] = useState('');
const [total, setTotal] = useState(0);
const [error, setError] = useState(null);


useEffect(() => {
  if(query !== ''){
    fetchImages(query, page);
  };
}, [query, page])


const fetchImages = async (query, page) => {
  try {
   setIsLoading(true);
   const data = await getImages(query, page);
   if (data.hits.length === 0) {
        return toast.error(
        "We didn't find anything for this search"
         )
   }

   setTotal(data.totalHits);
   setImages(prev=> [...prev, ...data.hits]);
   
  } catch (error) {
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

 const handleSubmit = query => {
  setQuery(query);
  setPage(1);
  setImages([]);
};

const handleLoadMore = () => {
  setPage(prev =>  prev + 1);
};

const handleModalOpen = (largeImage) => {
  setShowModal(true);
  setLargeImage(largeImage);
  setTags(tags);
};

const handleModalClose = () => {
  setShowModal(false);
  setLargeImage('');
  setTags('');
};
  
const totalPage = total / images.length;
return (
  <>
  <Searchbar onSubmit={handleSubmit} />
  {isLoading && <Loader />}
  {images.length !== 0 && (
    <ImageGallery gallery={images} onOpenModal={handleModalOpen} />
  )}
  {totalPage > 1 && !isLoading && images.length !== 0 && (
        <Button onClick={handleLoadMore} />
  )}
  {showModal && (
      <Modal
        largeImage={largeImage}
        tags={tags}
        onCloseModal={handleModalClose}
      />
  )}

  {error && (
        <>
         "We didn't find anything for this search :("
          <span>Try another option</span>
        </>
  )}
      <ToastContainer autoClose={2000} theme="dark" />
      <GlobalStyle />
  </>
)
  
};
