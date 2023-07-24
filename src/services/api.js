import axios from "axios";

export default class Api {
    _api = null;

    static init = ({ url }) => {
        try {
            this._api = axios.create({
                baseURL: url,
                timeout: 10000,
            });
        } catch (error) {
            return error;
        }
    };
    static setResturantToken = (token) => {
        this._api.interceptors.request.use(
            function (config) {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    };
    static setUserToken = (token) => {
        this._api.interceptors.request.use(
            function (config) {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    };

    static imageUpload = async (data, onUploadProgress) => {
        try {
            const response = await this._api.post("/api/upload-image", data, {
                onUploadProgress,
            })
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static resturantRegister = async (data) => {
        try {
            const response = await this._api.post("/api/rest-register", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static emailVerificationRest = async (token) => {
        try {
            const response = await this._api.get(`/api/verify?token=${token}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static resturantLogin = async (data) => {
        try {
            const response = await this._api.post("/api/rest-login", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static resturantDetail = async (id) => {
        try {
            const response = await this._api.get(`/api/get-resturant/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static resturantEdit = async (data, id) => {
        try {
            const response = await this._api.post(`/api/rest-edit/${id}`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static getResturantsByCity = async (city) => {
        try {
            const response = await this._api.get(`/api/get-rest-city/${city}`);
            return response
        } catch (error) {
            return error.response
        }
    }
    static searchResturant = async (name,city) => {
        try {
            const response = await this._api.get('/api/search-rest', {
                params: { name,city }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static getItemsLength = async (id) => {
        try {
            const response = await this._api.get(`/api/get-length/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };

    static addProduct = async (data) => {
        try {
            const response = await this._api.post("/api/add-product", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getAllProducts = async (page, limit, id, category) => {
        try {
            const response = await this._api.get(`/api/get-all/${id}`, {
                params: { page, limit, category },
            });
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getSpecificProduct = async (id) => {
        try {
            const response = await this._api.get(`/api/get-product/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static updateProduct = async (id, data) => {
        try {
            const response = await this._api.post(
                `/api/edit-product/${id}`,
                data
            );
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static deleteProduct = async (id) => {
        try {
            const response = await this._api.delete(`/api/delete-product/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };

    static userRegister = async (data) => {
        try {
            const response = await this._api.post("/api/user-register", data);
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static emailVerificationUser = async (token) => {
        try {
            const response = await this._api.get(`/api/verify-user?token=${token}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static userLogin = async (data) => {
        try {
            const response = await this._api.post("/api/user-login", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static userDetail = async (id) => {
        try {
            const response = await this._api.get(`/api/get-user/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static userEdit = async (data, id) => {
        try {
            const response = await this._api.post(`/api/user-edit/${id}`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static postRestUserFeedback = async (data) => {
        try {
            const response = await this._api.post("/api/post-rating", data);
            return response;
        } catch (error) {
            return error.response
        }
    }
    static getRestUserFeedback = async (id) => {
        try {
            const response = await this._api.get(`/api/get-rating/${id}`);
            return response;
        } catch (error) {
            return error.response
        }
    }
    static deleteRestUserFeedback = async (id) => {
        try {
            const response = await this._api.delete(`/api/delete-rating/${id}`);
            return response;
        } catch (error) {
            return error.response
        }
    }

    static placeOrder = async (data) => {
        try {
            const response = await this._api.post("/api/place-order", data);
            return response;
        } catch (error) {
            return error.response
        }
    }
    static getResturantAllOrders = async (id, status) => {
        try {
            const response = await this._api.get(`/api/get-order/${id}`, {
                params: { status },
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static getOrderDetail = async (id) => {
        try {
            const response = await this._api.get(`/api/get-order-detail/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static changeOrderStatus = async (id, data) => {
        try {
            const response = await this._api.post(`/api/order-status/${id}`, data);
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static getOrderById = async (rest_id, search, status) => {
        try {
            const response = await this._api.get(`/api/order`, {
                params: { rest_id, search, status },
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
    static getUserAllOrders = async (id, status) => {
        try {
            const response = await this._api.get(`/api/get-user-order/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static addCategory = async (data) => {
        try {
            const response = await this._api.post('/api/add-category', data);
            return response;
        } catch (error) {
            return error.response
        }
    }
    static getCategory = async (id) => {
        try {
            const response = await this._api.get(`/api/get-category/${id}`);
            return response;
        } catch (error) {
            return error.response
        }
    }
    static deleteCategory = async (id) => {
        try {
            const response = await this._api.delete(`/api/delete-category/${id}`);
            return response;
        } catch (error) {
            return error.response
        }
    }

    static handleContactUs = async (data) => {
        try{
            const response = await this._api.post('/api/contact-us', data);
            return response;
        } catch(error){
            return error.response;
        }
    }
}
