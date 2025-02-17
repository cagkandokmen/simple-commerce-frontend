import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import Product from './ProductType.ts';
import { api } from '../fetch/fetchApi.ts';
import { useProfile } from '../context/ProfileContext.tsx';

const ProductPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle admin state here for testing
  const [newProduct, setNewProduct] = useState({ id:'', name: '', type: '', imagePath: ''});

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const { username } = useProfile();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await api.get<Product[]>('product/products');
    if (error) 
      setError(error);
    else 
      setProducts(data as Product[]);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
    if(username == 'admin')
      setIsAdmin(true);
    else
      setIsAdmin(false);
  }, []);

  const handleAddToBasket = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmAddToBasket = async () => {
    if (selectedProduct) {
      const basketProduct ={
        productId:selectedProduct.id
      };
      const { error } = await api.post('basket/'+username, basketProduct);
      if (error) 
        setError(error);
      
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    const { error } = await api.del('product/'+productId);
    if (error) 
      setError(error);
    else{
      setProducts(products?.filter(product => product.id !== productId));  
    }
  };

  const handleAddProductClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.type) {
      const addedProduct: Product = {
        id: newProduct.id,
        name: newProduct.name,
        type: newProduct.type,
        imagePath: newProduct.imagePath
      };
      const { error } = await api.post('product', addedProduct);
      if (error) 
        setError(error);
      else{
        products?.push(addedProduct);
        setProducts(products);  
      } 
      
      setShowForm(false); // Close the form after submission
      setNewProduct({ id:'', name: '', type: '', imagePath: '' }); // Reset form
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) 
    return (
      <div>
        <p>Error: {error}</p>
        <Button variant="primary" onClick={() => setError(null)} className="mb-3">
          Back
        </Button>
      </div>
    );
  
  return (
    <div>
      <h1>Product List</h1>
      {isAdmin && !showForm && (
        <Button variant="primary" onClick={handleAddProductClick} className="mb-3">
          Add New Product
        </Button>
      )}

      {showForm ? (
         <Form onSubmit={handleFormSubmit}>
           <Form.Group controlId="productId" className="mb-3">
            <Form.Label>Product Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product id"
              value={newProduct.id}
              onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="productName" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="productType" className="mb-3">
            <Form.Label>Product Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product type"
              value={newProduct.type}
              onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="productImagePath" className="mb-3">
            <Form.Label>Product Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product image url"
              value={newProduct.imagePath}
              onChange={(e) => setNewProduct({ ...newProduct, imagePath: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseForm} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      ) : (
        <Table striped bordered hover responsive variant="light">
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.imagePath} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleAddToBasket(product)}
                    className="me-2"
                    size="sm"
                  >
                    Add to Basket
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProduct(product.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Add to Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to add {selectedProduct?.name} to the basket?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>No</Button>
          <Button variant="primary" onClick={handleConfirmAddToBasket}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default ProductPage;