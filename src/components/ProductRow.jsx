import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ProductRow = ({ item, onEdit, onDelete }) => (
  <tr>
    <td>
      <Form.Control
        type="text"
        name="description"
        value={item.itemDescription}
        onChange={(e) => onEdit(e, item.itemId)}
        placeholder="Add description"
      />
    </td>
    <td>
      <Form.Control
        type="number"
        name="hours"
        value={item.hours}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <Form.Control
        type="number"
        name="perHour"
        value={item.perHour}
        onChange={(e) => onEdit(e, item.itemId)}
      />
    </td>
    <td>
      <Form.Control
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

export default ProductRow;