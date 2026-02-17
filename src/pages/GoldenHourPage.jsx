import GoldenHourOracle from "../components/GoldenHourOracle";

const GoldenHourPage = () => {
  return (
    <>
      {/* We remove padding top here because the Oracle component 
          handles its own full-screen layout and gradients */}
      <div className="relative">
        <GoldenHourOracle />
      </div>
    </>
  );
};

export default GoldenHourPage;
