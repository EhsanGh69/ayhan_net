import { useEffect } from "react";

export const isPersian = (text) => {
    // const persianLetters = /[\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF]/;
    // const persianNumbers = /[\u06F0-\u06F9\u0660-\u0669]/;

    return !/[a-zA-Z]/.test(text);
};

const getErrorMessage = (error) => {
    const errDetail = error?.response?.data?.detail
    if (errDetail && typeof errDetail === 'string' && isPersian(errDetail)) return errDetail

    if (!error.response) return 'خطا در برقراری ارتباط با سرور'
    const status = error?.response?.status || error?.status;
    switch (status) {
        case 400:
            return 'اطلاعات ارسالی صحیح نیست. لطفاً ورودی‌ها را بررسی کنید.';
        case 401:
            return 'شما دسترسی به این بخش ندارید. لطفاً وارد حساب کاربری خود شوید.';
        case 403:
            return 'شما مجوز دسترسی به این بخش را ندارید.';
        case 404:
            return 'اطلاعات درخواستی یافت نشد.';
        case 409:
            return 'این اطلاعات قبلاً ثبت شده است.';
        case 422:
            return 'داده‌های ارسالی معتبر نیستند.';
        case 429:
            return 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید.';
        case 500:
            return 'خطای داخلی سرور رخ داده است. لطفاً دقایقی دیگر تلاش کنید.';
        case 503:
            return 'سرویس در دسترس نیست. لطفاً بعداً تلاش کنید.';
        default:
            return 'خطایی رخ داده است. لطفاً دوباره تلاش کنید.';
    }
}


const useErrorHandler = (isError, error, setSnackbar = null, setError = null) => {
    useEffect(() => {
        if (isError && error) {
            if (setSnackbar) {
                setSnackbar({
                    open: true,
                    message: getErrorMessage(error),
                    severity: 'error'
                })
            } else if(setError) {
                setError(getErrorMessage(error))
            }
        }
    }, [isError, error])
}

export default useErrorHandler;