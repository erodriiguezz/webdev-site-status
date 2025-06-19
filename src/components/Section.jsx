const Section = ({ name, children }) => {
  return (
    <section className="border border-gray-200 rounded p-4">
      <h2>{name}</h2>

      <div>{children}</div>
    </section>
  );
};
export default Section;
