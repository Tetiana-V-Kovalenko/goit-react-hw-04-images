import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ButtonLoad from './Button/ButtonLoad';
import { fetchImagesOnBtnLoadClick } from 'PixabayApi/PixabayApi';
import Loader from './Loader/Loader';
import 'styles.css';

export const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalImage, setModalImage] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesOnBtnLoadClick(query, page);
      setImages(prev => [...prev, ...images.hits]);

      setTotal(images.totalHits);
    };
    if (query === '') {
      return;
    }
    fetchImages()
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setLoading(true);
    setImages([]);
    setQuery(query);
    setPage(1);
  };
  const onBtnLoad = () => {
    setPage(prev => prev + 1);
    setLoading(true);
    scroll.scrollMore(450);
  };
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const onImageClick = e => {
    setModalImage(e.currentTarget.id);
    toggleShowModal();
  };
  return (
    <div className="App">
      <SearchBar handleSubmit={handleFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery imagesArr={images} onImageClick={onImageClick} />
      )}
      {loading && <Loader />}
      {!loading && total > 12 * page && <ButtonLoad onBtnLoad={onBtnLoad} />}

      {showModal && (
        <Modal
          tags={modalImage}
          largeImageURL={modalImage}
          onClose={toggleShowModal}
        />
      )}
    </div>
  );
};

App.propTypes = {
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  query: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  modalImage: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.instanceOf(Error),
};
