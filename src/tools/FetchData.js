const FetchData = ({ id = "", config }) =>
  fetch(`http://api-test.bhut.com.br:3000/api/cars/${id}`, config)
  .catch(() => {
    throw new Error("Não foi possível prosseguir com esta ação")
  })
  .then(
    (r) => (r.ok ? r.json() : false)
  );

export default FetchData;
