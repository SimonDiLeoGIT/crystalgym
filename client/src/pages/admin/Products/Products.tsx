import AdminLayout from "../AdminLayout";
import ClotheService from "../../../services/clothe.service";
import { use } from "framer-motion/client";
import { useEffect, useState } from "react";
import { ErrorInterface } from "../../../interfaces/ErrorInterface";
import Message from "../../../components/Message";
import ErrorMessage from "../../../components/ErrorMessage";

const Products = () => {

  const [message, setMessage] = useState<string>('');
  const [visibleMessage, setVisibleMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visibleErrorMessage, setVisibleErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Admin Products | CrystalGym";
  }, [])

  // get all products
  useEffect(() => {
    const getAllProducts = async () => {
      
      try {
        const response = await ClotheService.getClothes();
        if (response.code === 201) {
          handleViewMessage(response.message)
        } else {
          handleViewErrorMessage(response.message);
        }
      } catch (error) {
        const apiError = error as ErrorInterface
        handleViewErrorMessage(apiError.message)
      }

    }
  }, []);

  const handleViewErrorMessage = (message: string) => {
    setErrorMessage(message);
    setVisibleErrorMessage(true);
  }

    const handleViewMessage = (message: string) => {
    setMessage(message);
    setVisibleMessage(true);
  }

  return (
      <AdminLayout>
        <Message message={message} visible={visibleMessage} setVisible={setVisibleMessage} />
        <ErrorMessage message={errorMessage} visible={visibleErrorMessage} setVisible={setVisibleErrorMessage} />
        <section className="p-12">
          <header className="text-lg font-semibold">
            <h1>Products</h1>
          </header>
        </section>
      </AdminLayout>
  );
};

export default Products;