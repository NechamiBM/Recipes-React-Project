import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalActions, ModalDescription, Input } from "semantic-ui-react";
import Swal from "sweetalert2";
import { addCategory } from "../Services/CategoryService";

const Category = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const add = () => {
        setOpen(false);
        var inputValue = document.getElementById('textInput').value;
        if (inputValue === '')
            Swal.fire({
                icon: "error",
                position: "top",
                title: "לא הוכנס קלט!",
                showConfirmButton: false,
                timer: 1500
            });
        else {
            dispatch(addCategory(inputValue));
            Swal.fire({
                position: "top",
                icon: "success",
                title: inputValue + " נוסף לרשימת הקטגוריות",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (<>
        <Modal size='mini' dimmer='blurring' onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}
            trigger={<Button style={{ width: "100%" }} >הוסף קטגוריה</Button>}>
            <ModalDescription style={{ padding: '20px' }}>
                <Input type="text" id="textInput" placeholder="הכנס קטגוריה" />
            </ModalDescription>
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>ביטול</Button>
                <Button content="שמור והוסף" labelPosition='right' icon='checkmark'
                    onClick={() => add()} positive />
            </ModalActions>
        </Modal></>
    )
}

export default Category;