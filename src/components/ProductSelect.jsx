import React, { useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useProductsData } from "../redux/hooks";

const ProductSelect = ({ onProductSelect }) => {
  const { productsList } = useProductsData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    onProductSelect(product);
  };

  return (
    <div className="d-flex align-items-center my-3">
      <DropdownButton
        title={selectedProduct ? selectedProduct.name : 'Select Product'}
        variant="outline-secondary"
        onSelect={handleProductSelect}
      >
        {productsList.map((product) => (
          <Dropdown.Item key={product.product_id} eventKey={product}>
            {product.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button
        variant="primary"
        className="ms-2"
        disabled={!selectedProduct}
        onClick={() => handleProductSelect(selectedProduct)}
      >
        Add Product
      </Button>
    </div>
  );
};

export default ProductSelect;