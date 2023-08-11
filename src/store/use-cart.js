import { defineStore } from 'pinia';

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        products: [],
        lastUpdated: null, // Thêm trường thời gian
    }),
    actions: {
        addToCart(product) {
            const existingProduct = this.products.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++
            } else {

                this.products.push({
                    ...product,
                    'quantity': 1,
                })

            }
            // this.logCartContents();
            this.updateLocalStorage();
        },
        //kiểm tra thông tin giỏ hàng
        // logCartContents() {
        //     console.log('Cart contents:', this.products);
        // },

        //lưu giỏ hàng
        initializeCart() {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                this.products = JSON.parse(storedCart);
            }
        },
        //cập nhật giỏ hành lưu trạng thái giỏ hàng lưu trạng thái thời gian
        updateLocalStorage() {
            this.lastUpdated = Date.now(); // Cập nhật thời gian
            localStorage.setItem('cart', JSON.stringify(this.products));
            localStorage.setItem('cartLastUpdated', this.lastUpdated.toString());
        },
        //xóa sản phẩm theo id
        removeFromCart(productId) {
            const productIndex = this.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                this.products.splice(productIndex, 1);
                this.updateLocalStorage();
            }
        },
        //cập nhật số lượng giỏ hàng
        updateProductQuantity(productId, newQty) {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                product.qty = newQty;
                this.updateLocalStorage();
            }
        },
        //xóa toàn bộ dữ liệu giỏ hàng
        clearCart() {
            this.products = [];
            this.lastUpdated = null;
            localStorage.removeItem('cart');
            localStorage.removeItem('cartLastUpdated');
          },
    }



});