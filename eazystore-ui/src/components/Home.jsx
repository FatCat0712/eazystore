import PageHeading from "./PageHeading";
import ProductListing from "./ProductListing";
import apiClient from "../api/apiClient";
import { useState, useEffect } from "react";

export default function Home() {
   const[products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

//    Run once after the component mounts
//    Mounting is the process of creating and adding the component into DOM
   useEffect(
    () => {
        fetchProducts();
    },[]);

    async function fetchProducts(){
        try{
            setLoading(true);
            const response = await apiClient.get("/products"); // Axios GET request
            setProducts(response.data); // Update products state with fetched data
        }
        catch(error){
            setError(error.response?.data?.message || "Failed to fetch products. Please try again.")
        //   Extract error message if available
        }
        finally {
          setLoading(false);
        }
    }

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-xl font-semibold">Loading products ...</span>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-xl text-red-500">Error: {error}</span>
            </div>
        )
    }

    return (
        <div className="max-w-[1152px] mx-auto px-6 py-8">                 
            <PageHeading title="Explore Eazy Stickers!">
                Add a touch of creativity to your space with our wide range of fun
                and unique stickers. Perfect for any occasions
            </PageHeading>
            <ProductListing products={products}/>
        </div>
    );
}