import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.products.map(eachProduct => ({
        id: eachProduct.id,
        brand: eachProduct.brand,
        imageUrl: eachProduct.image_url,
        price: eachProduct.price,
        rating: eachProduct.rating,
        title: eachProduct.title,
      }))
      this.setState({productsList: updatedData, isLoading: true})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="Oval" color="#00bfff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return <>{isLoading ? this.renderProductsList() : this.renderLoader()}</>
  }
}

export default AllProductsSection
