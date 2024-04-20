import { useSelector } from "react-redux";
import { selectProductsList } from "./productsSlice";
import { selectInvoiceList } from "./invoicesSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};


export const useProductsData = () => {
  const productsList = useSelector(selectProductsList) || [];
  console.log(productsList)
  const getOneProduct = (receivedId) => {
    return productsList.find((product) => product.product_id === receivedId) || null;
  };

  const listSize = productsList.length;

  return { productsList, getOneProduct, listSize };
};