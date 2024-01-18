import Header from '../Header';
import * as yup from "yup";

const schema = yup.object({
    CategoryId: yup.number().integer().required().min(1, "יש לבחור קטגוריה"),
    Name: yup.string().required("יש להכניס שם"),
    Img: yup.string().url().required("יש להכניס כתובת URL של תמונה"),
    Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("יש להכניס משך זמן"),
    Difficulty: yup.number().integer().positive().required().min(1, "יש לבחור רמת קושי"),
    Description: yup.string().required("יש להכניס תיאור"),
    Instructions: yup.array().of(
        yup.object().shape({
            Instruc: yup.string().required("יש להכניס הוראה")
        })
    ),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required("הכנס שם"),
            Count: yup.number("הכנס מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
            Type: yup.string().required("הכנס סוג")
        })
    )
})


const AddRecipe = () => {
    return (
        <div>
            <Header page={'הוספת מתכון'} />
            הוספת מתכון חמודמוד
        </div>
    )
}

export default AddRecipe;