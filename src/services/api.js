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

    static setResturantToken = ({ token }) => {
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

    // resturants apis
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
        console.log('id :>> ', id);
        try {
            const response = await this._api.get(`/api/get-resturant/${id}`);
            return response;
        } catch (error) {
            return error.response;
        }
    };

    // products apis
    static addProduct = async (data) => {
        try {
            const response = await this._api.post("/api/add-product", data);
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getAllProducts = async (page, limit, id) => {
        try {
            const response = await this._api.get(`/api/get-all/${id}`, {
                params: { page, limit },
            });
            return response;
        } catch (error) {
            return error.response;
        }
    };
    static getProductsLength = async () => {
        try {
            const response = await this._api.get('/api/get-length');
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
}
