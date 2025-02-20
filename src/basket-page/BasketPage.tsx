import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Table } from 'react-bootstrap';
import { api } from '../fetch/fetchApi.ts';
import Product from '../product-page/ProductType.ts';

interface Basket{
  id:number;
  name:string;
  productId:string;
  product:Product;
}
const Basket: React.FC = () => {
  const [ basket, setBasket ] = useState<Basket[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const fetchBasket = async () => {
    setLoading(true);
    const { data, error } = await api.get<Basket[]>('basket');
    if (error) 
      setError(error);
    else 
      setBasket(data as Basket[]);
    setLoading(false);
  };
  useEffect(() => {
    fetchBasket();
  }, []);

  const removeFromBasket = async (id : number) => {
    const { error } = await api.del('basket/'+id);
    if (error) 
      setError(error);
    else{
      setBasket(basket?.filter(b => b.id !== id));
    }
         
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
  <h2>Your Basket</h2>
  {basket?.length === 0 ? (
    <p>Your basket is empty.</p>
  ) : (
    <Table striped bordered hover responsive variant="light">
      <thead>
        <tr>
          <th>Image</th>
          <th>Basket ID</th>
          <th>Product Name</th>
          <th>Product Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {basket?.map((item) => (
          <tr key={item.id}>
            <td>
              <img
                src={item?.product?.imagePath}
                alt={item?.product?.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </td>
            <td>{item.id}</td>
            <td>{item?.product?.name}</td>
            <td>{item?.product?.type}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromBasket(item.id)}
              >
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}
</div>

  );
};

export default Basket;
