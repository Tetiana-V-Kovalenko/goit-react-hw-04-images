export const fetchImagesOnSubmit = async query => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=1&key=31315172-2dc97d1a120a1ae0bcd675878&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
  return response;
};
export const fetchImagesOnBtnLoadClick = async (query, page) => {
  const response = await fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=31315172-2dc97d1a120a1ae0bcd675878&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());

  return response;
};
