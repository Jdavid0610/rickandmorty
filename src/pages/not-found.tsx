import rickAndMortyImage from "/rickandmorty.png"; // Adjust the path if necessary

const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary-100 flex justify-center">
      <div className="text-center">
        <img
          src={rickAndMortyImage}
          alt="Rick and Morty"
          className="mb-8 w-1/2 mx-auto"
        />
        <h1 className="text-6xl font-bold text-primary-700 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
