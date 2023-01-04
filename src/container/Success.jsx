import React, { useContext } from 'react';
import { Helmet } from 'react-helmet'
import AppContext from '../context/AppContext';
import Map from '../components/Map';
// import usePosiStackAddress from '../hooks/usePosiStackAddress';
import '../styles/Success.css';
import useAxiosFetch from '../hooks/useAxiosFetch';

function Success() {
  const {
    state: { buyer },
  } = useContext(AppContext);

  const address = `${buyer[0].city} ${buyer[0].country}`;
  const { data } = useAxiosFetch(address);

  return (
    <>
      <Helmet>
        <title>Pago exitoso - Erika Store</title>
      </Helmet>
      <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer[0].name}, Gracias por tu compra `}</h2>
        <span>
          Tu pedido llegara en 3 dias a tu direccion en {buyer[0].city}
        </span>
        <div className="Success-map">
          {data.map((item) => (
            <Map data={item} key={item.name} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Success;
