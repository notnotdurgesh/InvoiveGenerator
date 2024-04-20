import { useEffect, useState } from "react";
import { Card, Col, Row, Table, Form, Button, ListGroup } from "react-bootstrap";
import generateRandomId from "../utils/generateRandomId";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct } from "../redux/productsSlice";
import { useDispatch } from "react-redux";
import { useProductsData } from "../redux/hooks";
import { BiArrowBack } from "react-icons/bi";

// Reusable component for form input fields
const FormInput = ({ label, value, onChange, ...props }) => (
  <Form.Control
    placeholder={`Enter ${label}`}
    value={value}
    onChange={onChange}
    {...props}
  />
);

// Reusable component for table rows
const TableRow = ({ item, onEdit, onDelete }) => (
  <tr>
    <td>
      <FormInput
        placeholder="Add description"
        type="text"
        name="description"
        value={item.description}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <FormInput
        type="number"
        name="hours"
        value={item.hours}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <FormInput
        type="number"
        name="perHour"
        value={item.perHour}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <FormInput
        type="number"
        name="amount"
        value={item.amount}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <Button variant="danger" onClick={() => onDelete(item)}>
        Delete
      </Button>
    </td>
  </tr>
);

export const Test = () => {
  const { productsList } = useProductsData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    product_id: generateRandomId(),
    category: "",
    name: "",
    products: [
      {
        itemId: generateRandomId(),
        description: "",
        amount: 0,
        perHour: 0,
        hours: 0,
      },
    ],
    total: 0,
  });

  const save = () => {
    dispatch(addProduct(productData));
    navigate(-1);
  };

  useEffect(() => {
    handleCalculateTotal();
  }, []);

  const editField = (name, value) => {
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    handleCalculateTotal();
  };

  const handleRemoveRow = (itemToDelete) => {
    setProductData((prevState) => ({
      ...prevState,
      products: prevState.products.filter(
        (item) => item.itemId !== itemToDelete.itemId
      ),
    }));
    handleCalculateTotal();
  };

  const handleAddRow = () => {
    const id = generateRandomId();
    const newItem = {
      itemId: id,
      description: "",
      amount: 0,
      perHour: 0,
      hours: 0,
    };
    setProductData((prevState) => ({
      ...prevState,
      products: [...prevState.products, newItem],
    }));
    handleCalculateTotal();
  };

  const handleCalculateTotal = () => {
    const tempTotal = productData.products.reduce(
      (total, item) => total + item.amount * item.perHour * item.hours,
      0
    );
    setProductData((prevState) => ({
      ...prevState,
      total: tempTotal,
    }));
  };

  const onItemizedItemEdit = (evt, id) => {
    setProductData((prevState) => ({
      ...prevState,
      products: prevState.products.map((item) =>
        item.itemId === id
          ? { ...item, [evt.target.name]: evt.target.valueAsNumber || evt.target.value }
          : item
      ),
    }));
    handleCalculateTotal();
  };

  const { category, name, products, total } = productData;

  const groupedProducts = productsList.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product.product_id));
  };

  const handleEditProduct = (product) => {
    setProductData(product);
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(productData));
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <BiArrowBack size={18} />
        <div className="fw-bold mt-1 mx-2 cursor-pointer" onClick={handleGoBack}>
          <h5>Go Back</h5>
        </div>
      </div>

      <Row>
        {Object.entries(groupedProducts).map(([category, products]) => (
          <Col key={category} md={6}>
            <Card className="mb-4">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h4>{category}</h4>
                  <Button variant="primary" size="sm">
                    Add New
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {products.length === 0 ? (
                  <p>You have no products added yet.</p>
                ) : (
                  <ListGroup>
                    {products.map((product) => (
                      <ListGroup.Item key={product.product_id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5>{product.name}</h5>
                            <p>Total: ${product.total}</p>
                          </div>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditProduct(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


      <Form>
        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex gap-3 mx-4  content-center">
                <Form.Label className="fw-bold">Name:</Form.Label>
                <FormInput
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  style={{ maxWidth: "400px" }}
                  required
                />
                <Form.Label className="fw-bold">Category:</Form.Label>
                <FormInput
                  type="text"
                  label="Product Category"
                  value={category}
                  name="category"
                  onChange={(e) => editField(e.target.name, e.target.value)}
                  style={{ maxWidth: "400px" }}
                  required
                />
              </div>
              <Table striped bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Hours</th>
                    <th>Rate/Hour</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <TableRow
                      key={item.itemId}
                      item={item}
                      onEdit={onItemizedItemEdit}
                      onDelete={handleRemoveRow}
                    />
                  ))}
                </tbody>
              </Table>
              <Button variant="primary" onClick={handleAddRow} className="my-2">
                Add Row
              </Button>
              <Button variant="outline-secondary" onClick={save} className="my-2">
                Save
              </Button>
              <div className="d-flex justify-content-end">
                <h4>Total: {total || 0}</h4>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Test;