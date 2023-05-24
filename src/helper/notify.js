import {toast} from "react-toastify";

export default function notify(type, message){
    if (type === "error") {
        return toast.error(message);
    }
    if (type === "success") {
        return toast.success(message);
    }
    if (type === "warn") {
        return toast.warn(message);
    }
}