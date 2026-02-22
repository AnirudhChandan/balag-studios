import GoldenHourOracle from "../components/GoldenHourOracle";
import SEO from "../components/SEO";

const GoldenHourPage = () => {
  return (
    <>
      <SEO
        title="Golden Hour Planner"
        description="Plan your perfect wedding lighting with our scientific sun tracker. Calculate golden hour for Rishikesh, Udaipur, and worldwide destinations."
        url="/planner"
      />
      {/* We remove padding top here because the Oracle component 
          handles its own full-screen layout and gradients */}
      <div className="relative">
        <GoldenHourOracle />
      </div>
    </>
  );
};

export default GoldenHourPage;
