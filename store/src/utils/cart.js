const CART_KEY = 'pet_shop_cart';

//функция для отправки события обновления корзины
const dispatchCartUpdateEvent = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
    
    //также отправляем storage event для других вкладок
    window.dispatchEvent(new StorageEvent('storage', {
      key: CART_KEY,
      newValue: localStorage.getItem(CART_KEY)
    }));
  }
};

//получить корзину из localStorage
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

//сохранить корзину в localStorage
const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchCartUpdateEvent(); // Отправляем событие
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

//добавить товар в корзину
export const addToCart = (productId, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    //увеличиваем количество, если товар уже в корзине
    existingItem.quantity += quantity;
  } else {
    //добавляем новый товар
    cart.push({
      productId,
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  saveCart(cart);
  return cart;
};

//удалить товар из корзины
export const removeFromCart = (productId) => {
  const cart = getCart();
  const newCart = cart.filter(item => item.productId !== productId);
  saveCart(newCart);
  return newCart;
};

//изменить количество товара
export const updateCartItemQuantity = (productId, quantity) => {
  if (quantity <= 0) {
    return removeFromCart(productId);
  }
  
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
};

//очистить корзину
export const clearCart = () => {
  saveCart([]);
  return [];
};

//получить общее количество товаров в корзине
export const getCartItemsCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

//получить массив ID товаров в корзине
export const getCartProductIds = () => {
  const cart = getCart();
  return cart.map(item => item.productId);
};

//проверить, есть ли товар в корзине
export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
};

//получить количество конкретного товара в корзине
export const getCartItemQuantity = (productId) => {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  return item ? item.quantity : 0;
};

//получить все данные корзины
export const getCartWithDetails = async () => {
  const cart = getCart();
 
  const cartWithDetails = await Promise.all(
    cart.map(async (item) => {
      try {
       
        return {
          ...item,
          // product: productData
        };
      } catch (error) {
        console.error(`Error loading product ${item.productId}:`, error);
        return item;
      }
    })
  );
  
  return cartWithDetails;
};

//получить общую сумму корзины
export const getCartTotal = async () => {
  const cart = getCart();
  return 0;
};