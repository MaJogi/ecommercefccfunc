import { useEffect } from 'react'
import { useState } from 'react'

const CustomersList = () => {
  const [pageTitle, setPageTitle] = useState('Customers')
  const [customersCount, setCustomersCount] = useState(5)
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Marko',
      tel: '55539231',
      address: { city: 'New Delhi' },
      photo: 'https://picsum.photos/id/1010/60',
    },
    {
      id: 2,
      name: 'Silver',
      tel: '45539231',
      address: { city: 'Tallinn' },
      photo: 'https://picsum.photos/id/1011/60',
    },
    {
      id: 3,
      name: 'b',
      tel: null,
      address: { city: 'New Delhi' },
      photo: 'https://picsum.photos/id/1012/60',
    },
    {
      id: 4,
      name: 'c',
      tel: '25539231',
      address: { city: 'New Delhi' },
      photo: 'https://picsum.photos/id/1013/60',
    },
    {
      id: 5,
      name: 'd',
      tel: '15539231',
      address: { city: 'New Delhi' },
      photo: 'https://picsum.photos/id/1014/60',
    },
  ])

  useEffect(() => {
    console.log('Component Updated')
  })

  useEffect(() => {
    console.log('PageTitle State changed')
  }, [pageTitle])

  useEffect(() => {
    console.log('CustomersCount State changed')
  }, [customersCount])

  useEffect(() => {
    console.log('Customers State changed')
  }, [customers])

  const customerNameStyle = (custName) => {
    if (custName.startsWith('S')) return 'green-highlight border-left'
    else if (custName.startsWith('M')) return 'red-highlight border-right'
    else {
      return ''
    }
  }

  const onRefreshClick = (e) => {
    setCustomersCount(customersCount + 2)
  }

  const getPhoneToRender = (tel) => {
    if (tel) return tel
    else {
      return <div className='bg-warning p-2 text-center'>No Phone</div>
    }
  }

  const onChangePictureClick = (customer, index) => {
    var custArr = [...customers]
    custArr[index].photo = 'https://picsum.photos/id/1015/60'
    setCustomers(custArr)
  }

  const getCustomerRow = () => {
    {
      return customers.map((customer, index) => {
        return (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>
              <img src={customer.photo} alt='Customer photo' />
              <div>
                <button
                  className='btn btn-sm btn-secondary'
                  onClick={() => {
                    onChangePictureClick(customer, index)
                  }}
                >
                  Change picture
                </button>
              </div>
            </td>
            <td className={customerNameStyle(customer.name)}>
              {customer.name}
            </td>
            <td>{getPhoneToRender(customer.tel)}</td>
            <td>{customer.address.city}</td>
          </tr>
        )
      })
    }
  }
  return (
    <>
      <h4 className='m-1 p-1'>
        {pageTitle}
        <span className='badge badge-secondary m-2'>{customersCount}</span>
        <button className='btn btn-info' onClick={onRefreshClick}>
          Refresh
        </button>
      </h4>

      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>{getCustomerRow()}</tbody>
      </table>
    </>
  )
}

export default CustomersList
