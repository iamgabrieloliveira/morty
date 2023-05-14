import { toast } from 'vue3-toastify';

const defaultOptions = {
    theme: 'dark',
};

export const success = (content, options) => {
    toast(content, {
        ...options,
        ...defaultOptions,
    });
}

export const warning = (content, options) => {
    toast.warning(content, {
        ...options,
        ...defaultOptions,
    });   
}

export const error = (content, options) => {
    toast.error(content, {
        ...options,
        ...defaultOptions,
    });   
}