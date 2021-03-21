import fakeData from "../../fakeData/fakeData.json";
import Service from "../Service/Service";

const Home = () => {
  return (
    <div className="content-area">
      <div className="row">
        {fakeData.map((service) => (
          <Service service={service} key={service.id}></Service>
        ))}
      </div>
    </div>
  );
};

export default Home;
