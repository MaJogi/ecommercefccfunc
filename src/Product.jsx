import { useEffect, useState } from 'react'

const Product = (props) => {
  const [product, setProduct] = useState(props.product)

  useEffect(() => {
    return () => {
      console.log('Component unmounted - Product')
    }
  }, [])

  return (
    <div className='col-lg-6'>
      <div className='card m-2'>
        <div className='card-body'>
          <span
            className='pull-right hand-icon'
            onClick={() => {
              props.onDelete(product)
            }}
          >
            <i className='fa fa-times'></i>
          </span>
          <div className='text-muted'>#{product.id}</div>
          <h5 className='pt-2 border-top'>{product.productName}</h5>
          <div>${product.price}</div>
        </div>
        <div className='card-footer text-right'>
          <div className='float-left'>
            <span className='badge'>{product.quantity}</span>
            <div
              className='btn btn-outline-success'
              onClick={() => {
                props.onIncrement(product, 5) // maximum value as argument
              }}
            >
              +
            </div>
            <div
              className='btn btn-outline-success'
              onClick={() => {
                props.onDecrement(product, 0)
              }}
            >
              -
            </div>
          </div>
          <div className='float-right'>{props.children}</div>
        </div>
      </div>
    </div>
  )
}
export default Product
