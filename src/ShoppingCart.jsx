import { useState, useEffect } from 'react'
import Product from './Product'
const ShoppingCart = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    console.log('Component mounted')

    const fetchData = async () => {
      // async means that some code will wait until promise is handled
      // fetch data from data source
      var response = await fetch('http://localhost:4000/products', {
        method: 'GET',
      })
      var prods = await response.json()

      setProducts(prods)
      console.log(response)
    }
    fetchData()

    // fetchData.catch(console.error) // Why is this not a function

    // return a function to execute at unmount
    return () => {
      console.log('Component unmounted - ShoppingCart')
    }
  }, [])

  useEffect((/*prevProps, prevState*/) => {
    console.log('Component updated')
    // Research how to get the prevProps and prevState and now ones

    // console.log(
    //   'componentDidUpdate - ShoppingCart',
    //   prevProps,
    //   prevState,
    //   this.props,
    //   this.state
    // )
  })

  useEffect(() => {
    console.log('Products updated')
  }, [products])

  // Research how componentDidCatch works in functional comp way

  // componentDidCatch(error, info) {
  //   console.log('componentDidCatch - ShoppingCart')
  //   console.log(error, info)

  //   localStorage.lastError = `${error}\n${JSON.stringify(info)}`
  // }

  const handleIncrement = (product, maxValue) => {
    let allProducts = [...products] //get all elements from particular array
    let index = allProducts.indexOf(product)
    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++
      console.log(allProducts[index])
      console.log(allProducts)
      setProducts(allProducts)
    }
  }

  const handleDecrement = (product, minValue) => {
    let allProducts = [...products] //get all elements from particular array
    let index = allProducts.indexOf(product)
    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--
      console.log(allProducts[index])
      console.log(allProducts)
      setProducts(allProducts)
    }
  }

  const handleDelete = (product) => {
    let allProducts = [...products]
    let index = allProducts.indexOf(product)

    if (window.confirm('Are you sure to delete?')) {
      allProducts.splice(index, 1) // starting from index, remove 1 element
      setProducts(allProducts) // Todo: Might not work, it might need first to shallow copy array
    }
  }

  return (
    <div className=''>
      <h4>Shopping Cart</h4>
      <div className='row'>
        {products.map((product, index) => {
          return (
            <Product
              key={product.id}
              product={product}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onDelete={handleDelete}
            >
              <button className='btn btn-primary'>Buy Now</button>
            </Product>
          )
        })}
      </div>
    </div>
  )
}

export default ShoppingCart
