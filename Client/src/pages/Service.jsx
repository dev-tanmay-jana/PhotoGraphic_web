import { useAuth } from "../store/auth";

const Service = () => {
  const { services,API } = useAuth();

  return (
    <section>
      <div>
        <h1>Service Page</h1>
      </div>
      <div className="container grid grid-three-cols">
        {Array.isArray(services) &&
          services.map((curElem, index) => {
            const { name, price, brand, inStock } = curElem;
            return (
              <div className="card" key={index}>
                <div className="card_details">
                  <div className="grid">
                    <h3>{name}</h3>
                    <h3>{price}</h3>
                  </div>
                  <h2>{brand}</h2>
                  <h4>{inStock}</h4>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Service;