const RandomImage = () => {
  const images = [
    "https://i.pinimg.com/564x/76/6f/b8/766fb8f2ecde74af3a7ad8ab917ad9b8.jpg",
    "https://i.pinimg.com/564x/05/90/be/0590be27179342fdf898f784a0e9e9d7.jpg",
    "https://i.pinimg.com/564x/90/e5/0f/90e50f73f180308e5ead474c0a4ad35b.jpg",
    "https://i.pinimg.com/564x/9b/f8/28/9bf828a150d2b2896eb895cf513da126.jpg",
    "https://i.pinimg.com/564x/ef/be/dd/efbedda0325b3557001773a99f704694.jpg",
  ];

  return images[Math.floor(Math.random() * (images.length - 1))];
};

export default RandomImage;
