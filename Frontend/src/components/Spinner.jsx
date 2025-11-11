const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="loader"></div>

      <style>{`
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #ddd;
          border-top-color: #4f46e5; /* Indigo vibe */
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
