const Section = ({ name, statusPageUrl, children }) => {
  return (
    <section className="border border-gray-200 rounded p-4">
      <h2>{name}</h2>

      {statusPageUrl && (
        <a className="block mb-6 color-brand cursor-pointer" href={statusPageUrl} target="_blank">
          Click here to view more vitals.
        </a>
      )}

      <div>{children}</div>
    </section>
  );
};
export default Section;
