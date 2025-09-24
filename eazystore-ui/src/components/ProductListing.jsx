import React, { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import SearchBox from "./SearchBox";
import DropDown from "./Dropdown";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"]; 


export default function ProductListing({products}) {
  
  const[keyword, setKeyword] = useState("");
  const[selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts =  useMemo(() => {
    if(!Array.isArray(products)) {
      return [];
    }

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(keyword.toLowerCase()) || product.description.toLowerCase().includes(keyword.toLowerCase())
    );

  
    return filteredProducts.slice().sort((a,b) => {
        switch(selectedSort) {
          case "Price Low to High":
            return a.price - b.price;
          case "Price High to Low":
            return b.price - a.price;
          case "Popularity":
          default:
             return a.popularity - b.popularity;
        }
    })
  }, [products, keyword, selectedSort]);


  function handleSearchChange(inputSearch) {
    setKeyword(inputSearch);
  }

  function handleSortChange(sortBy) {
    setSelectedSort(sortBy);
  }

  return (
    <div className='max-w-[1152px] mx-auto'>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox label="Search" placeholder="Search products ..." value={keyword} handleSearch={(value) => handleSearchChange(value)}/>
        <DropDown label="Sort by" options={sortList} value={selectedSort} handleSort={(value) => handleSortChange(value)}/>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (<ProductCard key={product.productId} product={product}/>))    
        ) : (
            <p className='text-center font-primary font-bold text-lg text-primary dark:text-light'>No products found</p>
        )}
      </div>
    </div>
  )
}
