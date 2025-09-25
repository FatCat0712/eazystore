import { 
    createContext, 
    useContext, 
    useEffect, 
    useReducer
} from "react";

// const initialCartContext = {
//   cart: [],
//   setCart: () => {},
//   addToCart: () => {console.log("Product added to cart")},
//   removeFromCart: () => {},
//   totalQuantity: 0
// };


const CartContext = createContext();


const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (prevCart, action) => {
    switch(action.type) {
        case ADD_TO_CART: 
            {
                const {product, quantity} = action.payload;
                const existingItem = prevCart.find(item => item.productId === product.productId);
                if(existingItem) {
                    return prevCart.map((item) => item.productId === product.productId ? {...item, quantity: item.quantity + quantity} : item);
                }
                return [...prevCart, {...product, quantity}];
            }
            
        case REMOVE_FROM_CART:
           return prevCart.filter(item => item.productId !== action.payload.productId);
        case CLEAR_CART:
            return [];
        default:
            return prevCart;
    }
};


const CartProvider = ({children}) => {
    const initialCartState = (() => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    }catch(error) {
        console.error("Failed to parse from localStorage", error);
        return [];
    }
})();

    const[cart, dispatch] = useReducer(cartReducer, initialCartState);


    // Initialize cart state from localStorage or as an empty array
    // const [cart, setCart] = useState(() => {
    //    try {
    //       const storedCart = localStorage.getItem("cart");
    //       return storedCart ? JSON.parse(storedCart) : [];
    //    }catch(error) {
    //       console.error("Failed to parse from localStorage", error);
    //       return [];
    //    }
    // });


    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try{
            localStorage.setItem("cart", JSON.stringify(cart))
        }catch(error) {
            console.error("Failed to saved cart to localStorage.", error);
        }
    }, [cart]);


    // const addToCart = (product, quantity) => {
    //     setCart((prevCart) => {
    //         const existingItem = prevCart.find((item) => item.productId === product.productId);

    //         if(existingItem) {
    //             // Use map() to create a new array with updated quantity
    //             return prevCart.map((item) => item.productId === product.productId ? {...item, quantity: item.quantity + quantity} : item);
    //         };


    //         // If the product is not in the cart, add it
    //         return [...prevCart, {...product, quantity}];

    //     })
    // }

    // // Function to remove an item from the cart
    // const removeFromCart = (productId) => {
    //     setCart((prevCart) => prevCart.filter((item) => item.productId !== productId))
    // }

    const addToCart = (product, quantity) => {
        dispatch({type: ADD_TO_CART, payload: {product, quantity}})
    }

    const removeFromCart = (productId) => {
        dispatch({type: REMOVE_FROM_CART, payload: {productId}})
    }

    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    }


    // Calculate total quantity
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);


   return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, totalQuantity}}>
            {children}
        </CartContext.Provider>
    );
}



function useCart () {
    const context = useContext(CartContext);
    if(context === undefined) throw new Error("CartContext was used outside the CartProvider")
    return context;
} 



export {useCart, CartProvider};

