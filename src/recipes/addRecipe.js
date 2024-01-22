import { useDispatch, useSelector } from 'react-redux';
import Header from '../Pages/Header';
import * as yup from "yup";
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { addRecipe, editRecipe } from '../Services/RecipesService';
import { Button, Form, FormField, FormGroup, Icon, Label, Message, Radio } from 'semantic-ui-react';
import { Fragment } from 'react';
import Category from '../Pages/Category';

const schema = yup.object({
    CategoryId: yup.number().required("חובה לבחור קטגוריה"),
    Name: yup.string().required("יש להכניס שם"),
    Img: yup.string().url().required("נא להכניס כתובת URL של תמונה"),
    Duration: yup.number("נא להכניס מספר").positive("משך זמן חיובי בלבד").required("חובה להכניס משך זמן"),
    Difficulty: yup.number().required("נא לבחור רמת קושי"),
    Description: yup.string().required("הכנס תאור קצר"),
    Instructions: yup.array().of(yup.string().required()),
    Ingrident: yup.array().of(
        yup.object().shape({
            Name: yup.string().required("הכנס שם"),
            Count: yup.number("כמות מסוג מספר").positive("כמות חיובית בלבד").required("הכנס כמות"),
            Type: yup.string().nullable()
        })
    )
});

const AddRecipe = () => {
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { categoryList, difficulties } = useSelector(state => ({
        categoryList: state.categoryList,
        difficulties: state.difficulties
    }));
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name, UserId: userId, CategoryId: state?.CategoryId,
            Img: state?.Img, Duration: state?.Duration, Difficulty: state?.Difficulty,
            Description: state?.Description, Ingrident: state?.Ingrident, Instructions: state?.Instructions
        }
    });
    const { fields: Instructions, append: appendInstructions, remove: removeInst } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngridents, remove: removeIngr } = useFieldArray({
        control, name: "Ingrident"
    });
    const onSubmit = (data) => {
        if (data.Difficulty === 0 || !data.CategoryId)
            return;
        if (state == null)
            dispatch(addRecipe(data, userId));
        else
            dispatch(editRecipe(data, state));
        navigate('/recipes');
    }

    return (
        <div>
            <Header page={'הוספת מתכון'} />
            <div style={{ width: "60%", margin: "auto", padding: "30px", backgroundColor: "rgba(75, 182, 177, 0.5)" }}>
                <Message attached header={state == null ? 'הוסף מתכון חדש לאתר' : 'ערוך את המתכון'} content={state == null ? 'תן לעוד אנשים להנות מהמתכונים הטובים שלך' : state.Name} />
                <br />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup widths='equal'>
                        <FormField required>
                            <label>שם מתכון</label>
                            <input {...register("Name")} placeholder="שם מתכון" />
                            {errors.Name && <Label style={{ position: "absolute", top: 40, right: 50 }} color='red' pointing>{errors.Name.message} </Label>}
                        </FormField>
                        <FormField required>
                            <label>תיאור</label>
                            <input {...register("Description")} placeholder="תיאור" />
                            {errors.Description && <Label style={{ position: "absolute", top: 40, left: 50 }} color='red' pointing>{errors.Description.message} </Label>}
                        </FormField>
                    </FormGroup>
                    <FormGroup style={{alignItems: 'flex-end'}}>
                        <FormField required width={5} >
                            <label>קטגוריה</label>
                            <select {...register("CategoryId")} name="CategoryId" placeholder="קטגוריה">
                                <option value={0} disabled selected>קטגוריה</option>
                                {categoryList?.map((category) =>
                                    <option key={category.Id} value={category.Id}>{category.Name}</option>
                                )}
                            </select>
                        </FormField>
                        <FormField width={3} >
                            <Category />
                        </FormField>
                        <FormField width={8}>
                            <label style={{ marginBottom: '10px' }}>רמת קושי<span style={{ color: 'red' }}>*</span> </label>
                            {difficulties.map((difficulty) => (
                                <Fragment key={difficulty.Id}>
                                    <input id={`difficulty-${difficulty.Id}`} {...register('Difficulty')} type='radio' value={difficulty.Id} name="Difficulty" defaultChecked={state && state.Difficulty == difficulty.Id ? true : false} style={{ display: "inline-block" }} />
                                    <label htmlFor={`difficulty-${difficulty.Id}`} style={{ display: 'inline-block', marginRight: '10px', marginLeft: '10px' }}>{difficulty.Name}</label>
                                </Fragment>
                            ))}
                        </FormField>
                    </FormGroup>
                    <FormField required>
                        <label>URL</label>
                        <input {...register("Img")} placeholder="תמונה" />
                        {errors.Img && <Label style={{ position: "absolute", top: 200, right: 50 }} color='red' pointing>{errors.Img.message} </Label>}
                    </FormField>
                    <FormField required>
                        <label>זמן הכנה בדקות</label>
                        <input {...register("Duration")} placeholder="משך זמן" />
                        {errors.Duration && <Label style={{ position: "absolute", top: 270, right: 80 }} color='red' pointing>{errors.Duration.message} </Label>}
                    </FormField>
                    <h4>רכיבים</h4>
                    <Button content='הוסף מוצר' icon='plus' labelPosition='right' onClick={() => appendIngridents({ Name: null, Count: null, Type: null })} />
                    <br />
                    <br />
                    {Ingrident?.map((ingrident, index) =>
                        <FormGroup key={index} widths='equal' style={{ width: "93%" }}>
                            <FormField >
                                <input {...register(`Ingrident.${index}.Name`)} placeholder="שם מוצר" />
                            </FormField>
                            <FormField>
                                <input {...register(`Ingrident.${index}.Count`)} placeholder="כמות" />
                            </FormField>
                            <FormField>
                                <input {...register(`Ingrident.${index}.Type`)} placeholder="סוג" />
                            </FormField>
                            <Button icon size='large' floated="left" onClick={() => removeIngr(index)}>
                                <Icon name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <h4>הוראות הכנה</h4>
                    <Button content='הוסף הוראה' icon='plus' labelPosition='right' onClick={() => appendInstructions(null)} />
                    <br />
                    <br />
                    {Instructions?.map((instruction, index) =>
                        <FormGroup key={index}>
                            <FormField style={{ width: "93%" }}>
                                <input {...register(`Instructions.${index}`)} placeholder="הוראת הכנה" />
                            </FormField>
                            <Button icon size='large' floated="left" onClick={() => removeInst(index)}>
                                <Icon name='trash alternate' />
                            </Button>
                        </FormGroup>
                    )}
                    <br />
                    <br />
                    <Button type='submit' style={{ position: "absolute", left: -5, bottom: -20 }} color='teal' content='שמור שינויים' icon='save' labelPosition='left' />
                </Form>
            </div>
        </div>
    )
}

export default AddRecipe;