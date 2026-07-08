// // Write your code here
// // there is no single line of code here in this file by default
// // entirely written by me

// import CartContext from '../../context/CartContext'

// import './index.css'

// const CartSummary = () => (
//   <CartContext.Consumer>
//     {value => {
//       const {cartList} = value
//       let total = 0
//       cartList.forEach(eachCartItem => {
//         total += eachCartItem.price * eachCartItem.quantity
//       })
//       return (
//         <>
//           <div className="cart-summary-container">
//             <h1 className="order-total-value">
//               <span className="order-total-label">Order Total:</span> Rs {total}{' '}
//             </h1>
//             <p className="total-items">{cartList.length} Items in cart</p>
//             <button type="button" className="checkout-button d-sm-none">
//               Checkout
//             </button>
//           </div>
//           <button type="button" className="checkout-button d-lg-none">
//             Checkout
//           </button>
//         </>
//       )
//     }}
//   </CartContext.Consumer>
// )

// export default CartSummary

import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {
    isCodSelected: false,
    isOrderPlaced: false,
  }

  onSelectCod = () => {
    this.setState({isCodSelected: true})
  }

  onConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  render() {
    const {isCodSelected, isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          let total = 0
          cartList.forEach(eachCartItem => {
            total += eachCartItem.price * eachCartItem.quantity
          })

          return (
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
              </h1>

              <p className="total-items">{cartList.length} Items in cart</p>

              {/* ONLY ONE Checkout button */}
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
              >
                {() => (
                  <div>
                    <h1>Payment Method</h1>

                    <div>
                      <input
                        type="radio"
                        id="cardOption"
                        name="payment"
                        disabled
                      />
                      <label htmlFor="cardOption">Card</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="netBankingOption"
                        name="payment"
                        disabled
                      />
                      <label htmlFor="netBankingOption">Net Banking</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="upiOption"
                        name="payment"
                        disabled
                      />
                      <label htmlFor="upiOption">UPI</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="walletOption"
                        name="payment"
                        disabled
                      />
                      <label htmlFor="walletOption">Wallet</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="codOption"
                        name="payment"
                        onChange={this.onSelectCod}
                      />
                      <label htmlFor="codOption">Cash on Delivery</label>
                    </div>

                    <p>Number of Items: {cartList.length}</p>
                    <p>Total Price: Rs {total}</p>

                    <button
                      type="button"
                      disabled={!isCodSelected}
                      onClick={this.onConfirmOrder}
                    >
                      Confirm Order
                    </button>

                    {isOrderPlaced && (
                      <p>Your order has been placed successfully</p>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
