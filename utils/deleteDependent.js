/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let User = require('../model/user');
let Banner = require('../model/banner');
let Image = require('../model/image');
let Cart = require('../model/cart');
let CartItem = require('../model/cartItem');
let Category = require('../model/category');
let City = require('../model/city');
let State = require('../model/state');
let Country = require('../model/country');
let Order = require('../model/order');
let OrderItem = require('../model/orderItem');
let Pincode = require('../model/pincode');
let Product = require('../model/product');
let Shipping = require('../model/shipping');
let Address = require('../model/address');
let Wallet = require('../model/wallet');
let WalletTransaction = require('../model/walletTransaction');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const bannerFilter = { $or: [{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bannerCnt = await dbService.destroy(Banner,bannerFilter);

      const imageFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const imageCnt = await dbService.destroy(Image,imageFilter);

      const cartFilter = { $or: [{ customerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartCnt = await dbService.destroy(Cart,cartFilter);

      const cartItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartItemCnt = await dbService.destroy(CartItem,cartItemFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt = await dbService.destroy(Category,categoryFilter);

      const cityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cityCnt = await dbService.destroy(City,cityFilter);

      const stateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stateCnt = await dbService.destroy(State,stateFilter);

      const countryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const countryCnt = await dbService.destroy(Country,countryFilter);

      const orderFilter = { $or: [{ customerId : { $in : user } },{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderCnt = await dbService.destroy(Order,orderFilter);

      const orderItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderItemCnt = await dbService.destroy(OrderItem,orderItemFilter);

      const pincodeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pincodeCnt = await dbService.destroy(Pincode,pincodeFilter);

      const productFilter = { $or: [{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt = await dbService.destroy(Product,productFilter);

      const shippingFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const shippingCnt = await dbService.destroy(Shipping,shippingFilter);

      const addressFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const addressCnt = await dbService.destroy(Address,addressFilter);

      const walletFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const walletCnt = await dbService.destroy(Wallet,walletFilter);

      const walletTransactionFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const walletTransactionCnt = await dbService.destroy(WalletTransaction,walletTransactionFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        user :userCnt.length + deleted.length,
        banner :bannerCnt.length,
        image :imageCnt.length,
        cart :cartCnt.length,
        cartItem :cartItemCnt.length,
        category :categoryCnt.length,
        city :cityCnt.length,
        state :stateCnt.length,
        country :countryCnt.length,
        order :orderCnt.length,
        orderItem :orderItemCnt.length,
        pincode :pincodeCnt.length,
        product :productCnt.length,
        shipping :shippingCnt.length,
        address :addressCnt.length,
        wallet :walletCnt.length,
        walletTransaction :walletTransactionCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBanner = async (filter) =>{
  try {
    let banner = await dbService.findAll(Banner,filter);
    if (banner && banner.length){
      banner = banner.map((obj) => obj.id);

      const imageFilter = { $or: [{ bannerId : { $in : banner } }] };
      const imageCnt = await dbService.destroy(Image,imageFilter);

      let deleted  = await dbService.destroy(Banner,filter);
      let response = { image :imageCnt.length, };
      return response; 
    } else {
      return {  banner : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteImage = async (filter) =>{
  try {
    let response  = await dbService.destroy(Image,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCart = async (filter) =>{
  try {
    let cart = await dbService.findAll(Cart,filter);
    if (cart && cart.length){
      cart = cart.map((obj) => obj.id);

      const cartItemFilter = { $or: [{ cartId : { $in : cart } }] };
      const cartItemCnt = await dbService.destroy(CartItem,cartItemFilter);

      let deleted  = await dbService.destroy(Cart,filter);
      let response = { cartItem :cartItemCnt.length, };
      return response; 
    } else {
      return {  cart : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCartItem = async (filter) =>{
  try {
    let response  = await dbService.destroy(CartItem,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const productFilter = { $or: [{ categoryId : { $in : category } },{ subCategoryId : { $in : category } }] };
      const productCnt = await dbService.destroy(Product,productFilter);

      let deleted  = await dbService.destroy(Category,filter);
      let response = { product :productCnt.length, };
      return response; 
    } else {
      return {  category : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCity = async (filter) =>{
  try {
    let city = await dbService.findAll(City,filter);
    if (city && city.length){
      city = city.map((obj) => obj.id);

      const pincodeFilter = { $or: [{ cityId : { $in : city } }] };
      const pincodeCnt = await dbService.destroy(Pincode,pincodeFilter);

      const addressFilter = { $or: [{ cityId : { $in : city } }] };
      const addressCnt = await dbService.destroy(Address,addressFilter);

      let deleted  = await dbService.destroy(City,filter);
      let response = {
        pincode :pincodeCnt.length,
        address :addressCnt.length,
      };
      return response; 
    } else {
      return {  city : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteState = async (filter) =>{
  try {
    let state = await dbService.findAll(State,filter);
    if (state && state.length){
      state = state.map((obj) => obj.id);

      const cityFilter = { $or: [{ stateId : { $in : state } }] };
      const cityCnt = await dbService.destroy(City,cityFilter);

      const pincodeFilter = { $or: [{ stateId : { $in : state } }] };
      const pincodeCnt = await dbService.destroy(Pincode,pincodeFilter);

      const addressFilter = { $or: [{ stateId : { $in : state } }] };
      const addressCnt = await dbService.destroy(Address,addressFilter);

      let deleted  = await dbService.destroy(State,filter);
      let response = {
        city :cityCnt.length,
        pincode :pincodeCnt.length,
        address :addressCnt.length,
      };
      return response; 
    } else {
      return {  state : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCountry = async (filter) =>{
  try {
    let country = await dbService.findAll(Country,filter);
    if (country && country.length){
      country = country.map((obj) => obj.id);

      const stateFilter = { $or: [{ countryId : { $in : country } }] };
      const stateCnt = await dbService.destroy(State,stateFilter);

      const pincodeFilter = { $or: [{ countryId : { $in : country } }] };
      const pincodeCnt = await dbService.destroy(Pincode,pincodeFilter);

      let deleted  = await dbService.destroy(Country,filter);
      let response = {
        state :stateCnt.length,
        pincode :pincodeCnt.length,
      };
      return response; 
    } else {
      return {  country : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder = async (filter) =>{
  try {
    let order = await dbService.findAll(Order,filter);
    if (order && order.length){
      order = order.map((obj) => obj.id);

      const orderItemFilter = { $or: [{ orderId : { $in : order } }] };
      const orderItemCnt = await dbService.destroy(OrderItem,orderItemFilter);

      const shippingFilter = { $or: [{ orderId : { $in : order } }] };
      const shippingCnt = await dbService.destroy(Shipping,shippingFilter);

      let deleted  = await dbService.destroy(Order,filter);
      let response = {
        orderItem :orderItemCnt.length,
        shipping :shippingCnt.length,
      };
      return response; 
    } else {
      return {  order : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrderItem = async (filter) =>{
  try {
    let response  = await dbService.destroy(OrderItem,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePincode = async (filter) =>{
  try {
    let pincode = await dbService.findAll(Pincode,filter);
    if (pincode && pincode.length){
      pincode = pincode.map((obj) => obj.id);

      const addressFilter = { $or: [{ pincodeId : { $in : pincode } }] };
      const addressCnt = await dbService.destroy(Address,addressFilter);

      let deleted  = await dbService.destroy(Pincode,filter);
      let response = { address :addressCnt.length, };
      return response; 
    } else {
      return {  pincode : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProduct = async (filter) =>{
  try {
    let product = await dbService.findAll(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const cartItemFilter = { $or: [{ productId : { $in : product } }] };
      const cartItemCnt = await dbService.destroy(CartItem,cartItemFilter);

      const orderItemFilter = { $or: [{ productId : { $in : product } }] };
      const orderItemCnt = await dbService.destroy(OrderItem,orderItemFilter);

      let deleted  = await dbService.destroy(Product,filter);
      let response = {
        cartItem :cartItemCnt.length,
        orderItem :orderItemCnt.length,
      };
      return response; 
    } else {
      return {  product : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteShipping = async (filter) =>{
  try {
    let shipping = await dbService.findAll(Shipping,filter);
    if (shipping && shipping.length){
      shipping = shipping.map((obj) => obj.id);

      const addressFilter = { $or: [{ shippingId : { $in : shipping } }] };
      const addressCnt = await dbService.destroy(Address,addressFilter);

      let deleted  = await dbService.destroy(Shipping,filter);
      let response = { address :addressCnt.length, };
      return response; 
    } else {
      return {  shipping : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAddress = async (filter) =>{
  try {
    let response  = await dbService.destroy(Address,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWallet = async (filter) =>{
  try {
    let wallet = await dbService.findAll(Wallet,filter);
    if (wallet && wallet.length){
      wallet = wallet.map((obj) => obj.id);

      const walletTransactionFilter = { $or: [{ walletId : { $in : wallet } }] };
      const walletTransactionCnt = await dbService.destroy(WalletTransaction,walletTransactionFilter);

      let deleted  = await dbService.destroy(Wallet,filter);
      let response = { walletTransaction :walletTransactionCnt.length, };
      return response; 
    } else {
      return {  wallet : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteWalletTransaction = async (filter) =>{
  try {
    let response  = await dbService.destroy(WalletTransaction,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const bannerFilter = { $or: [{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const bannerCnt =  await dbService.count(Banner,bannerFilter);

      const imageFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const imageCnt =  await dbService.count(Image,imageFilter);

      const cartFilter = { $or: [{ customerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartCnt =  await dbService.count(Cart,cartFilter);

      const cartItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cartItemCnt =  await dbService.count(CartItem,cartItemFilter);

      const categoryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const categoryCnt =  await dbService.count(Category,categoryFilter);

      const cityFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const cityCnt =  await dbService.count(City,cityFilter);

      const stateFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const stateCnt =  await dbService.count(State,stateFilter);

      const countryFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const countryCnt =  await dbService.count(Country,countryFilter);

      const orderFilter = { $or: [{ customerId : { $in : user } },{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      const orderItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderItemCnt =  await dbService.count(OrderItem,orderItemFilter);

      const pincodeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const pincodeCnt =  await dbService.count(Pincode,pincodeFilter);

      const productFilter = { $or: [{ sellerId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      const shippingFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const shippingCnt =  await dbService.count(Shipping,shippingFilter);

      const addressFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const addressCnt =  await dbService.count(Address,addressFilter);

      const walletFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const walletCnt =  await dbService.count(Wallet,walletFilter);

      const walletTransactionFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const walletTransactionCnt =  await dbService.count(WalletTransaction,walletTransactionFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        user : userCnt,
        banner : bannerCnt,
        image : imageCnt,
        cart : cartCnt,
        cartItem : cartItemCnt,
        category : categoryCnt,
        city : cityCnt,
        state : stateCnt,
        country : countryCnt,
        order : orderCnt,
        orderItem : orderItemCnt,
        pincode : pincodeCnt,
        product : productCnt,
        shipping : shippingCnt,
        address : addressCnt,
        wallet : walletCnt,
        walletTransaction : walletTransactionCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBanner = async (filter) =>{
  try {
    let banner = await dbService.findAll(Banner,filter);
    if (banner && banner.length){
      banner = banner.map((obj) => obj.id);

      const imageFilter = { $or: [{ bannerId : { $in : banner } }] };
      const imageCnt =  await dbService.count(Image,imageFilter);

      let response = { image : imageCnt, };
      return response; 
    } else {
      return {  banner : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countImage = async (filter) =>{
  try {
    const imageCnt =  await dbService.count(Image,filter);
    return { image : imageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCart = async (filter) =>{
  try {
    let cart = await dbService.findAll(Cart,filter);
    if (cart && cart.length){
      cart = cart.map((obj) => obj.id);

      const cartItemFilter = { $or: [{ cartId : { $in : cart } }] };
      const cartItemCnt =  await dbService.count(CartItem,cartItemFilter);

      let response = { cartItem : cartItemCnt, };
      return response; 
    } else {
      return {  cart : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCartItem = async (filter) =>{
  try {
    const cartItemCnt =  await dbService.count(CartItem,filter);
    return { cartItem : cartItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countCategory = async (filter) =>{
  try {
    let category = await dbService.findAll(Category,filter);
    if (category && category.length){
      category = category.map((obj) => obj.id);

      const productFilter = { $or: [{ categoryId : { $in : category } },{ subCategoryId : { $in : category } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      let response = { product : productCnt, };
      return response; 
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCity = async (filter) =>{
  try {
    let city = await dbService.findAll(City,filter);
    if (city && city.length){
      city = city.map((obj) => obj.id);

      const pincodeFilter = { $or: [{ cityId : { $in : city } }] };
      const pincodeCnt =  await dbService.count(Pincode,pincodeFilter);

      const addressFilter = { $or: [{ cityId : { $in : city } }] };
      const addressCnt =  await dbService.count(Address,addressFilter);

      let response = {
        pincode : pincodeCnt,
        address : addressCnt,
      };
      return response; 
    } else {
      return {  city : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countState = async (filter) =>{
  try {
    let state = await dbService.findAll(State,filter);
    if (state && state.length){
      state = state.map((obj) => obj.id);

      const cityFilter = { $or: [{ stateId : { $in : state } }] };
      const cityCnt =  await dbService.count(City,cityFilter);

      const pincodeFilter = { $or: [{ stateId : { $in : state } }] };
      const pincodeCnt =  await dbService.count(Pincode,pincodeFilter);

      const addressFilter = { $or: [{ stateId : { $in : state } }] };
      const addressCnt =  await dbService.count(Address,addressFilter);

      let response = {
        city : cityCnt,
        pincode : pincodeCnt,
        address : addressCnt,
      };
      return response; 
    } else {
      return {  state : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCountry = async (filter) =>{
  try {
    let country = await dbService.findAll(Country,filter);
    if (country && country.length){
      country = country.map((obj) => obj.id);

      const stateFilter = { $or: [{ countryId : { $in : country } }] };
      const stateCnt =  await dbService.count(State,stateFilter);

      const pincodeFilter = { $or: [{ countryId : { $in : country } }] };
      const pincodeCnt =  await dbService.count(Pincode,pincodeFilter);

      let response = {
        state : stateCnt,
        pincode : pincodeCnt,
      };
      return response; 
    } else {
      return {  country : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
    let order = await dbService.findAll(Order,filter);
    if (order && order.length){
      order = order.map((obj) => obj.id);

      const orderItemFilter = { $or: [{ orderId : { $in : order } }] };
      const orderItemCnt =  await dbService.count(OrderItem,orderItemFilter);

      const shippingFilter = { $or: [{ orderId : { $in : order } }] };
      const shippingCnt =  await dbService.count(Shipping,shippingFilter);

      let response = {
        orderItem : orderItemCnt,
        shipping : shippingCnt,
      };
      return response; 
    } else {
      return {  order : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrderItem = async (filter) =>{
  try {
    const orderItemCnt =  await dbService.count(OrderItem,filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPincode = async (filter) =>{
  try {
    let pincode = await dbService.findAll(Pincode,filter);
    if (pincode && pincode.length){
      pincode = pincode.map((obj) => obj.id);

      const addressFilter = { $or: [{ pincodeId : { $in : pincode } }] };
      const addressCnt =  await dbService.count(Address,addressFilter);

      let response = { address : addressCnt, };
      return response; 
    } else {
      return {  pincode : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProduct = async (filter) =>{
  try {
    let product = await dbService.findAll(Product,filter);
    if (product && product.length){
      product = product.map((obj) => obj.id);

      const cartItemFilter = { $or: [{ productId : { $in : product } }] };
      const cartItemCnt =  await dbService.count(CartItem,cartItemFilter);

      const orderItemFilter = { $or: [{ productId : { $in : product } }] };
      const orderItemCnt =  await dbService.count(OrderItem,orderItemFilter);

      let response = {
        cartItem : cartItemCnt,
        orderItem : orderItemCnt,
      };
      return response; 
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countShipping = async (filter) =>{
  try {
    let shipping = await dbService.findAll(Shipping,filter);
    if (shipping && shipping.length){
      shipping = shipping.map((obj) => obj.id);

      const addressFilter = { $or: [{ shippingId : { $in : shipping } }] };
      const addressCnt =  await dbService.count(Address,addressFilter);

      let response = { address : addressCnt, };
      return response; 
    } else {
      return {  shipping : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countAddress = async (filter) =>{
  try {
    const addressCnt =  await dbService.count(Address,filter);
    return { address : addressCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countWallet = async (filter) =>{
  try {
    let wallet = await dbService.findAll(Wallet,filter);
    if (wallet && wallet.length){
      wallet = wallet.map((obj) => obj.id);

      const walletTransactionFilter = { $or: [{ walletId : { $in : wallet } }] };
      const walletTransactionCnt =  await dbService.count(WalletTransaction,walletTransactionFilter);

      let response = { walletTransaction : walletTransactionCnt, };
      return response; 
    } else {
      return {  wallet : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countWalletTransaction = async (filter) =>{
  try {
    const walletTransactionCnt =  await dbService.count(WalletTransaction,filter);
    return { walletTransaction : walletTransactionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const bannerFilter = { '$or': [{ sellerId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const bannerCnt = await dbService.update(Banner,bannerFilter,updateBody);

      const imageFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const imageCnt = await dbService.update(Image,imageFilter,updateBody);

      const cartFilter = { '$or': [{ customerId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cartCnt = await dbService.update(Cart,cartFilter,updateBody);

      const cartItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cartItemCnt = await dbService.update(CartItem,cartItemFilter,updateBody);

      const categoryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const categoryCnt = await dbService.update(Category,categoryFilter,updateBody);

      const cityFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const cityCnt = await dbService.update(City,cityFilter,updateBody);

      const stateFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const stateCnt = await dbService.update(State,stateFilter,updateBody);

      const countryFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const countryCnt = await dbService.update(Country,countryFilter,updateBody);

      const orderFilter = { '$or': [{ customerId : { '$in' : user } },{ sellerId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderCnt = await dbService.update(Order,orderFilter,updateBody);

      const orderItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderItemCnt = await dbService.update(OrderItem,orderItemFilter,updateBody);

      const pincodeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const pincodeCnt = await dbService.update(Pincode,pincodeFilter,updateBody);

      const productFilter = { '$or': [{ sellerId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const productCnt = await dbService.update(Product,productFilter,updateBody);

      const shippingFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const shippingCnt = await dbService.update(Shipping,shippingFilter,updateBody);

      const addressFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const addressCnt = await dbService.update(Address,addressFilter,updateBody);

      const walletFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const walletCnt = await dbService.update(Wallet,walletFilter,updateBody);

      const walletTransactionFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const walletTransactionCnt = await dbService.update(WalletTransaction,walletTransactionFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        user :userCnt.length + updated.length,
        banner :bannerCnt.length,
        image :imageCnt.length,
        cart :cartCnt.length,
        cartItem :cartItemCnt.length,
        category :categoryCnt.length,
        city :cityCnt.length,
        state :stateCnt.length,
        country :countryCnt.length,
        order :orderCnt.length,
        orderItem :orderItemCnt.length,
        pincode :pincodeCnt.length,
        product :productCnt.length,
        shipping :shippingCnt.length,
        address :addressCnt.length,
        wallet :walletCnt.length,
        walletTransaction :walletTransactionCnt.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBanner = async (filter,updateBody) =>{  
  try {
    let banner = await dbService.findAll(Banner,filter, { id:1 });
    if (banner.length){
      banner = banner.map((obj) => obj.id);

      const imageFilter = { '$or': [{ bannerId : { '$in' : banner } }] };
      const imageCnt = await dbService.update(Image,imageFilter,updateBody);
      let updated = await dbService.update(Banner,filter,updateBody);

      let response = { image :imageCnt.length, };
      return response;
    } else {
      return {  banner : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteImage = async (filter,updateBody) =>{  
  try {
    const imageCnt =  await dbService.update(Image,filter);
    return { image : imageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCart = async (filter,updateBody) =>{  
  try {
    let cart = await dbService.findAll(Cart,filter, { id:1 });
    if (cart.length){
      cart = cart.map((obj) => obj.id);

      const cartItemFilter = { '$or': [{ cartId : { '$in' : cart } }] };
      const cartItemCnt = await dbService.update(CartItem,cartItemFilter,updateBody);
      let updated = await dbService.update(Cart,filter,updateBody);

      let response = { cartItem :cartItemCnt.length, };
      return response;
    } else {
      return {  cart : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCartItem = async (filter,updateBody) =>{  
  try {
    const cartItemCnt =  await dbService.update(CartItem,filter);
    return { cartItem : cartItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCategory = async (filter,updateBody) =>{  
  try {
    let category = await dbService.findAll(Category,filter, { id:1 });
    if (category.length){
      category = category.map((obj) => obj.id);

      const productFilter = { '$or': [{ categoryId : { '$in' : category } },{ subCategoryId : { '$in' : category } }] };
      const productCnt = await dbService.update(Product,productFilter,updateBody);
      let updated = await dbService.update(Category,filter,updateBody);

      let response = { product :productCnt.length, };
      return response;
    } else {
      return {  category : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCity = async (filter,updateBody) =>{  
  try {
    let city = await dbService.findAll(City,filter, { id:1 });
    if (city.length){
      city = city.map((obj) => obj.id);

      const pincodeFilter = { '$or': [{ cityId : { '$in' : city } }] };
      const pincodeCnt = await dbService.update(Pincode,pincodeFilter,updateBody);

      const addressFilter = { '$or': [{ cityId : { '$in' : city } }] };
      const addressCnt = await dbService.update(Address,addressFilter,updateBody);
      let updated = await dbService.update(City,filter,updateBody);

      let response = {
        pincode :pincodeCnt.length,
        address :addressCnt.length,
      };
      return response;
    } else {
      return {  city : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteState = async (filter,updateBody) =>{  
  try {
    let state = await dbService.findAll(State,filter, { id:1 });
    if (state.length){
      state = state.map((obj) => obj.id);

      const cityFilter = { '$or': [{ stateId : { '$in' : state } }] };
      const cityCnt = await dbService.update(City,cityFilter,updateBody);

      const pincodeFilter = { '$or': [{ stateId : { '$in' : state } }] };
      const pincodeCnt = await dbService.update(Pincode,pincodeFilter,updateBody);

      const addressFilter = { '$or': [{ stateId : { '$in' : state } }] };
      const addressCnt = await dbService.update(Address,addressFilter,updateBody);
      let updated = await dbService.update(State,filter,updateBody);

      let response = {
        city :cityCnt.length,
        pincode :pincodeCnt.length,
        address :addressCnt.length,
      };
      return response;
    } else {
      return {  state : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCountry = async (filter,updateBody) =>{  
  try {
    let country = await dbService.findAll(Country,filter, { id:1 });
    if (country.length){
      country = country.map((obj) => obj.id);

      const stateFilter = { '$or': [{ countryId : { '$in' : country } }] };
      const stateCnt = await dbService.update(State,stateFilter,updateBody);

      const pincodeFilter = { '$or': [{ countryId : { '$in' : country } }] };
      const pincodeCnt = await dbService.update(Pincode,pincodeFilter,updateBody);
      let updated = await dbService.update(Country,filter,updateBody);

      let response = {
        state :stateCnt.length,
        pincode :pincodeCnt.length,
      };
      return response;
    } else {
      return {  country : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody) =>{  
  try {
    let order = await dbService.findAll(Order,filter, { id:1 });
    if (order.length){
      order = order.map((obj) => obj.id);

      const orderItemFilter = { '$or': [{ orderId : { '$in' : order } }] };
      const orderItemCnt = await dbService.update(OrderItem,orderItemFilter,updateBody);

      const shippingFilter = { '$or': [{ orderId : { '$in' : order } }] };
      const shippingCnt = await dbService.update(Shipping,shippingFilter,updateBody);
      let updated = await dbService.update(Order,filter,updateBody);

      let response = {
        orderItem :orderItemCnt.length,
        shipping :shippingCnt.length,
      };
      return response;
    } else {
      return {  order : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrderItem = async (filter,updateBody) =>{  
  try {
    const orderItemCnt =  await dbService.update(OrderItem,filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePincode = async (filter,updateBody) =>{  
  try {
    let pincode = await dbService.findAll(Pincode,filter, { id:1 });
    if (pincode.length){
      pincode = pincode.map((obj) => obj.id);

      const addressFilter = { '$or': [{ pincodeId : { '$in' : pincode } }] };
      const addressCnt = await dbService.update(Address,addressFilter,updateBody);
      let updated = await dbService.update(Pincode,filter,updateBody);

      let response = { address :addressCnt.length, };
      return response;
    } else {
      return {  pincode : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProduct = async (filter,updateBody) =>{  
  try {
    let product = await dbService.findAll(Product,filter, { id:1 });
    if (product.length){
      product = product.map((obj) => obj.id);

      const cartItemFilter = { '$or': [{ productId : { '$in' : product } }] };
      const cartItemCnt = await dbService.update(CartItem,cartItemFilter,updateBody);

      const orderItemFilter = { '$or': [{ productId : { '$in' : product } }] };
      const orderItemCnt = await dbService.update(OrderItem,orderItemFilter,updateBody);
      let updated = await dbService.update(Product,filter,updateBody);

      let response = {
        cartItem :cartItemCnt.length,
        orderItem :orderItemCnt.length,
      };
      return response;
    } else {
      return {  product : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteShipping = async (filter,updateBody) =>{  
  try {
    let shipping = await dbService.findAll(Shipping,filter, { id:1 });
    if (shipping.length){
      shipping = shipping.map((obj) => obj.id);

      const addressFilter = { '$or': [{ shippingId : { '$in' : shipping } }] };
      const addressCnt = await dbService.update(Address,addressFilter,updateBody);
      let updated = await dbService.update(Shipping,filter,updateBody);

      let response = { address :addressCnt.length, };
      return response;
    } else {
      return {  shipping : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAddress = async (filter,updateBody) =>{  
  try {
    const addressCnt =  await dbService.update(Address,filter);
    return { address : addressCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWallet = async (filter,updateBody) =>{  
  try {
    let wallet = await dbService.findAll(Wallet,filter, { id:1 });
    if (wallet.length){
      wallet = wallet.map((obj) => obj.id);

      const walletTransactionFilter = { '$or': [{ walletId : { '$in' : wallet } }] };
      const walletTransactionCnt = await dbService.update(WalletTransaction,walletTransactionFilter,updateBody);
      let updated = await dbService.update(Wallet,filter,updateBody);

      let response = { walletTransaction :walletTransactionCnt.length, };
      return response;
    } else {
      return {  wallet : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteWalletTransaction = async (filter,updateBody) =>{  
  try {
    const walletTransactionCnt =  await dbService.update(WalletTransaction,filter);
    return { walletTransaction : walletTransactionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteBanner,
  deleteImage,
  deleteCart,
  deleteCartItem,
  deleteCategory,
  deleteCity,
  deleteState,
  deleteCountry,
  deleteOrder,
  deleteOrderItem,
  deletePincode,
  deleteProduct,
  deleteShipping,
  deleteAddress,
  deleteWallet,
  deleteWalletTransaction,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countBanner,
  countImage,
  countCart,
  countCartItem,
  countCategory,
  countCity,
  countState,
  countCountry,
  countOrder,
  countOrderItem,
  countPincode,
  countProduct,
  countShipping,
  countAddress,
  countWallet,
  countWalletTransaction,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteBanner,
  softDeleteImage,
  softDeleteCart,
  softDeleteCartItem,
  softDeleteCategory,
  softDeleteCity,
  softDeleteState,
  softDeleteCountry,
  softDeleteOrder,
  softDeleteOrderItem,
  softDeletePincode,
  softDeleteProduct,
  softDeleteShipping,
  softDeleteAddress,
  softDeleteWallet,
  softDeleteWalletTransaction,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
