import PageHeading from "./PageHeading";
import ProductListing from "./ProductListing";
import apiClient from "../api/apiClient";
import { useLoaderData} from "react-router-dom";

export default function Home() {
    const products = useLoaderData();
    
    return (
        <div className="max-w-[1152px] mx-auto px-6 py-8">                 
            <PageHeading title="Explore Eazy Stickers!">
                Add a touch of creativity to your space with our wide range of fun
                and unique stickers. Perfect for any occasions
            </PageHeading>
            <ProductListing sting products={products}/>
        </div>
    );
}

export async function productsLoader() {
    try {
        const response = await apiClient.get("/products"); // Axios GET request
        return response.data; // Update products state with fetched data
    }
    catch(error) {
        throw new Response(error.message || "Failed to fetch products. Please try again.",
            {status: error.status || 500}
        );
    }
    
}