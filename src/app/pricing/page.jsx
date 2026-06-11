
import PricingTab from "./PricingTab";


const PricingPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold">
          Simple & Transparent Pricing
        </h1>

        <p className="mt-4 text-default-600 text-lg">
          Choose the perfect plan whether you are looking
          for your next opportunity or hiring top talent
          through Hire Loop.
        </p>
      </div>

      <div className="mt-14">
        <PricingTab />
      </div>
    </section>
  );
};

export default PricingPage;