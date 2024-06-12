import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const contractSchema = Yup.object().shape({
    term: Yup.number()
        .required("term is not empty")
        .min(0, "Kỳ hạn phải lớn hơn hoặc bằng 0")
        .max(120, "Kì hạn yều cầu tối đa 120 tháng"),
    startDate: Yup.string()
        .required("startDate is not empty")
        .matches(
            /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            'Ngày bắt đầu phải là DD/MM/YYYY'
        )
        .test(
            'validDate',
            "Ngày bắt đầu phải nằm trong khoảng 01/01/2000 đến 01/01/2100",
            (value) => {
                const [year,month,day] = value.split('-');
                const date = new Date(parseInt(year), parseInt(month), parseInt(day));
                return !isNaN(date.getTime()) && date.getFullYear() >= 2000 && date.getFullYear() <= 2100;
            }
        ),
    deposit: Yup.string()
        .required("deposit is not empty")
        .test(
            "minDeposit",
            "Vui lòng nhập tiền đặt cọc hợp lệ (tối thiểu 1.000.000 VND,tối đa 50.000.000 VND)",
            (value) =>{
                if(value) {
                    const numericValue = value.replace(/\D/g, "");
                    return numericValue >= 1000000 && numericValue <= 50000000;
                }
                return true;
            }),
    taxCode: Yup.string()
        .required("taxCode is not empty")
        .test(
            'notANumber',
            'Mã số thuế phải là dạng số',
            (value) => {
                //+value sẽ chuyển đổi giá trị value (kiểu string) thành kiểu number.
                return !isNaN(+value);
            }
        )
        .test(
            'taxCodeLength',
            'Mã số thuế phải dài 10 ký tự',
            (value) => value.length === 10
        )
    ,
    content: Yup.string()
        .required("content is not empty")
        .min(10, "Vui lòng cung cấp nội dung hợp lệ có ít nhất 10 ký tự")
        .max(255, "Vui lòng cung cấp nội dung hợp lệ tối đa 255 ký tự"),
    // fireBaseUrl :Yup.mixed()
    //     .test(
    //         "FILE_FORMAT",
    //         "Định dạng tải lên không được hỗ trợ",
    //         (value) => {
    //             console.log('value',value);
    //             !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    //         }
    //
    //     )
    //     .test(
    //         'FILE_SIZE',
    //         "Kích thước tệp quá lớn (tối đa 2MB)",
    //         (value)=> !value || (value && value.size <= 2048 * 1024)
    //     )
})

